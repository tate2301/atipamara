"use client";
import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Modal from "../Modal";
import DynamicIsland from "../ui/DynamicIsland";

type BottomBarProps = {
  icon: ReactNode;
  text: string;
  children: React.ReactNode;
  className?: string;
  backgroundColor: string;
  accentColor?: string;
  color?: string;
};

const buttonVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: [0, 1],
    opacity: [0, 1],
    transform: ["rotate(0deg)", "rotate(`180deg)", "rotate(360deg)"],
    transition: {
      delay: 0.5,
      duration: 0.5,
      times: [0, 0.5, 1],
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: [0, 0, 0, 1],
    width: [0, "auto", "auto"],
    marginRight: [0, 12, 12],
    marginLeft: [0, 16, 16],
    transition: {
      duration: 2,
      delay: 1.5,
      times: [0, 0.2, 0.75, 1],
      type: "spring",
    },
  },
};

export default function ButtonWithDisclosure(props: BottomBarProps) {
  const paragraphRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate();
  const [width, setWidth] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    // observe change in size of paragraph
    const resizeObserver = new ResizeObserver(() => {
      const width = paragraphRef.current?.offsetWidth;
      if (width === 0) return;
      setWidth(width! + 16 + 12 + 54 ?? 0);
    });

    resizeObserver.observe(paragraphRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [width]);

  return (
    <div className="flex items-center justify-center w-fit">
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={onClose}>
            {props.children}
          </Modal>
        )}
      </AnimatePresence>
      <DynamicIsland
        backgroundColor={props.backgroundColor}
        accentColor={props.accentColor}
        onClick={onOpen}
        width={width}
      >
        <motion.p
          variants={textVariants}
          ref={paragraphRef}
          style={{ color: props.color }}
          className="font-semibold flex-shrink-0 w-auto"
        >
          {props.text}
        </motion.p>
        <motion.button
          layout="position"
          variants={buttonVariants}
          style={{
            color: props.backgroundColor ?? "#202020",
            backgroundColor: props.accentColor ?? "#fff",
          }}
          className="rounded-full p-2 bg-white absolute right-[4px] h-[40px] aspect-square flex"
        >
          {props.icon}
        </motion.button>
      </DynamicIsland>
    </div>
  );
}
