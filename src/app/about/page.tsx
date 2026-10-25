import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Bradley Grantham",
  description: "About Bradley Grantham.",
};

export default function AboutPage() {
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
        <p>
          I&apos;m Director of Data Science and AI at Popsa, where I&apos;ve
          spent the last six years leading the data science team and building
          our AI roadmap.
        </p>

        <section>
          <h2 className="font-medium text-zinc-950 dark:text-zinc-50">
            What I work on
          </h2>
          <p className="mt-3">
            We build and ship AI features in the product like Memories, a curated view of your camera roll.
            We&apos;re also working on building out our internal agents to help us become more efficient.
          </p>
        </section>

        <section>
          <h2 className="font-medium text-zinc-950 dark:text-zinc-50">
            Background
          </h2>
          <p className="mt-3">
            Before Popsa, I spent three years as a data scientist at Channel 4,
            working on homepage personalisation and contextual advertising. I
            have a master&apos;s from UCL&apos;s Computer Science
            and Machine Learning department, and a first in Physics from the
            University of Bath (which also included a placement year in Passive
            Equities at UBS Wealth Management).
          </p>
        </section>

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
