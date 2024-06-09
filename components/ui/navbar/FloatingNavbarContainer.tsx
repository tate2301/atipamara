import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { circleVariants, containerVariants } from "./variants";
import { useEffect } from "react";
import { Item } from "./types";
import FloatingNavbarDots from "./FloatingNavbarDots";

function FloatingNavbarDotContainer(props: {
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
        {props.items[props.active]?.icon}
      </motion.div>
      <FloatingNavbarDots
        items={props.items}
        active={props.active}
        setActive={props.onClick}
        className={props.className}
      />
    </motion.div>
  );
}

export default FloatingNavbarDotContainer;
