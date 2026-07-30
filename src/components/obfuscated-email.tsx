"use client";

import { useEffect, useRef } from "react";

export function ObfuscatedEmail({
  user,
  domain,
}: {
  user: string;
  domain: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const email = `${user}@${domain}`;
    const anchor = ref.current;
    if (anchor) {
      anchor.href = `mailto:${email}`;
      anchor.textContent = email;
    }
  }, [user, domain]);

  return (
    <a ref={ref} href="#">
      Email
    </a>
  );
}
