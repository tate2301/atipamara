import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header>
      <ThemeToggle />
      <div className="wordmark">
        <h1>Tatenda Chinyamakobvu</h1>
        <span className="wordmark-dot" aria-hidden="true" />
      </div>
      <p className="tagline">Design Engineer — Harare, Zimbabwe</p>
      <div className="bio">
        <p>
          I build interfaces for founders and early-stage products — from concept to shipped, at the
          intersection of design and code. Currently at the{" "}
          <a href="https://buildwithtif.xyz" target="_blank" rel="noopener noreferrer">
            CUT Innovation Hub
          </a>{" "}
          mentoring student-led startups.
        </p>
        <p>
          Six years in, I&apos;ve ranged across frontend engineering, full-stack, product design, and
          once placed{" "}
          <a
            href="https://zindi.africa/competitions/umojahack-africa-2021-2-sendy-challenge-intermediate/leaderboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            9th out of 150 teams
          </a>{" "}
          in a continental data science hackathon.
        </p>
      </div>
      <div className="stat-strip">
        <div className="stat">
          <span className="stat-val">6+</span>
          <span className="stat-lbl">yrs experience</span>
        </div>
        <div className="stat">
          <span className="stat-val">20+</span>
          <span className="stat-lbl">projects shipped</span>
        </div>
        <div className="stat">
          <span className="stat-val">3</span>
          <span className="stat-lbl">countries</span>
        </div>
        <div className="stat">
          <span className="stat-val">$37k</span>
          <span className="stat-lbl">prize won</span>
        </div>
      </div>
      <nav className="nav-links">
        <a href="https://github.com/tate2301" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="nav-sep" aria-hidden="true">/</span>
        <a href="https://twitter.com/atipamara" target="_blank" rel="noopener noreferrer">X</a>
        <span className="nav-sep" aria-hidden="true">/</span>
        <a href="mailto:tatenda@atipamara.xyz">Email</a>
      </nav>
    </header>
  );
}
