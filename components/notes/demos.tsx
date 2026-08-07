"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  House,
  Terminal,
  Database,
  Image as PhImage,
  Waveform,
  Gear,
  Trash,
  Phone,
  BellSimple,
  ArrowDown,
  NavigationArrow,
  ChatCircle,
} from "@phosphor-icons/react";

export type NoteDemoId =
  | "island"
  | "dock"
  | "spring-config"
  | "oklch"
  | "var-font";

/*  Variable Font Morph  */
function VarFontDemo() {
  const [weight, setWeight] = useState(300);
  return (
    <div className="note-demo" style={{ flexDirection: "column", gap: "20px" }}>
      <span className="note-demo-label">variable font</span>
      <div
        style={{
          fontVariationSettings: `'wght' ${weight}`,
          fontSize: "40px",
          fontFamily: "var(--font-sans)",
          letterSpacing: "-.02em",
          color: "var(--fg)",
          cursor: "default",
          userSelect: "none",
          transition:
            "font-variation-settings 400ms cubic-bezier(.34,1.3,.64,1)",
        }}
        onMouseEnter={() => setWeight(800)}
        onMouseLeave={() => setWeight(300)}
      >
        CORELITH
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <input
          type="range"
          min="100"
          max="900"
          step="10"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          style={{ width: "180px", accentColor: "var(--fg)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            color: "var(--fg-subtle)",
          }}
        >
          wght: {weight}
        </span>
      </div>
    </div>
  );
}

/*  macOS Dock  */
const DOCK_APPS: { icon: React.ReactNode; label: string; color: string }[] = [
  { icon: <House weight="fill" size={20} />, label: "Home", color: "#4F46E5" },
  { icon: <Terminal weight="fill" size={20} />, label: "Terminal", color: "#059669" },
  { icon: <Database weight="fill" size={20} />, label: "Database", color: "#B45309" },
  { icon: <PhImage weight="fill" size={20} />, label: "Photos", color: "#DB2777" },
  { icon: <Waveform weight="fill" size={20} />, label: "Audio", color: "#7C3AED" },
  { icon: <Gear weight="fill" size={20} />, label: "Settings", color: "#6B7280" },
  { icon: <Trash weight="fill" size={20} />, label: "Trash", color: "#DC2626" },
];

function DockDemo() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const BASE = 40;
  const MAX_S = 1.72;
  const SIGMA = 58;

  const getScale = (idx: number): number => {
    if (mouseX === null || !containerRef.current) return 1;
    const rect = containerRef.current.getBoundingClientRect();
    const span = rect.width / DOCK_APPS.length;
    const cx = rect.left + (idx + 0.5) * span;
    const d = Math.abs(mouseX - cx);
    return 1 + (MAX_S - 1) * Math.exp(-(d * d) / (SIGMA * SIGMA));
  };

  return (
    <div className="note-demo" style={{ justifyContent: "flex-end", flexDirection: "column", paddingBottom: "24px" }}>
      <span className="note-demo-label">dock magnification</span>
      <div
        ref={containerRef}
        className="d-dock"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
      >
        {DOCK_APPS.map((app, i) => {
          const s = getScale(i);
          return (
            <div
              key={app.label}
              className="d-dock-icon"
              title={app.label}
              style={{
                width: `${BASE}px`,
                height: `${BASE}px`,
                background: app.color,
                transform: `translateY(${-(s - 1) * BASE * 0.5}px) scale(${s})`,
                transition:
                  mouseX !== null
                    ? "transform 60ms ease"
                    : "transform 220ms cubic-bezier(.23,1,.32,1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {app.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*  OKLCH Color Mixer  */
function OklchDemo() {
  const [hue1, setHue1] = useState(260);
  const [hue2, setHue2] = useState(160);

  const oklchGradient = (h1: number, h2: number) => {
    const steps = 7;
    const stops = Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      const h = h1 + (h2 - h1) * t;
      const hRad = (h * Math.PI) / 180;
      const L = 0.65;
      const C = 0.18;
      const a = C * Math.cos(hRad);
      const b = C * Math.sin(hRad);
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
      const lc = l_ * l_ * l_;
      const mc = m_ * m_ * m_;
      const sc = s_ * s_ * s_;
      const r = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
      const g = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
      const bv = -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc;
      const toSrgb = (x: number) => {
        const v = Math.max(0, Math.min(1, x));
        return Math.round((v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255);
      };
      return `rgb(${toSrgb(r)},${toSrgb(g)},${toSrgb(bv)}) ${(t * 100).toFixed(0)}%`;
    });
    return `linear-gradient(90deg, ${stops.join(", ")})`;
  };

  return (
    <div className="note-demo" style={{ flexDirection: "column", gap: "20px", padding: "24px" }}>
      <span className="note-demo-label">oklch color mixer</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            sRGB — hue {hue1}° → {hue2}°
          </span>
          <div
            style={{
              height: "36px",
              borderRadius: "6px",
              background: `linear-gradient(90deg, hsl(${hue1},70%,55%), hsl(${hue2},70%,55%))`,
              border: "1px solid var(--border)",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            OKLCH — perceptual L=0.65 C=0.18
          </span>
          <div
            style={{
              height: "36px",
              borderRadius: "6px",
              background: oklchGradient(hue1, hue2),
              border: "1px solid var(--border)",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "16px", width: "100%" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            Hue A: {hue1}°
          </label>
          <input type="range" min="0" max="360" value={hue1} onChange={(e) => setHue1(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--fg)" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--fg-subtle)" }}>
            Hue B: {hue2}°
          </label>
          <input type="range" min="0" max="360" value={hue2} onChange={(e) => setHue2(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--fg)" }} />
        </div>
      </div>
    </div>
  );
}

/*  Spring Configurator  */
function SpringConfigDemo() {
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(18);
  const [mass, setMass] = useState(1);
  const [running, setRunning] = useState(false);
  const [ballY, setBallY] = useState(0);
  const [curve, setCurve] = useState<number[]>([]);
  const rafRef = useRef<number>();

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const TARGET = 80;
    let pos = 0;
    let vel = 0;
    const dt = 1 / 60;
    const pts: number[] = [];
    setRunning(true);
    setBallY(0);

    const tick = () => {
      const force = -stiffness * (pos - TARGET) - damping * vel;
      const acc = force / mass;
      vel += acc * dt;
      pos += vel * dt;
      pts.push(pos);
      setBallY(pos);
      if (pts.length < 120) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurve([...pts]);
        setRunning(false);
      }
    };
    setCurve([]);
    rafRef.current = requestAnimationFrame(tick);
  }, [stiffness, damping, mass]);

  useEffect(() => { run(); }, [run]);
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const W = 220;
  const H = 80;
  const TARGET_VAL = 80;
  const pts = curve.length > 0 ? curve : [];
  const maxY = Math.max(TARGET_VAL, ...pts);
  const pathD = pts
    .map((y, i) => {
      const x = (i / (pts.length - 1 || 1)) * W;
      const py = H - (y / maxY) * (H - 4);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="note-demo" style={{ flexDirection: "column", gap: "16px", padding: "20px" }}>
      <span className="note-demo-label">spring configurator</span>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        <div style={{ position: "relative", width: "32px", height: "100px", background: "var(--bg-subtle)", borderRadius: "6px", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              bottom: `calc(${((ballY / 100) * 60)}px)`,
              left: "4px",
              right: "4px",
              height: "24px",
              background: "var(--fg)",
              borderRadius: "4px",
              transition: running ? "none" : undefined,
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <svg width={W} height={H} style={{ display: "block", maxWidth: "100%" }}>
            <line x1="0" y1={H - (TARGET_VAL / maxY) * (H - 4)} x2={W} y2={H - (TARGET_VAL / maxY) * (H - 4)} stroke="var(--border)" strokeWidth="1" strokeDasharray="3,3" />
            {pathD && <path d={pathD} fill="none" stroke="var(--fg)" strokeWidth="1.5" />}
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "300px" }}>
        {([["Stiffness", stiffness, setStiffness, 20, 600] as const,
           ["Damping", damping, setDamping, 1, 60] as const,
           ["Mass", mass, setMass, 0.1, 4] as const] as const).map(([label, val, setter, min, max]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fg-subtle)", width: "76px", flexShrink: 0 }}>{label}: {typeof val === "number" && val < 10 ? val.toFixed(1) : val}</span>
            <input
              type="range"
              min={min}
              max={max}
              step={label === "Mass" ? 0.1 : 1}
              value={val}
              onChange={(e) => setter(Number(e.target.value) as never)}
              style={{ flex: 1, accentColor: "var(--fg)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/*  Dynamic Island  */
type IslandState = "idle" | "ring" | "alarm" | "download" | "nav" | "message";
const ISLAND_DIMS: Record<IslandState, { w: number; h: number }> = {
  idle: { w: 126, h: 32 },
  ring: { w: 316, h: 84 },
  alarm: { w: 258, h: 74 },
  download: { w: 252, h: 76 },
  nav: { w: 252, h: 74 },
  message: { w: 288, h: 88 },
};

function IslandDemo() {
  const [state, setState] = useState<IslandState>("idle");
  const [vis, setVis] = useState(false);
  const [prog, setProg] = useState(0);
  const autoRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();

  const activate = (s: IslandState) => {
    clearTimeout(autoRef.current);
    cancelAnimationFrame(rafRef.current!);
    setVis(false);
    setState(s);
    setTimeout(() => setVis(true), 120);
    if (s === "download") {
      setProg(0);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 2600, 1);
        setProg(p * 100);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          autoRef.current = setTimeout(() => {
            setVis(false);
            setTimeout(() => setState("idle"), 180);
          }, 700);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      autoRef.current = setTimeout(() => {
        setVis(false);
        setTimeout(() => setState("idle"), 180);
      }, 3600);
    }
  };

  useEffect(
    () => () => {
      clearTimeout(autoRef.current);
      cancelAnimationFrame(rafRef.current!);
    },
    [],
  );

  const { w, h } = ISLAND_DIMS[state];
  const R = 20;
  const circ = 2 * Math.PI * R;
  const dashOffset = circ * (1 - prog / 100);

  return (
    <div
      className="note-demo"
      style={{ flexDirection: "column", gap: "18px", paddingTop: "24px" }}
    >
      <span className="note-demo-label">dynamic island</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "104px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div className="d-island" style={{ width: `${w}px`, height: `${h}px` }}>
          <div
            className="d-island-content"
            data-visible={vis && state !== "idle"}
          >
            {state === "ring" && (
              <>
                <div className="d-island-avatar" style={{ background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center" }}><Phone weight="fill" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-muted">Incoming call</div>
                  <div className="d-island-title">Tatenda C.</div>
                  <div className="d-island-wave">
                    {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.75, 1, 0.45, 0.65].map(
                      (amp, i) => (
                        <div
                          key={i}
                          style={{
                            height: `${amp * 100}%`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="d-island-actions">
                  <button
                    className="d-island-action danger"
                    onClick={() => activate("idle")}
                  >
                    End
                  </button>
                  <button
                    className="d-island-action accept"
                    onClick={() => activate("idle")}
                  >
                    Take
                  </button>
                </div>
              </>
            )}
            {state === "alarm" && (
              <>
                <div className="d-island-glyph" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><BellSimple weight="fill" size={20} /></div>
                <div style={{ flex: 1 }}>
                  <div className="d-island-time">6:00</div>
                  <div className="d-island-muted">Morning alarm</div>
                </div>
                <div className="d-island-actions">
                  <button
                    className="d-island-action"
                    onClick={() => activate("idle")}
                  >
                    Snooze
                  </button>
                  <button
                    className="d-island-action"
                    onClick={() => activate("idle")}
                  >
                    Dismiss
                  </button>
                </div>
              </>
            )}
            {state === "download" && (
              <>
                <div className="d-island-glyph" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowDown weight="bold" size={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-title">Claude</div>
                  <div className="d-island-muted">Downloading...</div>
                </div>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  style={{ flexShrink: 0 }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,.15)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,.9)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 25 25)"
                    style={{ transition: "stroke-dashoffset 80ms linear" }}
                  />
                  <text
                    x="25"
                    y="25"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,.85)"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {Math.round(prog)}%
                  </text>
                </svg>
              </>
            )}
            {state === "nav" && (
              <>
                <div className="d-island-glyph" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><NavigationArrow weight="fill" size={20} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-muted">Turn right</div>
                  <div className="d-island-title">Baker St</div>
                  <div className="d-island-muted">in 200m</div>
                </div>
                <div className="d-island-eta">
                  <span>5</span>
                  <span>min</span>
                </div>
              </>
            )}
            {state === "message" && (
              <>
                <div className="d-island-avatar purple" style={{ background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center" }}><ChatCircle weight="fill" size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="d-island-title">Farai</div>
                  <div className="d-island-muted truncate">
                    are you still at the office?
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="d-island-controls">
        {(["ring", "alarm", "download", "nav", "message"] as IslandState[]).map(
          (s) => (
            <button
              key={s}
              className="d-island-btn"
              data-active={state === s}
              onClick={() => activate(s)}
            >
              {s === "ring"
                ? "Call"
                : s === "alarm"
                  ? "Alarm"
                  : s === "download"
                    ? "Download"
                    : s === "nav"
                      ? "Route"
                      : "Message"}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

/*
   CODE SNIPPETS
 */
const CODE: Record<NoteDemoId, string> = {
  island: `<span class="cm">// One div — morph via width + height</span>
style={{
  <span class="prop">width</span>:  \`\${dims.w}px\`,
  <span class="prop">height</span>: \`\${dims.h}px\`,
  <span class="prop">borderRadius</span>: <span class="str">'100px'</span>,
  <span class="prop">background</span>: <span class="str">'#000'</span>,
  <span class="prop">transition</span>:
    <span class="str">'width 420ms cubic-bezier(.34,1.15,.64,1),'</span> +
    <span class="str">'height 420ms cubic-bezier(.34,1.15,.64,1)'</span>,
}}

<span class="cm">// Content fades in 120ms after the morph starts</span>
opacity: vis && state !== <span class="str">'idle'</span> ? <span class="num">1</span> : <span class="num">0</span>,
transition: <span class="str">'opacity 180ms ease'</span>`,

  dock: `<span class="cm">// Gaussian magnification falloff</span>
<span class="kw">const</span> <span class="fn">getScale</span> = (idx: <span class="kw">number</span>) => {
  <span class="kw">const</span> dist = Math.<span class="fn">abs</span>(mouseX - <span class="fn">iconCenter</span>(idx))
  <span class="kw">return</span> <span class="num">1</span> + (MAX - <span class="num">1</span>) *
    Math.<span class="fn">exp</span>(-(dist * dist) / (sigma * sigma))
}

<span class="cm">// sigma = 58 — a neighbour one gap away lands near 1.4</span>
<span class="cm">// sigma = 100 — wider, softer, the whole dock inflates</span>

<span class="cm">// Scale from the bottom edge, lift to stay on the shelf</span>
transform: \`translateY(\${-(s-<span class="num">1</span>)*BASE*<span class="num">0.5</span>}px)
  scale(\${s})\``,

  "spring-config": `<span class="cm">// Verlet integration — position + velocity per frame</span>
<span class="kw">const</span> <span class="fn">tick</span> = () => {
  <span class="kw">const</span> force =
    -stiffness * (pos - target)  <span class="cm">// restore</span>
    - damping * vel              <span class="cm">// resist</span>
  acc = force / mass
  vel += acc * dt
  pos += vel * dt
  <span class="fn">requestAnimationFrame</span>(tick)
}

<span class="cm">// Critical damping: no oscillation</span>
<span class="cm">// damping = 2 × √(stiffness × mass)</span>
<span class="cm">// Under-damped: bouncy. Over-damped: sluggish.</span>`,

  oklch: `<span class="cm">/* sRGB: hsl(260,70%,55%) → hsl(160,70%,55%) — greys out */</span>
background: linear-gradient(90deg,
  hsl(<span class="num">260</span>,<span class="num">70%</span>,<span class="num">55%</span>),
  hsl(<span class="num">160</span>,<span class="num">70%</span>,<span class="num">55%</span>));

<span class="cm">/* OKLCH: perceptual L stays constant */</span>
background: linear-gradient(90deg,
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">260</span>),
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">200</span>),
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">160</span>));

<span class="cm">/* Native in modern CSS — no JS needed */</span>`,

  "var-font": `<span class="cm">/* Animate the weight axis on hover */</span>
.<span class="fn">word</span> {
  <span class="prop">font-variation-settings</span>: <span class="str">'wght'</span> <span class="kw">var</span>(--weight, <span class="num">300</span>);
  <span class="prop">transition</span>: font-variation-settings
    <span class="num">400ms</span> cubic-bezier(.<span class="num">34</span>,<span class="num">1.3</span>,.<span class="num">64</span>,<span class="num">1</span>);
}
.<span class="fn">word</span>:hover {
  --weight: <span class="num">800</span>;
}

<span class="cm">/* Or drive it with JS for a range slider */</span>
<span class="kw">const</span> [weight, setWeight] = <span class="fn">useState</span>(<span class="num">300</span>)
style={{ fontVariationSettings: \`<span class="str">'wght' \${weight}</span>\` }}`,
};

const DEMOS: Record<NoteDemoId, React.FC> = {
  island: IslandDemo,
  dock: DockDemo,
  "spring-config": SpringConfigDemo,
  oklch: OklchDemo,
  "var-font": VarFontDemo,
};

export function Demo({ id }: { id: NoteDemoId }) {
  const DemoComponent = DEMOS[id];
  return (
    <div className="note-stage">
      <DemoComponent />
    </div>
  );
}

export function Source({ id }: { id: NoteDemoId }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="note-source">
      <button
        aria-expanded={open}
        className="note-source-toggle"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "hide the source" : "show the source"}
      </button>
      {open ? (
        <div className="note-code">
          <div
            className="note-code-inner"
            dangerouslySetInnerHTML={{ __html: CODE[id] }}
          />
        </div>
      ) : null}
    </div>
  );
}
