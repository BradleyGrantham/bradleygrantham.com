"use client";

import { useEffect, useRef } from "react";

// Pass `label` to keep showing it instead of swapping in the address.
export function ObfuscatedEmail({
  user,
  domain,
  label,
  className,
}: {
  user: string;
  domain: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const email = `${user}@${domain}`;
    const anchor = ref.current;
    if (anchor) {
      anchor.href = `mailto:${email}`;
      if (!label) anchor.textContent = email;
    }
  }, [user, domain, label]);

  return (
    <a ref={ref} href="#" className={className}>
      {label ?? "Email"}
    </a>
  );
}
