// The site is static assets; this only runs for the paths listed in assets.run_worker_first
// (wrangler.jsonc). POST /mcp goes to the MCP server Worker (mcp/) over a service binding;
// anything else falls through to the static assets.
const worker = {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/mcp") {
      if (request.method === "POST") {
        return env.MCP.fetch(request);
      }
      // An MCP client opening a server-to-client stream. The server is stateless and never
      // pushes messages, so per the Streamable HTTP spec it answers 405.
      if ((request.headers.get("Accept") ?? "").includes("text/event-stream")) {
        return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
      }
      // A browser: the landing page (src/app/mcp/page.tsx), which assets serve at /mcp/.
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
