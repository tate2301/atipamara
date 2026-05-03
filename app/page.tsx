import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Awards from "@/components/sections/Awards";
import Experiments from "@/components/sections/Experiments";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu — Design Engineer",
  description:
    "Design engineer based in Harare, Zimbabwe. Building interfaces and products for founders and startups.",
};

export default function Page() {
  return (
    <>
      <div className="wrap">
        <Header />
        <Projects />
        <Experience />
        <Awards />
      </div>
      <Experiments />
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
