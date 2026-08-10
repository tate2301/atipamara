"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  GithubLogo,
  XLogo,
  Briefcase,
  Envelope,
  Cube,
  FlagBanner,
  Desktop,
  HardHat,
  Trophy,
  Broadcast,
  Dog,
  CursorClick,
  PenNib,
} from "@phosphor-icons/react";

const CHIP_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogo weight="fill" size={12} />,
  x: <XLogo weight="bold" size={12} />,
  upwork: <Briefcase weight="fill" size={12} />,
  email: <Envelope weight="fill" size={12} />,
  corelith: <Cube weight="fill" size={12} />,
};

const STICKER_ICONS: Record<string, React.ReactNode> = {
  zimbabwe: <FlagBanner weight="duotone" size={38} />,
  computer: <Desktop weight="duotone" size={38} />,
  trophy: <Trophy weight="duotone" size={38} />,
  mine: <HardHat weight="duotone" size={38} />,
  tower: <Broadcast weight="duotone" size={38} />,
  pup: <Dog weight="duotone" size={38} />,
};

export function Chip({
  href,
  logo,
  icon,
  children,
}: {
  href: string;
  logo?: string;
  icon?: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      className="chip"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="chip-logo">
        {logo ? (
          <Image src={logo} alt="" width={13} height={13} unoptimized />
        ) : (
          CHIP_ICONS[icon ?? "github"]
        )}
      </span>
      <span>{children}</span>
    </a>
  );
}

export function KindIcon({ kind }: { kind: "interactive" | "written" }) {
  return (
    <span className="kind-icon" aria-hidden="true">
      {kind === "interactive" ? (
        <CursorClick size={12} weight="bold" />
      ) : (
        <PenNib size={12} weight="bold" />
      )}
    </span>
  );
}

export function Reveal({
  kind,
  sticker,
  caption,
  children,
}: {
  kind: string;
  sticker?: string;
  caption?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  return (
    <span
      className="reveal"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="reveal-word"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            className="reveal-pop"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.5, y: 10, rotate: -12 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0, rotate: -5 }
            }
            exit={{ opacity: 0, scale: 0.7, y: 6, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            {sticker ? (
              <Image
                src={sticker}
                alt=""
                width={132}
                height={132}
                className="reveal-img"
                style={{ width: 132, height: "auto" }}
                unoptimized
              />
            ) : (
              <span className="reveal-icon">{STICKER_ICONS[kind]}</span>
            )}
            {caption && <span className="reveal-caption">{caption}</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function Aside({
  note,
  children,
}: {
  note: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <>
      <button
        type="button"
        className="reveal-word"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {children}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            className="aside-note"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { height: "auto", opacity: 1 }
            }
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <span className="aside-note-inner">{note}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}
