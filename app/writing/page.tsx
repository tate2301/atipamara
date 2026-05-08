import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Writing — Tatenda Chinyamakobvu",
  description:
    "Notes, debugging stories, and short essays from a product engineer in Zimbabwe.",
};

type Post = {
  slug: string;
  title: string;
  date: string;
  year: string;
  topic: string;
  readTime: string;
  excerpt: string;
};

const posts: Post[] = [
  {
    slug: "fixing-wsl-localhost-issues",
    title: "Fixing WSL localhost & port forwarding issues",
    date: "Oct 22",
    year: "2025",
    topic: "Debugging",
    readTime: "1 min",
    excerpt:
      "The smallest fix for the most annoying WSL2 networking bug — disable Fast Startup.",
  },
];

function groupByYear(items: Post[]) {
  const map = new Map<string, Post[]>();
  for (const p of items) {
    if (!map.has(p.year)) map.set(p.year, []);
    map.get(p.year)!.push(p);
  }
  return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
}

export default function WritingPage() {
  const grouped = groupByYear(posts);

  return (
    <>
      <div className="wrap">
        <div className="exp-page-header">
          <ThemeToggle />
          <Link href="/" className="exp-back">
            Home
          </Link>
          <h1 className="exp-page-title">Writing</h1>
          <p className="exp-page-desc">
            Notes from the day-to-day — debugging stories, build logs, and the
            occasional opinion. Written when something was annoying enough to
            need a record.
          </p>
        </div>
        <section className="writing-section">
          {grouped.map(([year, group]) => (
            <div key={year} className="writing-year-group">
              <span className="writing-year">{year}</span>
              <ul className="writing-list">
                {group.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/writing/${post.slug}`}
                      className="writing-row"
                    >
                      <span className="writing-date">{post.date}</span>
                      <span className="writing-copy">
                        <span className="writing-title">{post.title}</span>
                        <span className="writing-excerpt">{post.excerpt}</span>
                        <span className="writing-meta">
                          <span className="writing-topic">{post.topic}</span>
                          <span className="writing-dot" aria-hidden="true">
                            ·
                          </span>
                          <span className="writing-readtime">
                            {post.readTime}
                          </span>
                        </span>
                      </span>
                      <span className="writing-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
