"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROTATIONS = [-5.5, 4, -2.5, 6.5, -4, 2, -6.5, 5, -1.5, 3.5, -3, 1.5];

export default function PhotoPile({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setActive((current) => {
        if (current) return null;
        setOpen(false);
        return current;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const springFor = (i: number) =>
    reduceMotion
      ? { duration: 0 }
      : {
          type: "spring" as const,
          stiffness: 210,
          damping: 26,
          delay: open ? i * 0.045 : (photos.length - 1 - i) * 0.03,
        };

  return (
    <div className="pile-wrap">
      <motion.div
        layout
        className={open ? "pile pile-open" : "pile"}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 30 }}
      >
        {photos.map((src, i) => (
          <motion.div
            key={src}
            layout
            className="pile-item"
            style={{ zIndex: i + 1 }}
            initial={false}
            animate={{
              rotate: open ? 0 : ROTATIONS[i % ROTATIONS.length],
              x: open ? 0 : ((i * 17) % 13) - 6,
              y: open ? 0 : ((i * 23) % 11) - 5,
            }}
            transition={springFor(i)}
            role="button"
            tabIndex={0}
            aria-label={open ? "View photograph" : "Open the photograph pile"}
            onClick={() => (open ? setActive(src) : setOpen(true))}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open ? setActive(src) : setOpen(true);
              }
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 560px) 50vw, 220px"
              className="pile-img"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active}
              alt=""
              className="lightbox-img"
              initial={{ scale: reduceMotion ? 1 : 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduceMotion ? 1 : 0.97, opacity: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 260, damping: 28 }
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
