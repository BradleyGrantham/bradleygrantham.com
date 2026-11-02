import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "CV | Bradley Grantham",
  description: "Bradley Grantham's CV: Director of Data Science and AI at Popsa.",
};

// The CV text. The MCP server (mcp/) serves the same file, copied in by mcp/sync_content.py,
// so this is the only place to edit it. The PDF in public/ is exported separately.
const CV_FILE = path.join(process.cwd(), "src/content/cv.md");
const CV_PDF = "/bradley-grantham-cv.pdf";

export default function CvPage() {
  const cv = fs.readFileSync(CV_FILE, "utf8");

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          CV
        </h1>
        <a
          href={CV_PDF}
          className="text-sm text-zinc-600 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Download PDF
        </a>
      </header>

      <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert prose-h3:text-base">
        <MDXRemote source={cv} />
      </div>
    </article>
  );
}
