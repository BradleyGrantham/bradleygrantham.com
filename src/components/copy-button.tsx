"use client";

import { useState } from "react";

// The older copy method, for browsers that refuse the Clipboard API (embedded browsers, some
// privacy settings). Copies the selection of a temporary, off-screen textarea.
function copyWithSelection(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = copyWithSelection(text);
    }
    setStatus(copied ? "copied" : "failed");
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy"}
    </button>
  );
}
