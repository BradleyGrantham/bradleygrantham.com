import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Bradley Grantham",
  description: "About Bradley Grantham.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <Image
        src="/images/profile.jpg"
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

      <div className="mt-6 flex flex-col gap-4 text-zinc-600 dark:text-zinc-400">
        <p>
          {/* Placeholder bio — replace with your own. */}
          Hi, I&apos;m Bradley. I&apos;m a software engineer who likes
          building things end to end — from the backend systems that power a
          product to the small details of the interface people actually use.
        </p>
        <p>
          This site is where I write about what I&apos;m building and
          learning, mostly as a way of thinking out loud. Expect posts on
          software engineering, side projects, and whatever else I&apos;m
          currently pulling apart to see how it works.
        </p>
        <p>
          Outside of code, I&apos;m [fill in the rest — interests, background,
          whatever you want people to know].
        </p>
      </div>
    </div>
  );
}
