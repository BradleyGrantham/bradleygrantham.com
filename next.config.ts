import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to out/, served by Cloudflare as static
  // assets (no server). Rewrites, redirects, headers and default image optimisation aren't
  // available in this mode.
  output: "export",
  // /about -> about/index.html, which static hosts serve at both /about and /about/.
  trailingSlash: true,
  // No image optimisation server. Images are pre-sized instead (e.g. public/images/profile-256.jpg).
  images: { unoptimized: true },
  // A stray package.json/package-lock.json in the home folder made Turbopack guess the wrong
  // workspace root; pin it to this project.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
