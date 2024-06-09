import { FramerMotionVariants } from "@/types/motion";

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

export {
  dotsContainerVariants,
  dotsVariants,
  circleVariants,
  containerVariants,
};
