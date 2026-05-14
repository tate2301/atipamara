import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { EXPERIMENT_META } from "@/components/sections/experiments-data";
import { posts } from "@/app/writing/posts";

export default function SiteNav() {
  const experimentsCount = Object.keys(EXPERIMENT_META).length;
  const writingCount = posts.length;

  return (
    <nav className="site-nav" aria-label="Primary">
      <Link href="/experiments" className="site-nav-item">
        <span>Experiments</span>
        <span className="count-badge">{experimentsCount}</span>
      </Link>
      <Link href="/writing" className="site-nav-item">
        <span>Writing</span>
        <span className="count-badge">{writingCount}</span>
      </Link>
      <Link href="/photos" className="site-nav-item">
        <span>Photos</span>
      </Link>
      <a
        href="https://github.com/tate2301"
        target="_blank"
        rel="noopener noreferrer"
        className="site-nav-item site-nav-ext"
      >
        <span>GitHub</span>
        <span className="ext-arrow" aria-hidden="true">↗</span>
      </a>
      <a
        href="https://www.upwork.com/freelancers/tatendachinyamakobvu"
        target="_blank"
        rel="noopener noreferrer"
        className="site-nav-item site-nav-ext"
      >
        <span>Upwork</span>
        <span className="ext-arrow" aria-hidden="true">↗</span>
      </a>
      <a
        href="https://twitter.com/atipamara"
        target="_blank"
        rel="noopener noreferrer"
        className="site-nav-item site-nav-ext"
      >
        <span>X</span>
        <span className="ext-arrow" aria-hidden="true">↗</span>
      </a>
      <span className="site-nav-spacer" aria-hidden="true" />
      <ThemeToggle />
    </nav>
  );
}
