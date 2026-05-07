import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header>
      <ThemeToggle />
      <div className="wordmark">
        <h1>Tatenda Chinyamakobvu</h1>
        <span
          className="wordmark-dot"
          aria-label="Available for work"
          title="Available for work"
        />
      </div>
      <p className="tagline">
        Full-stack engineer. I care about the <em>parts most engineers skip</em>
        .
      </p>
      <div className="bio">
        <p>
          I build full-stack products that companies run their businesses on.
          Three companies currently run software I built <em>from scratch</em>,
          through{" "}
          <a
            href="https://corelith.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Corelith
          </a>
          .
        </p>
        <p>
          I grew up in Zimbabwe writing code for fun. Fifteen years later
          I&apos;m still doing the same thing — just now people pay me for it,
          and the stakes are a bit higher.
        </p>
      </div>
      <div className="stat-strip">
        <div className="stat">
          <span className="stat-val">3</span>
          <span className="stat-lbl">companies in production</span>
        </div>
        <div className="stat">
          <span className="stat-val">6+</span>
          <span className="stat-lbl">years building</span>
        </div>
        <div className="stat">
          <span className="stat-val">10★</span>
          <span className="stat-lbl">open source</span>
        </div>
        <div className="stat">
          <span className="stat-val">ZW</span>
          <span className="stat-lbl">based in Zimbabwe</span>
        </div>
      </div>
      <nav className="nav-links">
        <a href="mailto:hi@chris.pagka.dev">hi@chris.pagka.dev</a>
        <span className="nav-sep" aria-hidden="true">
          /
        </span>
        <a href="/experiments">Experiments</a>
        <span className="nav-sep" aria-hidden="true">
          /
        </span>
        <a
          href="https://github.com/tate2301"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <span className="nav-sep" aria-hidden="true">
          /
        </span>
        <a
          href="https://twitter.com/atipamara"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </nav>
    </header>
  );
}
