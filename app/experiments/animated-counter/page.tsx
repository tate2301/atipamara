"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

function useCounter(target: number, duration: number, running: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!running) { setVal(0); return; }
    const t0 = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [running, target, duration]);
  return val;
}

type StatProps = { value: number; label: string; suffix?: string; duration?: number; running: boolean };
function Stat({ value, label, suffix = "", duration = 2000, running }: StatProps) {
  const count = useCounter(value, duration, running);
  return (
    <div style={{ textAlign: "center", padding: "32px 24px" }}>
      <p style={{ fontSize: "56px", fontWeight: 400, color: "var(--fg)", lineHeight: 1, marginBottom: "8px", fontVariantNumeric: "tabular-nums", fontFamily: "var(--font-mono)", letterSpacing: "-.03em" }}>
        {count.toLocaleString()}{suffix}
      </p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--fg-subtle)", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</p>
    </div>
  );
}

export default function AnimatedCounterPage() {
  const [running, setRunning] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRunning(true); },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const replay = useCallback(() => {
    setRunning(false);
    setTimeout(() => setRunning(true), 50);
  }, []);

  const stats = [
    { value: 6, label: "yrs experience", suffix: "+", duration: 1000 },
    { value: 20, label: "projects shipped", suffix: "+", duration: 1500 },
    { value: 3, label: "countries", suffix: "", duration: 800 },
    { value: 150, label: "k lines written", suffix: "k", duration: 2200 },
    { value: 12, label: "happy clients", suffix: "", duration: 1200 },
    { value: 37, label: "k usd prize", suffix: "k", duration: 1800 },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "var(--font-sans)", position: "relative" }}>
      <div style={{ position: "absolute", top: "24px", right: "24px" }}><ThemeToggle /></div>
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--fg-subtle)", marginBottom: "12px" }}>Experiment</p>
        <h1 style={{ fontSize: "24px", fontWeight: 400, color: "var(--fg)", marginBottom: "8px" }}>Animated Counter</h1>
        <p style={{ fontSize: "15px", color: "var(--fg-muted)" }}>Numbers count up when they enter the viewport</p>
      </div>

      <div
        ref={sentinelRef}
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid var(--border)", borderRadius: "12px", overflow: "hidden", maxWidth: "580px", width: "100%", background: "var(--bg-card)", boxShadow: "var(--shadow-sm)" }}
      >
        {stats.map((s, i) => (
          <div key={s.label} style={{ borderRight: (i + 1) % 3 !== 0 ? "1px solid var(--border)" : "none", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
            <Stat value={s.value} label={s.label} suffix={s.suffix} duration={s.duration} running={running} />
          </div>
        ))}
      </div>

      <button
        onClick={replay}
        style={{ marginTop: "32px", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--fg-subtle)", background: "none", border: "1px solid var(--border)", borderRadius: "4px", padding: "6px 14px", cursor: "pointer", transition: "color 140ms ease, border-color 140ms ease" }}
      >
        ↺ replay
      </button>

      <Link href="/" style={{ marginTop: "40px", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--fg-subtle)" }}>← Back</Link>
    </div>
  );
}
