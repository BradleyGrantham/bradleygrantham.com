# MCP server

A Python Worker running a [Model Context Protocol](https://modelcontextprotocol.io/) server with the
official Python MCP SDK (stateless protocol version `2026-07-28`), based on Cloudflare's
[python-workers-examples/mcp-server](https://github.com/cloudflare/python-workers-examples/tree/main/mcp-server).

It has no routes of its own. The site Worker (`../worker/index.js`) forwards `POST /mcp` to it over the
`MCP` service binding, so it's served at `https://bradleygrantham.com/mcp`.

Everything is public and read-only.

| Tool | Does |
|---|---|
| `get_about()` | Bradley's bio |
| `get_cv()` | The CV ("coming soon" until `src/content/cv.md` exists) |
| `list_blog_posts()` | Every post: slug, title, date, summary, URL |
| `get_blog_post(slug)` | One post's full text as Markdown |
| `search_bradley(query)` | Keyword search over the bio, CV and posts: up to 5 snippets with links |

Resources: `bradley://about`, `bradley://cv`, `bradley://blog` (the post index) and
`bradley://blog/<slug>` for each post. Posts are registered one by one rather than as a
`bradley://blog/{slug}` template, because the SDK reads template results on a worker thread and
Python Workers can't start threads.

Input limits: `search_bradley` queries are capped at 200 characters, and unknown slugs return an
error pointing at `list_blog_posts`.

Search, post lookup and the content conversion live in `src/content.py` and `sync_content.py`,
which don't use any Workers APIs, so they're unit tested with plain pytest:

```sh
uv run pytest
```

## Content

The server's text comes from the site's own content, so there's one copy to edit. `sync_content.py`
turns `../src/content/about.md` (also rendered by the About page) into `src/site_content.py`, which
isn't committed. `npm run mcp:dev` and `npm run mcp:deploy` run it first.

## Development

Install [uv](https://docs.astral.sh/uv/), then from the repo root:

```sh
npm run mcp:dev   # the MCP Worker at http://localhost:8788/mcp
```

That's enough for testing tools (e.g. `claude mcp add --transport http bradley http://localhost:8788/mcp`).
To test the routing through the site as well, also run, after `npm run build`:

```sh
npx wrangler dev --port 8787   # the site Worker, which forwards /mcp to the one above
```

Then call the tool through the site:

```sh
curl -X POST http://localhost:8787/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H 'MCP-Protocol-Version: 2026-07-28' \
  -H 'Mcp-Method: tools/call' \
  -H 'Mcp-Name: get_about' \
  --data '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientCapabilities":{}},"name":"get_about","arguments":{}}}'
```

## Deploy

Deploy this Worker before the site (the site's service binding needs it to exist):

```sh
npm run mcp:deploy
```

Workers Builds only deploys the site Worker, so changes here are deployed by hand for now.
