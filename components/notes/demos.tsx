"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export type NoteDemoId = "island" | "dock" | "spring-config" | "oklch";

/* ============================================================
   DYNAMIC ISLAND
   Rebuilt on real springs. The pill morphs with framer-motion,
   content swaps through AnimatePresence, and tapping the pill
   cycles states by hand.
   ============================================================ */
type IslandState = "idle" | "ring" | "alarm" | "download" | "nav" | "message";
const ISLAND_ORDER: IslandState[] = ["ring", "alarm", "download", "nav", "message"];
const ISLAND_DIMS: Record<IslandState, { w: number; h: number }> = {
  idle: { w: 126, h: 34 },
  ring: { w: 320, h: 84 },
  alarm: { w: 262, h: 74 },
  download: { w: 256, h: 76 },
  nav: { w: 256, h: 74 },
  message: { w: 292, h: 88 },
};

function IslandDemo() {
  const [state, setState] = useState<IslandState>("idle");
  const [prog, setProg] = useState(0);
  const autoRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();
  const lastRef = useRef<IslandState>("ring");

  const activate = useCallback((s: IslandState) => {
    clearTimeout(autoRef.current);
    cancelAnimationFrame(rafRef.current!);
    setState(s);
    if (s === "idle") return;
    lastRef.current = s;
    if (s === "download") {
      setProg(0);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 2600, 1);
        setProg(p * 100);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          autoRef.current = setTimeout(() => setState("idle"), 700);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      autoRef.current = setTimeout(() => setState("idle"), 3600);
    }
  }, []);

  useEffect(
    () => () => {
      clearTimeout(autoRef.current);
      cancelAnimationFrame(rafRef.current!);
    },
    [],
  );

  const cycle = () => {
    if (state === "idle") {
      activate(ISLAND_ORDER[0]);
    } else {
      const i = ISLAND_ORDER.indexOf(state);
      activate(ISLAND_ORDER[(i + 1) % ISLAND_ORDER.length]);
    }
  };

  const { w, h } = ISLAND_DIMS[state];
  const R = 20;
  const circ = 2 * Math.PI * R;
  const dashOffset = circ * (1 - prog / 100);

  return (
    <div
      className="note-demo"
      style={{ flexDirection: "column", gap: "20px", paddingTop: "28px" }}
    >
      <span className="note-demo-label">dynamic island. tap the pill</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "104px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <motion.div
          className="d-island"
          animate={{ width: w, height: h }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          whileTap={{ scale: 0.96 }}
          onClick={cycle}
          style={{ cursor: "pointer" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={state}
              className="d-island-content"
              initial={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
              animate={{
                opacity: state === "idle" ? 0 : 1,
                filter: "blur(0px)",
                scale: 1,
                transition: { delay: 0.12, duration: 0.18 },
              }}
              exit={{
                opacity: 0,
                filter: "blur(5px)",
                scale: 0.9,
                transition: { duration: 0.1 },
              }}
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
                      onClick={(e) => { e.stopPropagation(); activate("idle"); }}
                    >
                      End
                    </button>
                    <button
                      className="d-island-action accept"
                      onClick={(e) => { e.stopPropagation(); activate("idle"); }}
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
                      onClick={(e) => { e.stopPropagation(); activate("idle"); }}
                    >
                      Snooze
                    </button>
                    <button
                      className="d-island-action"
                      onClick={(e) => { e.stopPropagation(); activate("idle"); }}
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
                  <svg width="50" height="50" viewBox="0 0 50 50" style={{ flexShrink: 0 }}>
                    <circle cx="25" cy="25" r={R} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" />
                    <circle
                      cx="25" cy="25" r={R} fill="none"
                      stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={circ} strokeDashoffset={dashOffset}
                      transform="rotate(-90 25 25)"
                      style={{ transition: "stroke-dashoffset 80ms linear" }}
                    />
                    <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,.85)" fontSize="11" fontFamily="monospace">
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
              {state === "idle" && <span />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="d-island-controls">
        {ISLAND_ORDER.map((s) => (
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
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MACOS DOCK
   Rebuilt with the launch bounce and running indicators.
   Magnification is a Gaussian field; clicking an icon plays
   the bounce and lights the dot underneath.
   ============================================================ */
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
  const [hovered, setHovered] = useState<string | null>(null);
  const [bouncing, setBouncing] = useState<Set<string>>(new Set());
  const [running, setRunning] = useState<Set<string>>(new Set());
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

  const launch = (label: string) => {
    setBouncing((prev) => new Set(prev).add(label));
    setRunning((prev) => new Set(prev).add(label));
  };

  const settleBounce = (label: string) => {
    setBouncing((prev) => {
      const next = new Set(prev);
      next.delete(label);
      return next;
    });
  };

  return (
    <div
      className="note-demo"
      style={{ flexDirection: "column", justifyContent: "flex-end", paddingBottom: "22px", gap: "10px" }}
    >
      <span className="note-demo-label">dock. click an icon</span>
      <div className="dock-name">{hovered ?? " "}</div>
      <div
        ref={containerRef}
        className="d-dock"
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => {
          setMouseX(null);
          setHovered(null);
        }}
      >
        {DOCK_APPS.map((app, i) => {
          const s = getScale(i);
          return (
            <div className="dock-col" key={app.label}>
              <div
                className={`dock-bounce${bouncing.has(app.label) ? " bouncing" : ""}`}
                onAnimationEnd={() => settleBounce(app.label)}
              >
                <div
                  className="d-dock-icon"
                  onMouseEnter={() => setHovered(app.label)}
                  onClick={() => launch(app.label)}
                  style={{
                    width: `${BASE}px`,
                    height: `${BASE}px`,
                    background: app.color,
                    transform: `translateY(${-(s - 1) * BASE * 0.5}px) scale(${s})`,
                    transition:
                      mouseX !== null
                        ? "transform 60ms ease"
                        : "transform 240ms cubic-bezier(.23,1,.32,1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  {app.icon}
                </div>
              </div>
              <span className={`dock-dot${running.has(app.label) ? " on" : ""}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   SPRING LAB
   A ball on an invisible spring. Drag it anywhere, let go,
   and watch the physics bring it home. The strip below plots
   distance from rest over time.
   ============================================================ */
const SPRING_PRESETS = [
  { name: "gentle", k: 120, c: 24, m: 1 },
  { name: "snappy", k: 420, c: 30, m: 1 },
  { name: "bouncy", k: 320, c: 9, m: 1 },
  { name: "heavy", k: 200, c: 18, m: 3.2 },
] as const;

function SpringDemo() {
  const [k, setK] = useState(320);
  const [c, setC] = useState(9);
  const [m, setM] = useState(1);
  const [ball, setBall] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [curve, setCurve] = useState<number[]>([]);

  const stageRef = useRef<HTMLDivElement>(null);
  const sim = useRef({ px: 0, py: 0, vx: 0, vy: 0 });
  const raf = useRef<number>();
  const curveBuf = useRef<number[]>([]);
  const trailBuf = useRef<{ x: number; y: number }[]>([]);
  const params = useRef({ k, c, m });
  params.current = { k, c, m };
  const lastPointer = useRef({ x: 0, y: 0, t: 0 });
  const throwVel = useRef({ x: 0, y: 0 });

  const stop = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  };

  const release = useCallback((x: number, y: number, vx: number, vy: number) => {
    stop();
    sim.current = { px: x, py: y, vx, vy };
    curveBuf.current = [];
    trailBuf.current = [];
    const dt = 1 / 60;
    const tick = () => {
      const { k, c, m } = params.current;
      const s = sim.current;
      s.vx += ((-k * s.px - c * s.vx) / m) * dt;
      s.vy += ((-k * s.py - c * s.vy) / m) * dt;
      s.px += s.vx * dt;
      s.py += s.vy * dt;
      const dist = Math.hypot(s.px, s.py);
      const speed = Math.hypot(s.vx, s.vy);
      trailBuf.current.push({ x: s.px, y: s.py });
      if (trailBuf.current.length > 16) trailBuf.current.shift();
      if (curveBuf.current.length < 240) curveBuf.current.push(dist);
      setBall({ x: s.px, y: s.py });
      setTrail([...trailBuf.current]);
      setCurve([...curveBuf.current]);
      if (dist < 0.8 && speed < 2) {
        setBall({ x: 0, y: 0 });
        setTrail([]);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => release(150, -60, 0, 0), 500);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [release]);

  const anchorOf = () => {
    const rect = stageRef.current!.getBoundingClientRect();
    return { rect, ax: rect.left + rect.width / 2, ay: rect.top + rect.height / 2 };
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    stop();
    setDragging(true);
    setTrail([]);
    lastPointer.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    throwVel.current = { x: 0, y: 0 };
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !stageRef.current) return;
    const { rect, ax, ay } = anchorOf();
    const maxX = rect.width / 2 - 26;
    const maxY = rect.height / 2 - 26;
    const x = Math.max(-maxX, Math.min(maxX, e.clientX - ax));
    const y = Math.max(-maxY, Math.min(maxY, e.clientY - ay));
    const now = performance.now();
    const dt = now - lastPointer.current.t;
    if (dt > 0) {
      throwVel.current = {
        x: ((e.clientX - lastPointer.current.x) / dt) * 1000,
        y: ((e.clientY - lastPointer.current.y) / dt) * 1000,
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
    setBall({ x, y });
  };

  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    release(ball.x, ball.y, throwVel.current.x * 0.4, throwVel.current.y * 0.4);
  };

  const CW = 240;
  const CH = 48;
  const maxDist = Math.max(60, ...curve);
  const curvePath = curve
    .map((d, i) => {
      const x = (i / Math.max(curve.length - 1, 1)) * CW;
      const y = CH - 3 - (d / maxDist) * (CH - 6);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const applyPreset = (p: (typeof SPRING_PRESETS)[number]) => {
    setK(p.k);
    setC(p.c);
    setM(p.m);
    params.current = { k: p.k, c: p.c, m: p.m };
    release(150, -60, 0, 0);
  };

  return (
    <div
      className="note-demo"
      style={{ flexDirection: "column", gap: "14px", padding: "24px 20px 20px", alignItems: "stretch" }}
    >
      <span className="note-demo-label">spring lab. throw the ball</span>
      <div className="slab-stage" ref={stageRef} style={{ marginTop: "14px" }}>
        <span className="slab-anchor" />
        {dragging && (
          <svg className="slab-sling" aria-hidden="true">
            <line
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${ball.x}px)`}
              y2={`calc(50% + ${ball.y}px)`}
              stroke="var(--border-hover)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
        )}
        {trail.map((p, i) => (
          <span
            key={i}
            className="slab-trail"
            style={{
              transform: `translate(${p.x}px, ${p.y}px)`,
              opacity: ((i + 1) / trail.length) * 0.35,
            }}
          />
        ))}
        <div
          className="slab-ball"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{
            transform: `translate(${ball.x}px, ${ball.y}px) scale(${dragging ? 1.12 : 1})`,
            cursor: dragging ? "grabbing" : "grab",
          }}
        />
      </div>
      <svg className="slab-curve" viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1={CH - 3} x2={CW} y2={CH - 3} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
        {curvePath && <path d={curvePath} fill="none" stroke="var(--fg)" strokeWidth="1.5" />}
      </svg>
      <div className="slab-presets">
        {SPRING_PRESETS.map((p) => (
          <button
            key={p.name}
            className="slab-preset"
            data-active={k === p.k && c === p.c && m === p.m}
            onClick={() => applyPreset(p)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="slab-sliders">
        {(
          [
            ["stiffness", k, setK, 20, 600, 1],
            ["damping", c, setC, 1, 60, 1],
            ["mass", m, setM, 0.1, 4, 0.1],
          ] as const
        ).map(([label, val, setter, min, max, step]) => (
          <label key={label} className="slab-slider">
            <span>
              {label}: {val < 10 ? Number(val).toFixed(1) : val}
            </span>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => setter(Number(e.target.value) as never)}
              style={{ accentColor: "var(--fg)" }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   OKLCH MIXER
   Two gradients, same endpoints, different beliefs. The big
   swatches are the midpoints, where sRGB gives up and OKLCH
   keeps its promise.
   ============================================================ */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const kk = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(kk - 3, 9 - kk, 1));
  };
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}

function oklchToRgb(h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const L = 0.65;
  const C = 0.18;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const lc = l_ ** 3;
  const mc = m_ ** 3;
  const sc = s_ ** 3;
  const r = 4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const g = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bv = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;
  const gamma = (x: number) => {
    const v = Math.max(0, Math.min(1, x));
    return (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255;
  };
  return [gamma(r), gamma(g), gamma(bv)];
}

const rgbCss = (c: [number, number, number]) =>
  `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;

function OklchDemo() {
  const [hue1, setHue1] = useState(275);
  const [hue2, setHue2] = useState(150);

  const oklchGradient = () => {
    const steps = 9;
    const stops = Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      const h = hue1 + (hue2 - hue1) * t;
      return `${rgbCss(oklchToRgb(h))} ${(t * 100).toFixed(0)}%`;
    });
    return `linear-gradient(90deg, ${stops.join(", ")})`;
  };

  const rgbA = hslToRgb(hue1, 0.7, 0.55);
  const rgbB = hslToRgb(hue2, 0.7, 0.55);
  const midSrgb: [number, number, number] = [
    (rgbA[0] + rgbB[0]) / 2,
    (rgbA[1] + rgbB[1]) / 2,
    (rgbA[2] + rgbB[2]) / 2,
  ];
  const midOklch = oklchToRgb(hue1 + (hue2 - hue1) / 2);

  const surprise = () => {
    const h1 = Math.floor(Math.random() * 360);
    const h2 = (h1 + 130 + Math.floor(Math.random() * 100)) % 360;
    setHue1(h1);
    setHue2(h2);
  };

  return (
    <div className="note-demo" style={{ flexDirection: "column", gap: "18px", padding: "48px 24px 24px", alignItems: "stretch" }}>
      <span className="note-demo-label">same endpoints, two beliefs</span>
      <div className="ok-row">
        <span className="ok-label">srgb</span>
        <div
          className="ok-bar"
          style={{ background: `linear-gradient(90deg, hsl(${hue1},70%,55%), hsl(${hue2},70%,55%))` }}
        />
      </div>
      <div className="ok-row">
        <span className="ok-label">oklch</span>
        <div className="ok-bar" style={{ background: oklchGradient() }} />
      </div>
      <div className="ok-mid">
        <div className="ok-swatch" style={{ background: rgbCss(midSrgb) }}>
          <span>srgb midpoint</span>
        </div>
        <div className="ok-swatch" style={{ background: rgbCss(midOklch) }}>
          <span>oklch midpoint</span>
        </div>
      </div>
      <div className="ok-controls">
        <label className="ok-slider">
          <span>hue a: {hue1}</span>
          <input type="range" min="0" max="360" value={hue1} onChange={(e) => setHue1(Number(e.target.value))} style={{ accentColor: "var(--fg)" }} />
        </label>
        <label className="ok-slider">
          <span>hue b: {hue2}</span>
          <input type="range" min="0" max="360" value={hue2} onChange={(e) => setHue2(Number(e.target.value))} style={{ accentColor: "var(--fg)" }} />
        </label>
        <button className="ok-surprise" onClick={surprise}>
          surprise me
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   SOURCE SNIPPETS
   ============================================================ */
const CODE: Record<NoteDemoId, string> = {
  island: `<span class="cm">// One div. The morph is a real spring.</span>
&lt;motion.div
  animate={{ <span class="prop">width</span>: dims.w, <span class="prop">height</span>: dims.h }}
  transition={{ <span class="prop">type</span>: <span class="str">'spring'</span>, <span class="prop">stiffness</span>: <span class="num">420</span>, <span class="prop">damping</span>: <span class="num">30</span> }}
  whileTap={{ <span class="prop">scale</span>: <span class="num">0.96</span> }}
  style={{ <span class="prop">borderRadius</span>: <span class="str">'100px'</span>, <span class="prop">background</span>: <span class="str">'#000'</span> }}
/&gt;

<span class="cm">// Content waits out the morph before it appears</span>
initial={{ <span class="prop">opacity</span>: <span class="num">0</span>, <span class="prop">filter</span>: <span class="str">'blur(5px)'</span>, <span class="prop">scale</span>: <span class="num">0.9</span> }}
animate={{ <span class="prop">opacity</span>: <span class="num">1</span>, <span class="prop">transition</span>: { <span class="prop">delay</span>: <span class="num">0.12</span> } }}`,

  dock: `<span class="cm">// Every icon sits on a Gaussian field</span>
<span class="kw">const</span> <span class="fn">getScale</span> = (idx) => {
  <span class="kw">const</span> dist = Math.<span class="fn">abs</span>(mouseX - <span class="fn">iconCenter</span>(idx))
  <span class="kw">return</span> <span class="num">1</span> + (MAX - <span class="num">1</span>) *
    Math.<span class="fn">exp</span>(-(dist * dist) / (sigma * sigma))
}

<span class="cm">// Scale from the bottom, lift to stay on the shelf</span>
transform: \`translateY(\${-(s-<span class="num">1</span>)*BASE*<span class="num">0.5</span>}px) scale(\${s})\`

<span class="cm">/* The launch bounce is its own spring */</span>
@keyframes dock-bounce {
  <span class="num">0%</span>  { transform: translateY(<span class="num">0</span>) }
  <span class="num">30%</span> { transform: translateY(<span class="num">-26px</span>) }
  <span class="num">55%</span> { transform: translateY(<span class="num">0</span>) }
  <span class="num">75%</span> { transform: translateY(<span class="num">-9px</span>) }
}`,

  "spring-config": `<span class="cm">// Integrate the spring, sixty times a second</span>
<span class="kw">const</span> <span class="fn">tick</span> = () => {
  vx += ((-k * px - c * vx) / m) * dt
  vy += ((-k * py - c * vy) / m) * dt
  px += vx * dt
  py += vy * dt
  <span class="fn">requestAnimationFrame</span>(tick)
}

<span class="cm">// Your drag velocity becomes the throw</span>
<span class="fn">release</span>(x, y, dragVx * <span class="num">0.4</span>, dragVy * <span class="num">0.4</span>)

<span class="cm">// Critical damping: c = 2 * sqrt(k * m)</span>
<span class="cm">// Below it things bounce. Above it things drag.</span>`,

  oklch: `<span class="cm">/* sRGB: the midpoint goes grey */</span>
background: linear-gradient(90deg,
  hsl(<span class="num">275</span>,<span class="num">70%</span>,<span class="num">55%</span>),
  hsl(<span class="num">150</span>,<span class="num">70%</span>,<span class="num">55%</span>));

<span class="cm">/* OKLCH: lightness holds steady the whole way */</span>
background: linear-gradient(<span class="kw">in</span> oklch 90deg,
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">275</span>),
  oklch(<span class="num">0.65</span> <span class="num">0.18</span> <span class="num">150</span>));

<span class="cm">/* Shipped in every modern browser since 2023 */</span>`,
};

const DEMOS: Record<NoteDemoId, React.FC> = {
  island: IslandDemo,
  dock: DockDemo,
  "spring-config": SpringDemo,
  oklch: OklchDemo,
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
