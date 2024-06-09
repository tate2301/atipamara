import * as Tooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { dotsContainerVariants, dotsVariants } from "./variants";
import { Item } from "./types";

const FloatingNavbarDots = (props: {
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
                  className="w-4 h-4 aspect-square flex-shrink-0 bg-zinc-900/20 mix-blend-hard-light group cursor-pointer rounded-full hover:ring-2 hover:ring-[#0588F0] ring-offset-2"
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

export default FloatingNavbarDots;
