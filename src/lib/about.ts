import fs from "fs";
import path from "path";

// The About page text. The MCP server (mcp/) serves the same file, copied in by
// mcp/sync_content.py, so this is the only place to edit it.
const ABOUT_FILE = path.join(process.cwd(), "src/content/about.md");

export type AboutSection = {
  heading: string;
  body: string;
};

export type About = {
  intro: string;
  sections: AboutSection[];
};

// Splits about.md on its "## " headings: the text before the first heading is the intro.
export function getAbout(): About {
  const raw = fs.readFileSync(ABOUT_FILE, "utf8");
  const [intro, ...rest] = raw.split(/^## /m);

  return {
    intro: intro.trim(),
    sections: rest.map((section) => {
      const [heading, ...body] = section.split("\n");
      return { heading: heading.trim(), body: body.join("\n").trim() };
    }),
  };
}
