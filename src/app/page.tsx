import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format-date";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Bradley Grantham
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Hi, I&apos;m Bradley. This is where I write about the things I&apos;m
        building and learning.
      </p>

      {recentPosts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Recent posts
          </h2>
          <ul className="mt-4 flex flex-col gap-6">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="mt-1 font-medium text-zinc-950 group-hover:underline dark:text-zinc-50">
                    {post.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/blog"
            className="mt-6 inline-block text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            View all posts →
          </Link>
        </div>
      )}
    </div>
  );
}
