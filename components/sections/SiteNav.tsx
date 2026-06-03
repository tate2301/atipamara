import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { EXPERIMENT_META } from "@/components/sections/experiments-data";
import { posts } from "@/app/writing/posts";

function NavLinks({
  experimentsCount,
  writingCount,
}: {
  experimentsCount: number;
  writingCount: number;
}) {
  return (
    <>
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
    </>
  );
}

export default function SiteNav() {
  const experimentsCount = Object.keys(EXPERIMENT_META).length;
  const writingCount = posts.length;

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav-inline">
        <NavLinks
          experimentsCount={experimentsCount}
          writingCount={writingCount}
        />
        <span className="site-nav-spacer" aria-hidden="true" />
        <ThemeToggle />
      </div>
      <details className="site-nav-menu">
        <summary className="site-nav-trigger" aria-label="Open menu">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </summary>
        <div className="site-nav-dropdown" role="menu">
          <NavLinks
            experimentsCount={experimentsCount}
            writingCount={writingCount}
          />
          <div className="site-nav-dropdown-foot">
            <ThemeToggle />
          </div>
        </div>
      </details>
    </nav>
  );
}
