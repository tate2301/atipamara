import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/sections/Header";
import SiteNav from "@/components/sections/SiteNav";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Awards from "@/components/sections/Awards";
import Footer from "@/components/sections/Footer";
import { EXPERIMENT_META } from "@/components/sections/experiments-data";
import { posts } from "@/app/writing/posts";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu — Product Engineer",
  description:
    "Product engineer based in Harare, Zimbabwe. Three companies run software I built from scratch — POS, ERP, customer analytics, and on-prem CCTV.",
};

export default function Page() {
  const experimentsCount = Object.keys(EXPERIMENT_META).length;
  const writingCount = posts.length;

  return (
    <div className="wrap">
      <SiteNav />
      <Header />
      <Projects />
      <Experience />
      <Awards />
      <section className="section">
        <Link href="/writing" className="exp-teaser-row">
          <div>
            <div className="exp-teaser-name">Writing</div>
            <div className="exp-teaser-sub">
              {writingCount} {writingCount === 1 ? "note" : "notes"} — debugging
              stories, build logs, and the occasional opinion
            </div>
          </div>
          <span className="exp-teaser-arrow">→</span>
        </Link>
      </section>
      <section className="section">
        <Link href="/photos" className="exp-teaser-row">
          <div>
            <div className="exp-teaser-name">Photos</div>
            <div className="exp-teaser-sub">A small archive — people, pups, and moments worth keeping</div>
          </div>
          <span className="exp-teaser-arrow">→</span>
        </Link>
      </section>
      <section className="section">
        <Link href="/experiments" className="exp-teaser-row">
          <div>
            <div className="exp-teaser-name">Experiments</div>
            <div className="exp-teaser-sub">
              {experimentsCount} interactive studies — physics, color,
              typography, interaction
            </div>
          </div>
          <span className="exp-teaser-arrow">→</span>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
