"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Types ─────────────────────────────────────────── */
type ExpId = "cmd" | "mag" | "cnt" | "stk" | "abb";
type View = "demo" | "code";

const experiments: { id: ExpId; name: string; meta: string }[] = [
  { id: "cmd", name: "Command Menu", meta: "⌘K palette" },
  { id: "mag", name: "Magnetic Button", meta: "pointer tracking" },
  { id: "cnt", name: "Animated Counter", meta: "scroll-triggered" },
  { id: "stk", name: "Image Stack", meta: "CSS transforms" },
  { id: "abb", name: "Apple Bottom Bar", meta: "blur glass" },
];

/* ── Demo: Command Menu ─────────────────────────────── */
type CmdItem = { label: string; hint: string; group: string };
const CMD_ITEMS: CmdItem[] = [
  { label: "Go to home", hint: "navigate", group: "Navigation" },
  { label: "Open GitHub", hint: "↗", group: "Links" },
  { label: "Open X / Twitter", hint: "↗", group: "Links" },
  { label: "Magnetic Button", hint: "experiment", group: "Experiments" },
  { label: "Animated Counter", hint: "experiment", group: "Experiments" },
  { label: "Switch to dark mode", hint: "theme", group: "Settings" },
];

function fuzzyMatch(str: string, q: string) {
  if (!q) return true;
  let si = 0;
  for (const ch of q.toLowerCase()) {
    const i = str.toLowerCase().indexOf(ch, si);
    if (i === -1) return false;
    si = i + 1;
  }
  return true;
}

function CmdDemo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CMD_ITEMS.filter((c) => fuzzyMatch(c.label, query));

  useEffect(() => { setSel(0); }, [query]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); }, [open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Escape") setOpen(false);
  };

  // Group items
  const groups: Record<string, CmdItem[]> = {};
  for (const item of filtered) {
    (groups[item.group] = groups[item.group] ?? []).push(item);
  }
  let globalIdx = -1;

  return (
    <div className="exp-demo">
      <span className="exp-demo-label">command palette</span>
      <button className="d-cmd-trigger" onClick={() => setOpen(true)}>
        <span>Search or run a command…</span>
        <kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="mini-palette open">
          <button className="mini-close" onClick={() => setOpen(false)}>✕</button>
          <div className="mini-input-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              className="mini-input"
              placeholder="Type to filter…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>
          <div className="mini-results">
            {filtered.length === 0 ? (
              <div style={{ padding: "20px", textAlign: "center", fontSize: "13px", color: "var(--fg-subtle)" }}>No results</div>
            ) : (
              Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="mini-group">{group}</div>
                  {items.map((item) => {
                    globalIdx++;
                    const idx = globalIdx;
                    return (
                      <div
                        key={item.label}
                        className={`mini-item${sel === idx ? " sel" : ""}`}
                        onMouseEnter={() => setSel(idx)}
                        onClick={() => setOpen(false)}
                      >
                        <span>{item.label}</span>
                        <span className="mini-item-hint">{item.hint}</span>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Demo: Magnetic Button ──────────────────────────── */
function MagDemo() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: dx * 0.35, y: dy * 0.35 });
  };

  const handleLeave = () => { setPos({ x: 0, y: 0 }); setHovering(false); };

  return (
    <div className="exp-demo" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <span className="exp-demo-label">magnetic button</span>
      <button
        ref={btnRef}
        className="d-mag-btn"
        onMouseEnter={() => setHovering(true)}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: hovering
            ? "transform 80ms linear"
            : "transform 400ms cubic-bezier(.23,1,.32,1)",
        }}
      >
        Pull me
      </button>
    </div>
  );
}

/* ── Demo: Animated Counter ─────────────────────────── */
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

function CntDemo() {
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRunning(true); },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const replay = useCallback(() => { setRunning(false); setTimeout(() => setRunning(true), 50); }, []);

  const a = useCounter(6, 1200, running);
  const b = useCounter(20, 1800, running);
  const c = useCounter(150, 2200, running);

  return (
    <div ref={ref} className="exp-demo" style={{ flexDirection: "column", gap: "24px" }}>
      <span className="exp-demo-label">animated counter</span>
      <div className="d-counters">
        <div className="d-counter">
          <div className="d-counter-val">{a}+</div>
          <div className="d-counter-lbl">yrs exp</div>
        </div>
        <div className="d-counter">
          <div className="d-counter-val">{b}+</div>
          <div className="d-counter-lbl">shipped</div>
        </div>
        <div className="d-counter">
          <div className="d-counter-val">{c}k</div>
          <div className="d-counter-lbl">lines written</div>
        </div>
      </div>
      <button className="d-counter-replay" onClick={replay}>↺ replay</button>
    </div>
  );
}

/* ── Demo: Image Stack ──────────────────────────────── */
function StkDemo() {
  const [spread, setSpread] = useState(false);
  const avatars = ["🧑‍💻", "👩‍🎨", "🧑‍🔬", "👨‍💼"];
  return (
    <div className="exp-demo" style={{ flexDirection: "column", gap: "16px" }}>
      <span className="exp-demo-label">image stack</span>
      <div
        className={`d-stack${spread ? " spread" : ""}`}
        onClick={() => setSpread((v) => !v)}
        title={spread ? "Click to collapse" : "Click to spread"}
      >
        {avatars.map((a, i) => (
          <div key={i} className="d-stack-img">{a}</div>
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "var(--fg-subtle)", marginTop: "16px" }}>
        click to {spread ? "collapse" : "spread"}
      </p>
    </div>
  );
}

/* ── Demo: Apple Bottom Bar ─────────────────────────── */
function AbbDemo() {
  return (
    <div className="exp-demo">
      <span className="exp-demo-label">apple bottom bar</span>
      <div className="d-abb">
        <span className="d-abb-text">Learn more</span>
        <div className="d-abb-icon">⚡</div>
      </div>
    </div>
  );
}

/* ── Code snippets ──────────────────────────────────── */
const CODE: Record<ExpId, string> = {
  cmd: `<span class="cm">// ⌘K palette — fuzzy filter + keyboard nav</span>
<span class="kw">function</span> <span class="fn">fuzzyMatch</span>(<span class="prop">str</span>: <span class="kw">string</span>, <span class="prop">query</span>: <span class="kw">string</span>) {
  <span class="kw">let</span> si = <span class="num">0</span>
  <span class="kw">for</span> (<span class="kw">const</span> ch <span class="kw">of</span> query.<span class="fn">toLowerCase</span>()) {
    <span class="kw">const</span> i = str.<span class="fn">toLowerCase</span>().<span class="fn">indexOf</span>(ch, si)
    <span class="kw">if</span> (i === -<span class="num">1</span>) <span class="kw">return</span> <span class="kw">false</span>
    si = i + <span class="num">1</span>
  }
  <span class="kw">return</span> <span class="kw">true</span>
}

<span class="fn">useEffect</span>(() => {
  <span class="kw">const</span> handler = (<span class="prop">e</span>: KeyboardEvent) => {
    <span class="kw">if</span> ((e.metaKey || e.ctrlKey) && e.key === <span class="str">'k'</span>) {
      e.<span class="fn">preventDefault</span>()
      <span class="fn">setOpen</span>(<span class="kw">true</span>)
    }
  }
  window.<span class="fn">addEventListener</span>(<span class="str">'keydown'</span>, handler)
  <span class="kw">return</span> () => window.<span class="fn">removeEventListener</span>(<span class="str">'keydown'</span>, handler)
}, [])`,

  mag: `<span class="cm">// Cursor tracks button center — CSS springs back</span>
<span class="kw">const</span> <span class="fn">handleMove</span> = (<span class="prop">e</span>: MouseEvent) => {
  <span class="kw">const</span> rect = ref.current!.<span class="fn">getBoundingClientRect</span>()
  <span class="kw">const</span> dx = e.clientX - (rect.left + rect.width / <span class="num">2</span>)
  <span class="kw">const</span> dy = e.clientY - (rect.top + rect.height / <span class="num">2</span>)
  <span class="fn">setPos</span>({ x: dx * <span class="num">0.35</span>, y: dy * <span class="num">0.35</span> })
}

<span class="cm">// Inline style drives the translation</span>
style={{ transform: \`translate(\${pos.x}px, \${pos.y}px)\`,
  transition: hovering
    ? <span class="str">'transform 80ms linear'</span>
    : <span class="str">'transform 400ms cubic-bezier(.23,1,.32,1)'</span> }}`,

  cnt: `<span class="cm">// easeOutCubic counter via requestAnimationFrame</span>
<span class="kw">function</span> <span class="fn">useCounter</span>(<span class="prop">target</span>: <span class="kw">number</span>, <span class="prop">duration</span>: <span class="kw">number</span>) {
  <span class="kw">const</span> [val, setVal] = <span class="fn">useState</span>(<span class="num">0</span>)
  <span class="fn">useEffect</span>(() => {
    <span class="kw">const</span> t0 = performance.<span class="fn">now</span>()
    <span class="kw">const</span> <span class="fn">animate</span> = (<span class="prop">now</span>: <span class="kw">number</span>) => {
      <span class="kw">const</span> p = Math.<span class="fn">min</span>((now - t0) / duration, <span class="num">1</span>)
      <span class="fn">setVal</span>(Math.<span class="fn">round</span>((<span class="num">1</span> - (<span class="num">1</span> - p) ** <span class="num">3</span>) * target))
      <span class="kw">if</span> (p < <span class="num">1</span>) <span class="fn">requestAnimationFrame</span>(animate)
    }
    <span class="fn">requestAnimationFrame</span>(animate)
  }, [target, duration])
  <span class="kw">return</span> val
}`,

  stk: `<span class="cm">/* CSS drives all transforms — JS just toggles .spread */</span>
.<span class="fn">d-stack-img</span> {
  <span class="prop">transition</span>: transform <span class="num">320ms</span> cubic-bezier(.<span class="num">34</span>,<span class="num">1.56</span>,.<span class="num">64</span>,<span class="num">1</span>);
}
.<span class="fn">d-stack</span>.<span class="fn">spread</span> :nth-child(<span class="num">1</span>) {
  <span class="prop">transform</span>: translateX(-<span class="num">24px</span>) rotate(-<span class="num">8deg</span>);
}
.<span class="fn">d-stack</span>.<span class="fn">spread</span> :nth-child(<span class="num">2</span>) {
  <span class="prop">transform</span>: translateX(-<span class="num">8px</span>) rotate(-<span class="num">3deg</span>);
}

<span class="cm">// React just toggles the class</span>
<span class="kw">const</span> [spread, setSpread] = <span class="fn">useState</span>(<span class="kw">false</span>)
&lt;div <span class="prop">className</span>={\`d-stack\${spread ? <span class="str">' spread'</span> : <span class="str">''</span>}\`}
     <span class="prop">onClick</span>={() => <span class="fn">setSpread</span>(v => !v)}&gt;`,

  abb: `<span class="cm">/* Glass morphism — blur + translucent bg */</span>
.<span class="fn">d-abb</span> {
  <span class="prop">background</span>: rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,.<span class="num">75</span>);
  <span class="prop">backdrop-filter</span>: blur(<span class="num">20px</span>);
  -webkit-backdrop-filter: blur(<span class="num">20px</span>);
  <span class="prop">border</span>: <span class="num">1px</span> solid rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,.<span class="num">5</span>);
  <span class="prop">border-radius</span>: <span class="num">100px</span>;
  <span class="prop">padding</span>: <span class="num">10px</span> <span class="num">20px</span>;
}

[data-theme=<span class="str">"dark"</span>] .<span class="fn">d-abb</span> {
  <span class="prop">background</span>: rgba(<span class="num">30</span>,<span class="num">30</span>,<span class="num">28</span>,.<span class="num">8</span>);
  <span class="prop">border-color</span>: rgba(<span class="num">255</span>,<span class="num">255</span>,<span class="num">255</span>,.<span class="num">08</span>);
}`,
};

const DEMOS: Record<ExpId, React.FC> = { cmd: CmdDemo, mag: MagDemo, cnt: CntDemo, stk: StkDemo, abb: AbbDemo };

/* ── Main Component ─────────────────────────────────── */
export default function Experiments() {
  const [active, setActive] = useState<ExpId>("cmd");
  const [view, setView] = useState<View>("demo");
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const switchTo = (id: ExpId) => {
    if (id === active) return;
    setFading(true);
    setTimeout(() => { setActive(id); setView("demo"); setFading(false); }, 140);
  };

  const DemoComponent = DEMOS[active];

  return (
    <section id="exp-section" ref={sectionRef}>
      {/* sticky bar */}
      <div className="exp-bar">
        <div className="exp-bar-left">
          <span className="exp-bar-title">Experiments</span>
          <span className="exp-bar-count">{experiments.length}</span>
        </div>
      </div>

      {/* mobile tabs */}
      <div className="exp-mobile-tabs">
        {experiments.map((exp) => (
          <button
            key={exp.id}
            className={`exp-mobile-tab${active === exp.id ? " active" : ""}`}
            onClick={() => switchTo(exp.id)}
          >
            {exp.name}
          </button>
        ))}
      </div>

      {/* split */}
      <div className="exp-split">
        {/* list */}
        <div className="exp-list-col">
          {experiments.map((exp, i) => (
            <div key={exp.id}>
              {i > 0 && <div className="exp-list-divider" />}
              <div
                className={`exp-list-item${active === exp.id ? " active" : ""}`}
                onClick={() => switchTo(exp.id)}
              >
                <div className="exp-list-inner">
                  <span className="exp-list-name">{exp.name}</span>
                  <span className="exp-list-meta">{exp.meta}</span>
                </div>
                <span className="exp-list-arrow">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* panel */}
        <div className="exp-panel-col">
          <div className="exp-toggle">
            <button
              className={`exp-toggle-btn${view === "demo" ? " active" : ""}`}
              onClick={() => setView("demo")}
            >
              Preview
            </button>
            <button
              className={`exp-toggle-btn${view === "code" ? " active" : ""}`}
              onClick={() => setView("code")}
            >
              Code
            </button>
          </div>

          <div className={`exp-card${fading ? " fade" : ""}`}>
            <div className={`exp-pane${view === "demo" ? " show" : ""}`}>
              <DemoComponent />
            </div>
            <div className={`exp-pane${view === "code" ? " show" : ""}`}>
              <div className="exp-code-pane">
                <div
                  className="exp-code-inner"
                  dangerouslySetInnerHTML={{ __html: CODE[active] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
