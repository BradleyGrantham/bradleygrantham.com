import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
        >
          Bradley Grantham
        </Link>
        <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-950 dark:hover:text-zinc-50">
            About
          </Link>
          <Link
            href="/blog"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
}
