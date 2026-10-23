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
    </div>
  );
}
