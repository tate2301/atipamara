import type { Metadata } from "next";
import SiteNav from "@/components/sections/SiteNav";
import Experiments from "@/components/sections/Experiments";
import Footer from "@/components/sections/Footer";
import { EXPERIMENT_META } from "@/components/sections/experiments-data";

const experimentsCount = Object.keys(EXPERIMENT_META).length;

export const metadata: Metadata = {
  title: "Experiments - Tatenda Chinyamakobvu",
  description: `${experimentsCount} interactive UI studies: spring physics, perceptual color, fluid typography, and interaction patterns.`,
};

export default function ExperimentsPage() {
  return (
    <>
      <div className="wrap">
        <SiteNav />
        <div className="page-head">
          <h1 className="page-title">Experiments</h1>
          <p className="page-desc">
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
