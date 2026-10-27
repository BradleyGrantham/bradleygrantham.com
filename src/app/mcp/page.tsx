import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";

export const metadata: Metadata = {
  title: "MCP server | Bradley Grantham",
  description:
    "Connect Bradley Grantham's MCP server to Claude, VS Code or any MCP client to ask about Bradley and Bradley's writing.",
};

const MCP_URL = "https://bradleygrantham.com/mcp";
const SOURCE_URL = "https://github.com/BradleyGrantham/bradleygrantham.com/tree/main/mcp";

const CLAUDE_CODE_COMMAND = `claude mcp add --transport http bradley ${MCP_URL}`;
const VS_CODE_CONFIG = `{
  "servers": {
    "bradley": {
      "type": "http",
      "url": "${MCP_URL}"
    }
  }
}`;

const tools = [
  { name: "search_bradley", description: "Keyword search across my bio, CV and blog posts, with links." },
  { name: "get_about", description: "Essentially the /about page." },
  { name: "list_blog_posts", description: "Every blog post I've written." },
  { name: "get_blog_post", description: "Self-explanatory." },
  { name: "get_cv", description: "CV (coming soon)." },
  { name: "get_golf_handicap", description: "My current golf handicap." },
];

const examplePrompts = [
  "Who is Bradley Grantham?",
  "What has Bradley written about LLMs?",
  "Summarise Bradley's FPL search post.",
];

const headingClassName = "font-medium text-zinc-950 dark:text-zinc-50";
const codeClassName =
  "overflow-x-auto rounded-md bg-zinc-100 px-4 py-3 font-mono text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200";
const copyButtonClassName =
  "shrink-0 rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900";
const linkClassName = "underline hover:text-zinc-950 dark:hover:text-zinc-50";

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-3 flex items-start gap-3">
      <pre className={`min-w-0 flex-1 ${codeClassName}`}>
        <code>{code}</code>
      </pre>
      <CopyButton text={code} className={`mt-2 ${copyButtonClassName}`} />
    </div>
  );
}

export default function McpPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        MCP server
      </h1>

      <div className="mt-6 flex flex-col gap-10 text-zinc-600 dark:text-zinc-400">
        <p>
          I've made my own{" "}
          <a href="https://modelcontextprotocol.io/" className={linkClassName}>
            MCP
          </a>{" "}
          server for my site. Connect it to an MCP client, and you can ask about me. It mainly contains the information on this site.
        </p>

        <section>
          <h2 className={headingClassName}>Server URL</h2>
          <div className="mt-3 flex items-center gap-3">
            <code className={`min-w-0 flex-1 break-all ${codeClassName}`}>{MCP_URL}</code>
            <CopyButton text={MCP_URL} className={copyButtonClassName} />
          </div>
        </section>

        <section>
          <h2 className={headingClassName}>Connect it</h2>

          <h3 className="mt-5 text-zinc-950 dark:text-zinc-50">Claude</h3>
          <p className="mt-2">
            In Claude (web or desktop), go to Settings → Connectors → Add custom connector, and
            paste the URL above.
          </p>

          <h3 className="mt-5 text-zinc-950 dark:text-zinc-50">Claude Code</h3>
          <CodeBlock code={CLAUDE_CODE_COMMAND} />

        </section>

        <section>
          <h2 className={headingClassName}>What you can ask</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {examplePrompts.map((prompt) => (
              <li key={prompt}>&ldquo;{prompt}&rdquo;</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={headingClassName}>Tools</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {tools.map((tool) => (
              <li key={tool.name}>
                <code className="font-mono text-sm text-zinc-950 dark:text-zinc-50">{tool.name}</code>
                <span> · {tool.description}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            The same content is also available as resources:{" "}
            <code className="font-mono text-sm">bradley://about</code>,{" "}
            <code className="font-mono text-sm">bradley://blog</code> and one per post.
          </p>
        </section>

        <section>
          <h2 className={headingClassName}>How it&apos;s built</h2>
          <p className="mt-3">
            A Python Worker on Cloudflare using the official MCP Python SDK. The{" "}
            <a href={SOURCE_URL} className={linkClassName}>
              source is on GitHub
            </a>
            .
          </p>
        </section>

        <p>
          <Link
            href="/contact"
            className="hover:text-zinc-950 hover:underline dark:hover:text-zinc-50"
          >
            Get in touch →
          </Link>
        </p>
      </div>
    </div>
  );
}
