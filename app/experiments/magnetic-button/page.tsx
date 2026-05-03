"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function MagneticButtonPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: dx * 0.4, y: dy * 0.4 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovering(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "48px", padding: "20px", fontFamily: "var(--font-sans)", position: "relative" }}>
      <div style={{ position: "absolute", top: "24px", right: "24px" }}><ThemeToggle /></div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--fg-subtle)", marginBottom: "12px" }}>Experiment</p>
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "var(--fg)", marginBottom: "8px" }}>Magnetic Button</h1>
        <p style={{ fontSize: "15px", color: "var(--fg-muted)" }}>Hover over the button — it pulls toward your cursor</p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: "200px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <button
          ref={btnRef}
          onMouseEnter={() => setHovering(true)}
          style={{
            padding: "14px 32px",
            background: "var(--fg)",
            color: "var(--bg)",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: hovering
              ? "transform 80ms linear, box-shadow 140ms ease"
              : "transform 400ms cubic-bezier(.23,1,.32,1), box-shadow 300ms ease",
            boxShadow: hovering ? "0 8px 32px rgba(0,0,0,.16)" : "0 2px 8px rgba(0,0,0,.08)",
            userSelect: "none",
          }}
        >
          Pull me
        </button>
      </div>

      <Link href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>← Back</Link>
    </div>
  );
}
