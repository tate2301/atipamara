"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import PlaygroundPreview from "../ui/Playground";
import { motion } from "framer-motion";
import { FramerMotionVariants } from "@/types/motion";
import {
  BriefcaseIcon,
  DocumentIcon,
  GlobeAltIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

type Item = {
  icon: React.ReactNode;
  text: string;
};

const dotsContainerVariants = {
  hidden: {
    opacity: 0,
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
    opacity: 1,
    height: 12 * 3,
    transition: {
      type: "spring",
      ease: "easeOut",
      stiffness: 200,
      weight: 0.5,
      damping: 20,
    },
  },
};

const circleVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
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
  items: Item[];
  className?: string;
}) => {
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActivate(true);
    }, 1000);
  }, []);

  // because the hovered button maybe be too small, lets have it bigger

  return (
    <Tooltip.Provider>
      <motion.div
        variants={dotsContainerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex h-full items-center justify-between px-4 rounded-full shadow-xl",
          props.className,
        )}
      >
        {activate &&
          props.items.map((_, i) => (
            <Tooltip.Root key={i}>
              <Tooltip.Trigger asChild>
                <motion.div
                  variants={dotsVariants}
                  whileHover={props.active === i ? "activeHovered" : "hover"}
                  animate={props.active === i ? "active" : "visible"}
                  key={i}
                  onClick={() => props.setActive(i)}
                  className="w-4 h-4 aspect-square flex-shrink-0 bg-zinc-900/20 group cursor-pointer rounded-full hover:ring-2 hover:ring-[#0588F0] ring-offset-2"
                ></motion.div>
              </Tooltip.Trigger>
              <Tooltip.Content
                sideOffset={5}
                className="px-3 h-[32px] flex items-center justify-center backdrop-blur flex-shrink-0 text-white bg-zinc-950/90 group cursor-pointer rounded-lg hover:ring-2 hover:ring-[#0588F0] ring-offset-2"
              >
                {props.items[i].text}
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
      </motion.div>
    </Tooltip.Provider>
  );
};

export function DynamicIsland(props: {
  items: Item[];
  active: number;
  onClick: (index: number) => void;
  className?: string;
}) {
  useEffect(() => {
    // navigate with arrows
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (props.active === props.items.length) return props.onClick(0);
        props.onClick(props.active + 1);
      } else if (e.key === "ArrowLeft") {
        if (props.active === 0) return props.onClick(props.items.length);
        props.onClick(props.active - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.active]);

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex relative rounded-full justify-center items-center gap-4",
      )}
    >
      <motion.div
        layout
        variants={circleVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "w-[54px] h-[54px] text-[#0588F0] rounded-full z-0 flex items-center justify-center flex-shrink-0 bg-[#eee] shadow-xl",
          props.className,
        )}
      >
        {props.items[props.active].icon}
      </motion.div>
      <Dots
        items={props.items}
        active={props.active}
        setActive={props.onClick}
        className={props.className}
      />
    </motion.div>
  );
}

const icons = [
  {
    icon: <HomeIcon className="w-6 h-6" />,
    text: "Home",
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    text: "Sparkles",
  },
  {
    icon: <DocumentIcon className="w-6 h-6" />,
    text: "Document",
  },
  {
    icon: <BriefcaseIcon className="w-6 h-6" />,
    text: "Briefcase",
  },
  {
    icon: <GlobeAltIcon className="w-6 h-6" />,
    text: "Globe",
  },
];

export default function DynamicIslandPlayground() {
  const [active, setActive] = useState(2);

  const onSetActive = (index: number) => {
    setActive(index);
  };
  return (
    <PlaygroundPreview
      title="Dynamic Island Bottom Navigation"
      description="Inspired by the Apple Dynamic Island"
    >
      <DynamicIsland
        items={icons}
        active={active}
        onClick={onSetActive}
        className="bg-white border border-zinc-400/10"
      />
    </PlaygroundPreview>
  );
}
