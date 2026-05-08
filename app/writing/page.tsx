import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Writing — Tatenda Chinyamakobvu",
  description:
    "Notes, debugging stories, and short essays from a product engineer in Zimbabwe.",
};

const posts = [
  {
    slug: "fixing-wsl-localhost-issues",
    title: "Fixing WSL localhost & port forwarding issues",
    date: "October 22, 2025",
    excerpt:
      "The smallest fix for the most annoying WSL2 networking bug — disable Fast Startup.",
  },
];

export default function WritingPage() {
  return (
    <>
      <div className="wrap">
        <header>
          <ThemeToggle />
          <Link href="/" className="exp-back">
            Home
          </Link>
          <div className="wordmark">
            <h1>Writing</h1>
          </div>
          <p className="tagline">
            Short notes from the day-to-day — debugging stories, build logs,
            and the occasional opinion.
          </p>
        </header>
        <section className="section">
          <span className="label">Posts</span>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="exp-row"
            >
              <div className="exp-year">{post.date}</div>
              <div>
                <span className="exp-company">{post.title}</span>
                <div className="exp-desc">{post.excerpt}</div>
              </div>
            </Link>
          ))}
        </section>
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
