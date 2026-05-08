import type { ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Footer from "@/components/sections/Footer";

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="wrap">
        <div className="post-header">
          <ThemeToggle />
          <Link href="/writing" className="exp-back">
            ← Writing
          </Link>
        </div>
        <article className="post-article">{children}</article>
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
