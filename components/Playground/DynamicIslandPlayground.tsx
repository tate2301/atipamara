"use client";
import { useEffect, useState } from "react";
import PlaygroundPreview from "../ui/Playground";
import { Variant, motion } from "framer-motion";
import {
  BriefcaseIcon,
  DocumentIcon,
  GlobeAltIcon,
  HomeIcon,
  SparklesIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import { FramerMotionVariants } from "@/types/motion";

const dotsContainerVariants = {
  hidden: {
    opacity: 0,
    background: "#f0f0f0",
    width: 280 - 54 - 24,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      delayChildren: 2,
    },
  },
};

const dotsVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      weight: 2,
      damping: 100,
    },
  },
  hover: {
    scale: 1.6,
    transition: {
      type: "spring",
      stiffness: 200,
      weight: 0.5,
    },
  },
  active: {
    scale: 1,
    width: 12 * 3,
    transition: {
      type: "ease",
      ease: "easeOut",
    },
  },
  activeHovered: {
    height: 12 * 3,
    width: 12 * 3,
  },
};

const circleVariants = {
  hidden: {
    opacity: 0,
    background: "#f0f0f0",
  },
  visible: {
    opacity: 1,
    background: "#f0f0f0",
    transition: {
      delay: 0.5,
      duration: 0.1,
    },
  },
};

const containerVariants: FramerMotionVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    background: "#f0f0f0",
  },
  visible: {
    background: ["#f0f0f0", "#f0f0f0", "#ffffff00", "#ffffff00", "#ffffff00"],
    scale: [1, 1.5, 1, 1, 1],
    opacity: [1, 1],
    height: [54],
    width: [54, 54, 280, 280, 280],
    transition: {
      duration: 2,
      times: [0, 0.15, 0.3, 0.55, 0.75, 1],
      type: "tween",
      ease: "easeOut",
    },
  },
};

const Dots = (props: {
  active: number;
  setActive: (index: number) => void;
}) => {
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActivate(true);
    }, 1000);
  }, []);

  return (
    <motion.div
      variants={dotsContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex h-full items-center justify-between px-4 rounded-full"
    >
      {new Array(activate ? 5 : 0).fill(0).map((_, i) => (
        <motion.div
          variants={dotsVariants}
          whileHover={props.active === i ? "activeHovered" : "hover"}
          animate={props.active === i ? "active" : "visible"}
          key={i}
          onClick={() => props.setActive(i)}
          className="w-3 h-3 aspect-square flex-shrink-0 bg-zinc-900/20 cursor-pointer rounded-full hover:ring-2 hover:ring-[#0588F0] ring-offset-2"
        />
      ))}
    </motion.div>
  );
};

export default function DynamicIslandPlayground() {
  const [active, setActive] = useState(2);

  const icons = [
    <HomeIcon className="w-6 h-6" />,
    <SparklesIcon className="w-6 h-6" />,
    <DocumentIcon className="w-6 h-6" />,
    <BriefcaseIcon className="w-6 h-6" />,
    <GlobeAltIcon className="w-6 h-6" />,
  ];

  useEffect(() => {
    // navigate with arrows
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (active === 4) return setActive(0);
        setActive((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        if (active === 0) return setActive(4);
        setActive((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <PlaygroundPreview
      title="Dynamic Island Bottom Navigation"
      description="Inspired by the Apple Dynamic Island"
    >
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex relative rounded-full justify-center items-center gap-4"
      >
        <motion.div
          layout
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="w-[54px] h-[54px] text-[#0588F0] rounded-full z-0 flex items-center justify-center flex-shrink-0"
        >
          {icons[active]}
        </motion.div>
        <Dots active={active} setActive={setActive} />
      </motion.div>
    </PlaygroundPreview>
  );
}
