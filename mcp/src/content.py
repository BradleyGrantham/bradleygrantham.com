"""Read-only access to the site's content, kept free of Workers APIs so it can be unit tested."""

import re

from site_content import ABOUT, CV, POSTS

SITE_URL = "https://bradleygrantham.com"
ABOUT_URL = f"{SITE_URL}/about/"
CV_COMING_SOON = (
    "Bradley's CV is coming soon. In the meantime, get_about has a summary of Bradley's role "
    f"and background, and {ABOUT_URL} has the same."
)

MAX_QUERY_LENGTH = 200
SNIPPET_LENGTH = 300
STOPWORDS = {"a", "an", "and", "are", "as", "at", "be", "by", "did", "do", "does", "for", "from",
             "has", "have", "he", "how", "i", "in", "is", "it", "of", "on", "or", "she", "that",
             "the", "their", "they", "this", "to", "was", "what", "when", "where", "which", "who",
             "with", "bradley", "grantham"}


POSTS_BY_SLUG = {post["slug"]: post for post in POSTS}


def post_url(slug: str) -> str:
    return f"{SITE_URL}/blog/{slug}/"


def list_posts() -> list[dict[str, str]]:
    """Every post, newest first, without its body."""
    return [
        {
            "slug": post["slug"],
            "title": post["title"],
            "date": post["date"],
            "summary": post["summary"],
            "url": post_url(post["slug"]),
        }
        for post in POSTS
    ]


def get_post(slug: str) -> dict[str, str] | None:
    """A post by its slug, or None if there's no such post."""
    return POSTS_BY_SLUG.get(slug)


def format_post(post: dict[str, str]) -> str:
    return f"# {post['title']}\n\n{post['date']} · {post_url(post['slug'])}\n\n{post['body']}"


def _sections(markdown: str) -> list[str]:
    """Split Markdown into paragraphs (blank-line separated), the unit that search returns."""
    return [part.strip() for part in re.split(r"\n\s*\n", markdown) if part.strip()]


def _documents() -> list[dict[str, str]]:
    """Everything searchable, as (title, url, text) chunks."""
    docs = [{"title": "About", "url": ABOUT_URL, "text": text} for text in _sections(ABOUT)]
    if CV:
        docs += [{"title": "CV", "url": ABOUT_URL, "text": text} for text in _sections(CV)]
    for post in POSTS:
        url = post_url(post["slug"])
        docs.append({"title": post["title"], "url": url, "text": f"{post['title']}. {post['summary']}"})
        docs += [{"title": post["title"], "url": url, "text": text} for text in _sections(post["body"])]
    return docs


def _terms(text: str) -> list[str]:
    words = (word.removesuffix("'s") for word in re.findall(r"[a-z0-9][a-z0-9'+#.-]*", text.lower()))
    return [word for word in words if word not in STOPWORDS]


def _snippet(text: str, terms: list[str]) -> str:
    """Up to SNIPPET_LENGTH characters of text, starting a little before the first matching term."""
    text = re.sub(r"\s+", " ", text)
    if len(text) <= SNIPPET_LENGTH:
        return text
    lower = text.lower()
    first = min((lower.find(term) for term in terms if term in lower), default=0)
    start = max(0, first - 60)
    snippet = text[start : start + SNIPPET_LENGTH].strip()
    return ("…" if start else "") + snippet + ("…" if start + SNIPPET_LENGTH < len(text) else "")


def search(query: str, limit: int = 5) -> list[dict[str, str]]:
    """Keyword search over the about text, CV and blog posts.

    Scores each paragraph by how many query terms it contains (distinct terms count most), and
    returns the best few as snippets with links, at most one per page and source.
    """
    terms = list(dict.fromkeys(_terms(query)))
    if not terms:
        return []

    scored = []
    for doc in _documents():
        words = _terms(doc["text"])
        counts = [sum(1 for word in words if word.startswith(term)) for term in terms]
        matched = sum(1 for count in counts if count)
        if matched:
            scored.append((matched * 10 + sum(counts), doc))

    results = []
    seen = set()
    for _, doc in sorted(scored, key=lambda item: item[0], reverse=True):
        if (doc["url"], doc["title"]) in seen:
            continue
        seen.add((doc["url"], doc["title"]))
        results.append({"title": doc["title"], "url": doc["url"], "snippet": _snippet(doc["text"], terms)})
        if len(results) == limit:
            break
    return results
