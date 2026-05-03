import ButtonWithDisclosure from "@/components/ButtonWithDisclosure";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Bottom Bar — Experiments",
  description: "An attempt at recreating the Apple iPhone 15 marketing page bottom bar interaction.",
};

export default function AppleBottomBarPage() {
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
          Apple Bottom Bar
        </h1>
        <p style={{ fontSize: "15px", color: "var(--fg-muted)" }}>
          Inspired by the iPhone 15 product page — click the bar
        </p>
      </div>

      <ButtonWithDisclosure
        color="#fff"
        accentColor=""
        backgroundColor="#000"
        text="Learn more about our framework"
        icon={<QuestionMarkCircleIcon className="w-6 h-6 text-[#202020]" />}
      >
        <div className="bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-bold">Add a new item</h1>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et metus nec nisl.
          </p>
        </div>
      </ButtonWithDisclosure>

      <Link
        href="/"
        style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}
      >
        ← Back
      </Link>
    </div>
  );
}
