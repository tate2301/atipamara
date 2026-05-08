import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Experiments from "@/components/sections/Experiments";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Experiments - Tatenda Chinyamakobvu",
  description:
    "18 interactive UI studies: spring physics, perceptual color, fluid typography, and interaction patterns.",
};

export default function ExperimentsPage() {
  return (
    <>
      <div className="wrap">
        <div className="exp-page-header">
          <ThemeToggle />
          <Link href="/" className="exp-back">
            Home
          </Link>
          <h1 className="exp-page-title">Experiments</h1>
          <p className="exp-page-desc">
            Interactive UI patterns. Select a study to inspect the demo and
            source.
          </p>
        </div>
        <Experiments />
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
