import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { socialLinks } from "@/lib/social-links";

const linkClassName = "hover:text-zinc-950 hover:underline dark:hover:text-zinc-50";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-2xl gap-6 px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className={linkClassName}
          >
            {link.label}
          </a>
        ))}
        <ObfuscatedEmail
          user="bradley"
          domain="bradleygrantham.com"
          label="Email"
          className={linkClassName}
        />
      </div>
    </footer>
  );
}
