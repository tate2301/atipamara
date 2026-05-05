import GridProfileCards from "@/components/Playground/GridProfileCards";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Stack — Experiments",
  description: "A stack of profile images with a hover/click spread effect. Inspired by the Family iOS app.",
};

export default function ImageStackPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "48px",
        padding: "20px",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "24px", right: "24px" }}>
        <ThemeToggle />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--fg-subtle)", marginBottom: "12px" }}>
          Experiment
        </p>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "var(--fg)", marginBottom: "8px" }}>
          Image Stack
        </h1>
        <p style={{ fontSize: "15px", color: "var(--fg-muted)" }}>
          Hover over the stack — inspired by the Family iOS app
        </p>
      </div>

      <GridProfileCards />

      <Link
        href="/"
        style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}
      >
        ← Back
      </Link>
    </div>
  );
}
