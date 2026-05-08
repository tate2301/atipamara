"use client";
import type { ReactNode } from "react";

type CalloutProps = {
  children: ReactNode;
  type?: "note" | "insight" | "warning";
};

export function Callout({ children, type = "note" }: CalloutProps) {
  return (
    <aside
      className="mdx-callout"
      data-type={type}
    >
      {children}
    </aside>
  );
}
