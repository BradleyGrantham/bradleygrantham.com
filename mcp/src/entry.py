from urllib.parse import urlparse

from workers import Response, WorkerEntrypoint, asgi

import content

# DNS rebinding protection: only serve requests addressed to the site (or local dev).
ALLOWED_HOSTS = ["bradleygrantham.com", "www.bradleygrantham.com", "localhost:*", "127.0.0.1:*"]
ALLOWED_ORIGINS = [
    "https://bradleygrantham.com",
    "https://www.bradleygrantham.com",
    "http://localhost:*",  # MCP Inspector and other local browser clients
]

INSTRUCTIONS = """\
Bradley Grantham's personal MCP server: Bradley's bio, blog posts and (soon) CV, taken from
https://bradleygrantham.com. Everything here is public and read-only. Use search_bradley for
questions about a topic, get_about for who Bradley is, and the blog tools for Bradley's writing.
Link to the pages on bradleygrantham.com when quoting them."""


def build_app():
    from mcp.server import MCPServer
    from mcp.server.mcpserver.exceptions import ToolError
    from mcp.server.transport_security import TransportSecuritySettings
    from mcp.types import ToolAnnotations

    server = MCPServer(
        "Bradley Grantham",
        instructions=INSTRUCTIONS,
        website_url=content.SITE_URL,
    )
    read_only = ToolAnnotations(readOnlyHint=True, openWorldHint=False)

    # Tools

    @server.tool(annotations=read_only)
    async def get_about() -> str:
        """Get Bradley Grantham's short bio: current role, current work, and background.

        Use this when someone asks who Bradley is, what Bradley does, or about Bradley's experience."""
        return f"Bradley Grantham's bio, from {content.ABOUT_URL}\n\n{content.ABOUT}"

    @server.tool(annotations=read_only)
    async def get_cv() -> str:
        """Get Bradley Grantham's CV (work history, education and skills) as Markdown.

        Use this for detailed questions about Bradley's career. Not published yet: for now it says so
        and points to get_about."""
        return content.CV or content.CV_COMING_SOON

    @server.tool(annotations=read_only)
    async def list_blog_posts() -> list[dict[str, str]]:
        """List Bradley Grantham's blog posts, newest first, with each post's slug, title, date,
        one-line summary and URL.

        Use this to see what Bradley has written about, then get_blog_post with a slug to read one."""
        return content.list_posts()

    @server.tool(annotations=read_only)
    async def get_blog_post(slug: str) -> str:
        """Get the full text of one of Bradley Grantham's blog posts as Markdown.

        Args:
            slug: The post's slug from list_blog_posts, e.g. "fpl-search".

        Charts and videos in a post appear as short placeholders; link to the post's URL for those."""
        post = content.get_post(slug)
        if post is None:
            raise ToolError(f"No post with slug {slug!r}. Use list_blog_posts to see the available slugs.")
        return content.format_post(post)

    @server.tool(annotations=read_only)
    async def search_bradley(query: str) -> dict:
        """Search Bradley Grantham's bio, CV and blog posts by keyword.

        Returns up to 5 matching snippets, each with the page title and a link. Use this for questions
        about a topic, e.g. "agents", "football", "computer vision", "Channel 4". Plain keywords work
        best; it's not semantic search.

        Args:
            query: A few keywords, up to 200 characters."""
        query = query.strip()
        if not query:
            raise ToolError("query is empty: give a few keywords to search for.")
        if len(query) > content.MAX_QUERY_LENGTH:
            raise ToolError(f"query is too long: keep it to {content.MAX_QUERY_LENGTH} characters.")
        results = content.search(query)
        return {
            "query": query,
            "results": results,
            "note": None if results else "No matches. Try different keywords, or list_blog_posts and get_about.",
        }

    # Resources: the same content, for clients that attach resources rather than call tools.

    @server.resource("bradley://about", name="about", title="About Bradley", mime_type="text/markdown")
    async def about_resource() -> str:
        """Bradley Grantham's short bio."""
        return content.ABOUT

    @server.resource("bradley://cv", name="cv", title="Bradley's CV", mime_type="text/markdown")
    async def cv_resource() -> str:
        """Bradley Grantham's CV (coming soon)."""
        return content.CV or content.CV_COMING_SOON

    @server.resource("bradley://blog", name="blog", title="Blog posts", mime_type="application/json")
    async def blog_resource() -> list[dict[str, str]]:
        """Index of Bradley Grantham's blog posts: slug, title, date, summary and URL."""
        return content.list_posts()

    # One static resource per post rather than a bradley://blog/{slug} template: the SDK reads
    # template results on a worker thread, and Python Workers can't start threads. This also
    # lists every post in resources/list.
    def post_reader(post):
        async def read_post() -> str:
            return content.format_post(post)

        return read_post

    for post in content.POSTS:
        server.resource(
            f"bradley://blog/{post['slug']}",
            name=f"blog-{post['slug']}",
            title=post["title"],
            description=post["summary"],
            mime_type="text/markdown",
        )(post_reader(post))

    return server.streamable_http_app(
        streamable_http_path="/mcp",
        stateless_http=True,
        transport_security=TransportSecuritySettings(
            allowed_hosts=ALLOWED_HOSTS,
            allowed_origins=ALLOWED_ORIGINS,
        ),
    )


class Default(WorkerEntrypoint):
    def __init__(self, ctx, env):
        super().__init__(ctx, env)
        self.app = build_app()

    async def fetch(self, request):
        path = urlparse(request.url).path
        if path == "/mcp" and request.method == "POST":
            return await asgi.fetch(self.app, request, self.env)

        return Response("Not found", status=404)
