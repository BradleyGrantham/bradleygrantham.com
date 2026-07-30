import type { Metadata } from "next";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

export const metadata: Metadata = {
  title: "Contact | Bradley Grantham",
  description: "Get in touch with Bradley Grantham.",
};

const links = [
  { label: "GitHub", href: "https://github.com/BradleyGrantham" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bradley-grantham-7b8b29a8/",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Contact
      </h1>

      <p className="mt-6 text-zinc-600 dark:text-zinc-400">
        The best way to reach me is by email, or find me on one of these:
      </p>

      <ul className="mt-6 flex flex-col gap-3 text-zinc-600 dark:text-zinc-400">
        <li>
          <span className="hover:text-zinc-950 hover:underline dark:hover:text-zinc-50">
            <ObfuscatedEmail user="bradley" domain="bradleygrantham.com" />
          </span>
        </li>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-zinc-950 hover:underline dark:hover:text-zinc-50"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
