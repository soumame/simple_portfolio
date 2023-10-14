"use client";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import About from "./about";

export default function Motion() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const [margin, setMargin] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      setMargin(v * 16);
      setRadius(v * 16);
    });
  }, [scrollYProgress]);

  return (
    <motion.div
      ref={ref}
      className="h-44 bg-red-500 flex justify-center items-center"
      style={{
        margin: margin + "px",
        borderRadius: radius + "px",
      }}
    >
      <About />
    </motion.div>
  );
}
