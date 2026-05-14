import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/sections/SiteNav";
import Footer from "@/components/sections/Footer";
import { posts, type Post } from "./posts";

export const metadata: Metadata = {
  title: "Writing — Tatenda Chinyamakobvu",
  description:
    "Notes, debugging stories, and short essays from a product engineer in Zimbabwe.",
};

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
        <SiteNav />
        <div className="page-head">
          <h1 className="page-title">Writing</h1>
          <p className="page-desc">
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
