import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAbout } from "@/lib/about";

export const metadata: Metadata = {
  title: "About | Bradley Grantham",
  description: "About Bradley Grantham.",
};

export default function AboutPage() {
  const { intro, sections } = getAbout();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <Image
        src="/images/profile-256.jpg"
        alt="Bradley Grantham"
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover"
        style={{ objectPosition: "58% 20%" }}
        priority
      />

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        About
      </h1>

      <div className="mt-6 flex flex-col gap-10 text-zinc-600 dark:text-zinc-400">
        <MDXRemote source={intro} />

        {sections.map(({ heading, body }) => (
          <section key={heading}>
            <h2 className="font-medium text-zinc-950 dark:text-zinc-50">
              {heading}
            </h2>
            <MDXRemote
              source={body}
              components={{ p: (props) => <p className="mt-3" {...props} /> }}
            />
          </section>
        ))}

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
