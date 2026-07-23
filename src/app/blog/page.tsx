import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format-date";

export const metadata: Metadata = {
  title: "Blog | Bradley Grantham",
  description: "Posts by Bradley Grantham.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Blog
      </h1>

      <ul className="mt-10 flex flex-col gap-10">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {formatDate(post.date)}
              </p>
              <h2 className="mt-1 text-lg font-medium text-zinc-950 group-hover:underline dark:text-zinc-50">
                {post.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {post.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
