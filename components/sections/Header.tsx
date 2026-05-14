export default function Header() {
  return (
    <header>
      <div className="wordmark">
        <h1>Tatenda Chinyamakobvu</h1>
      </div>
      <p className="tagline">
        Product engineer. I care about the <em>parts most engineers skip</em>.
      </p>
      <div className="bio">
        <p>
          I build full-stack products that companies run their businesses on.
          Three companies currently run software I built <em>from scratch</em>,
          through{" "}
          <a
            href="https://corelith.pagka.dev"
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
          <span className="stat-val">7+</span>
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
      <div className="contact-row">
        <a className="contact-email" href="mailto:hi@chris.pagka.dev">
          hi@chris.pagka.dev
        </a>
        <span className="status-pill" title="Available for work">
          <span className="status-pill-dot" aria-hidden="true" />
          Available for work
        </span>
      </div>
    </header>
  );
}
