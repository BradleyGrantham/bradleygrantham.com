# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install
npm run dev     # Turbopack dev server at http://localhost:3000
npm run build   # static export (Turbopack) to out/
npm run preview # build, then serve out/ locally through the Worker (wrangler dev)
npm run deploy  # build, then deploy to Cloudflare by hand (wrangler deploy)
npm run lint    # eslint (flat config, eslint.config.mjs)
```

There is no test suite configured in this repo. `npm run start` doesn't work: there's no Next.js server in static-export mode.

## Architecture

This is a personal site/blog: Next.js App Router + TypeScript + Tailwind CSS, with blog posts authored as local MDX files (no CMS or database).

**Hosting:** a static export (`output: "export"` in `next.config.ts`) served by an assets-only Cloudflare Worker, configured in `wrangler.jsonc` (no server code; `bradleygrantham.com` and `www` are its custom domains). Cloudflare Workers Builds is connected to the GitHub repo and runs `npm run build` + `npx wrangler deploy` on every push to `main`. Because it's a static export, Next.js rewrites, redirects, headers, middleware and image optimisation aren't available. Images are pre-sized by hand (e.g. `public/images/profile-256.jpg`), and redirects (www → root) live in Cloudflare Redirect Rules. DNS is on Cloudflare; the domain is still registered with Amazon (Route 53 Domains). Email is Google Workspace, so the MX / DKIM (`google._domainkey`) / SPF / DMARC records in Cloudflare DNS must be kept.

**Blog content pipeline:**
- Posts live as `.mdx` files in `src/content/posts/`, each with `title` / `date` / `summary` frontmatter.
- `src/lib/posts.ts` reads and parses posts from disk with `gray-matter` (`getAllPosts`, `getPostBySlug`, `getAllPostSlugs`).
- `src/app/blog/page.tsx` lists all posts; `src/app/blog/[slug]/page.tsx` renders a single post, using `generateStaticParams` to prerender every post at build time.
- Post bodies are rendered via `next-mdx-remote/rsc`'s `MDXRemote`, which means posts can use plain markdown *and* embed React components directly (e.g. charts), not just text.

**Custom MDX components:** components usable inside `.mdx` post bodies are registered in `src/components/mdx-components.tsx` and passed to `MDXRemote`'s `components` prop. `src/components/bar-chart.tsx` is the example (a `<BarChart data={...} />` usable directly in post markdown). Add new embeddable components there.

**Non-obvious gotcha:** `MDXRemote` is called with `options={{ blockJS: false, blockDangerousJS: true }}` in `src/app/blog/[slug]/page.tsx`. `next-mdx-remote` v6 defaults to silently stripping *all* JS expressions from MDX — including JSX attribute expressions like `data={[...]}` — as an XSS/RCE hardening default for untrusted content. Without this override, component props on custom MDX components come through as `undefined` with no error. Since posts here are self-authored and trusted, JS expressions are allowed back in, but `blockDangerousJS` stays on to keep the blocklist on dangerous globals (`eval`, `require`, `process`, `Function`, etc.).

**Styling:** Tailwind v4 — there is no `tailwind.config.js`; theme and plugins are configured directly in `src/app/globals.css` via `@theme inline` and `@plugin` directives (e.g. `@tailwindcss/typography` is loaded there and used for post content via the `prose` class).

**Current scope:** every route is statically prerendered (SSG) — there are no API routes or server-only functionality. Adding any would mean moving off the static export (e.g. to OpenNext/vinext on Workers) or adding Worker code alongside the assets.
