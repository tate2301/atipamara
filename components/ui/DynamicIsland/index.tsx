"use client"
import React, { useEffect, useRef, useState } from "react";
import {AnimatePresence, motion, useAnimate} from "framer-motion"

type BottomBarProps = {
    children: React.ReactNode;
    width?: number;
    onClick?: () => void;
    backgroundColor?: string;
    accentColor?: string;
}




export default function DynamicIsland(props: BottomBarProps) {
    const [scope, animate] = useAnimate()
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    const backgroundColor = props.backgroundColor ?? "#f0f0f0"

    const containerVariants ={
        hidden: {
            scale: 0, 
            opacity: 0, 
            backgroundColor: "rgba(0,0,0,0.04)",
            bottom: -24,
            width: 54,
        },
        visible: {
            scale: [0.5, 1.5, 1.3, 1, 1, 1], 
            opacity: [1, 1, 1, 1, 1], 
            backgroundColor: [backgroundColor, backgroundColor, backgroundColor],
            padding: ["8px", "8px"],
            bottom: [0],
            transition: {
                duration: 2, 
                times: [0, 0.1, 0.2, 0.3, 0.5, 1],
                type: "easeOut"
            },
        },
    }

    useEffect(() => {
        if(props.width !== undefined) {
            animate(ref.current, {
                width: props.width
            })
        }
    }, [props.width, animate])

    

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setInView(true);
                } else {
                    setInView(false);
                }
            });
        });
        
        if(!ref.current) return;
        const thisRef = ref.current

        observer.observe(thisRef);

        return () => {
            if(!thisRef) return;
            observer.unobserve(thisRef!);
        };
    }, []);



    return(
            <AnimatePresence>
                 <motion.div 
                        onClick={props.onClick}
                        variants={containerVariants}
                        ref={ref}
                        layout
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        whileInView="visible"
                        exit={"hidden"}
                        className="flex items-center h-[54px] min-w-[54px] rounded-full p-[8px] origin-center cursor-pointer relative">
                            {props.children}
                </motion.div>
            </AnimatePresence>
    )
}