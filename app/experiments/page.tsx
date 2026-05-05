import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Experiments from "@/components/sections/Experiments";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Experiments — Tatenda Chinyamakobvu",
  description:
    "19 interactive UI experiments — CSS animations, physics simulations, and interaction patterns.",
};

export default function ExperimentsPage() {
  return (
    <>
      <div className="wrap">
        <div className="exp-page-header">
          <ThemeToggle />
          <Link href="/" className="exp-back">← Home</Link>
          <h1 className="exp-page-title">Experiments</h1>
          <p className="exp-page-desc">
            Interactive UI patterns — click any to see the demo and source.
          </p>
        </div>
      </div>
      <Experiments />
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
