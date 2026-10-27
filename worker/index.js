// The site is static assets; this only runs for the paths listed in assets.run_worker_first
// (wrangler.jsonc). POST /mcp goes to the MCP server Worker (mcp/) over a service binding;
// anything else falls through to the static assets.
const worker = {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/mcp" && request.method === "POST") {
      return env.MCP.fetch(request);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
