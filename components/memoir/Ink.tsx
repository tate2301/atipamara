"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  GithubLogo,
  XLogo,
  Briefcase,
  Envelope,
  Cube,
  CursorClick,
  PenNib,
} from "@phosphor-icons/react";

const LINK_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogo weight="fill" size={13} />,
  x: <XLogo weight="bold" size={13} />,
  upwork: <Briefcase weight="fill" size={13} />,
  email: <Envelope weight="fill" size={13} />,
  corelith: <Cube weight="fill" size={13} />,
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
      className="ink-link"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="ink-logo">
        {logo ? (
          <Image src={logo} alt="" width={14} height={14} unoptimized />
        ) : (
          LINK_ICONS[icon ?? "github"]
        )}
      </span>
      <span className="ink-word">{children}</span>
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

export function Sticker({
  src,
  side,
  top,
  size = 116,
  rotate = -6,
  caption,
}: {
  src?: string;
  side: "left" | "right";
  top: string;
  size?: number;
  rotate?: number;
  caption?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (!src) return null;
  return (
    <motion.span
      className={`sticker sticker-${side}`}
      style={{ top, "--ss": `${size}px` } as React.CSSProperties}
      aria-hidden="true"
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 0.3,
              y: 26,
              rotate: rotate + (side === "left" ? -16 : 16),
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, scale: 1, y: 0, rotate }
      }
      viewport={{ once: true, margin: "-90px 0px" }}
      whileHover={reduceMotion ? undefined : { scale: 1.09, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 19 }}
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        style={{ width: "100%", height: "auto" }}
        className="sticker-img"
        unoptimized
      />
      {caption && <span className="sticker-caption">{caption}</span>}
    </motion.span>
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
        className="aside-trigger"
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
              reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
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
