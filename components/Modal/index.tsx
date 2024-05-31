"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal(props: ModalProps) {
  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [props.isOpen]);

  useEffect(() => {
    // close on escape key press
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <motion.div
      initial={{
        bottom: "-100%",
        opacity: 0,
      }}
      animate={{
        bottom: 0,
        opacity: 1,
      }}
      className="fixed inset-0 bg-zinc-200/70 backdrop-blur-sm z-50 p-16"
    >
      <motion.div className="flex h-full w-full max-w-2xl mx-auto bg-white rounded-[32px] relative overflow-hidden">
        <button
          className="w-[40px] h-[40px] rounded-full bg-black/10 absolute top-4 right-4"
          onClick={props.onClose}
        >
          <XMarkIcon className="w-6 h-6 m-auto" />
        </button>
        <motion.div
          layout="position"
          className="p-8 pt-0 mt-16 rounded-lg relative"
        >
          {props.children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
