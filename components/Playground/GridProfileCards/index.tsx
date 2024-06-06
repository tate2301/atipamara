"use client";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const getDefaultTransformForIndex = (index: number) => {
  if (index === 0) return "";
  if (index === 1) return "scale(0.98) rotate(24deg)";
  if (index === 2) return "scale(0.95) rotate(40deg)";
  if (index === 3) return "scale(0.95)";
};

export default function GridProfileCards() {
  const [hovered, setHovered] = useState(false);
  const [scope, animate] = useAnimate();

  const toggleHover = () => setHovered(!hovered);

  useEffect(() => {
    if (hovered) {
      animate(
        "#option-1",
        {
          scale: 1,
          transform: "translateX(-32px) translateY(-16px) rotate(-16deg)",
        },
        {
          type: "spring",
          mass: 1,
          velocity: 4,
          damping: 10,
          stiffness: 150,
        },
      );
      animate(
        "#option-2",
        {
          scale: 1,
          transform: "translateX(32px) rotate(16deg) translateY(-16px) ",
        },
        {
          type: "spring",
          mass: 1,
          velocity: 4,
          damping: 10,
          stiffness: 150,
        },
      );
      animate(
        "#option-3",
        {
          transform: "scale(1) translateY(-40px)",
        },
        {
          type: "spring",
          mass: 1,
          velocity: 4,
          damping: 10,
          stiffness: 150,
        },
      );
    } else {
      animate("#option-1", {
        transform: "scale(0.9) translateX(0px) rotate(24deg)",
      });
      animate("#option-2", {
        transform: "scale(0.9) rotate(40deg) rotate(0deg)",
      });
      animate("#option-3", {
        transform: "scale(0.9) translateY(0)",
      });
    }
  }, [animate, hovered]);

  return (
    <motion.div className="flex flex-col items-center">
      <motion.div
        ref={scope}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        className="mb-8 w-24 h-24 overflow-visible relative"
      >
        {[
          "/assets/photos/z.JPG",
          "/assets/photos/IMG_0389.jpg",
          "/assets/photos/IMG_5392.JPEG",
          "/assets/photos/IMG_8471.JPEG",
        ]
          .slice(0, 4)
          .map((item, i) => (
            <motion.div
              key={`profile-card-${i}`}
              id={`option-${i}`}
              style={{
                zIndex: 5 - i,
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 4px 12px -3px",
                transform: getDefaultTransformForIndex(i),
              }}
              className="w-24 h-24 rounded-3xl absolute border border-white/10 shadow-sm overflow-hidden bg-zinc-900/5"
            >
              <Image
                src={item}
                alt="Profile image"
                height={96}
                width={96}
                className="object-cover object-center"
              />
            </motion.div>
          ))}
      </motion.div>
      <p className="font-semibold text-lg text-zinc-900">Strikeforce</p>
      <p>5 members</p>
    </motion.div>
  );
}
