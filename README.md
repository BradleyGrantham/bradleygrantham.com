# bradleygrantham.com

Personal site and blog, built with [Next.js](https://nextjs.org) and deployed on [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html).

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** for styling, with `@tailwindcss/typography` for post content
- **MDX** for blog posts — regular markdown, plus the ability to embed React components (e.g. charts) directly in a post
- Posts are local files in `src/content/posts/`, no CMS or database

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Writing a post

Add a new `.mdx` file to `src/content/posts/`, e.g. `src/content/posts/my-post.mdx`:

```mdx
---
title: "My post title"
date: "2026-07-23"
summary: "One or two sentences shown on the blog index."
---

Regular markdown content goes here.

<BarChart
  title="Optional embedded chart"
  data={[{ label: "A", value: 1 }, { label: "B", value: 2 }]}
/>
```

Any component registered in `src/components/mdx-components.tsx` can be used directly in a post. Add new components there as needed (e.g. other chart types, callout boxes).

## Deployment

Hosted on AWS Amplify, connected to the `main` branch of this GitHub repo. Amplify auto-detects the Next.js app and builds/deploys on every push to `main` — see the AWS Amplify console for build settings and deploy history.
