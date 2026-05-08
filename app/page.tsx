import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/sections/Header";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Awards from "@/components/sections/Awards";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu — Product Engineer",
  description:
    "Product engineer based in Harare, Zimbabwe. Three companies run software I built from scratch — POS, ERP, customer analytics, and on-prem CCTV.",
};

export default function Page() {
  return (
    <div className="wrap">
      <Header />
      <Projects />
      <Experience />
      <Awards />
      <section className="section">
        <Link href="/experiments" className="exp-teaser-row">
          <div>
            <div className="exp-teaser-name">Experiments</div>
            <div className="exp-teaser-sub">19 interactive demos — CSS, animation, physics</div>
          </div>
          <span className="exp-teaser-arrow">→</span>
        </Link>
      </section>
      <Footer />
    </div>
  );
}
