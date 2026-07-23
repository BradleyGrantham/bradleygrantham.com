import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format-date";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Bradley Grantham`,
      description: post.summary,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16">
      <header>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(post.date)}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ blockJS: false, blockDangerousJS: true }}
        />
      </div>
    </article>
  );
}
