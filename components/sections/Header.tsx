"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

function useZwTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        timeZone: "Africa/Harare",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Header() {
  const time = useZwTime();

  return (
    <header>
      <ThemeToggle />
      <h1 className="h-name">Tatenda Chinyamakobvu</h1>
      <div className="h-meta">
        <span>Full-stack engineer</span>
        <span className="h-meta-sep">·</span>
        <span>Corelith</span>
        {time && (
          <>
            <span className="h-meta-sep">·</span>
            <span className="h-time">ZW {time}</span>
          </>
        )}
      </div>
      <div className="h-avail">
        <span className="h-avail-dot" />
        <span className="h-avail-text">available for work</span>
      </div>
      <div className="bio">
        <p>
          I build full-stack products that companies run their businesses on.
          Three companies currently run software I built from scratch, through{" "}
          <a href="https://corelith.com" target="_blank" rel="noopener noreferrer">
            Corelith
          </a>
          .
        </p>
        <p>
          I grew up in Zimbabwe writing code for fun. Fifteen years later I&apos;m
          still doing the same thing — just now people pay me for it, and the
          stakes are a bit higher.
        </p>
      </div>
      <nav className="nav-links">
        <a href="mailto:hi@chris.pagka.dev">hi@chris.pagka.dev</a>
        <span className="nav-sep" aria-hidden="true">/</span>
        <a href="https://github.com/tate2301" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="nav-sep" aria-hidden="true">/</span>
        <a href="https://twitter.com/atipamara" target="_blank" rel="noopener noreferrer">
          X
        </a>
      </nav>
    </header>
  );
}
