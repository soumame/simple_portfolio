import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { readFileSync } from "fs";

export interface IAnimTextProps {
  delay: number;
  lang: string;
}

export default function AnimText({ delay, lang }: IAnimTextProps) {
  const summary = `src/who/summary-${lang}.json`;
  // const itemsPath = path.join("../rss/", `items-${language}`, ".json");
  let data;
  try {
    const rawData = readFileSync(summary, "utf8");
    data = JSON.parse(rawData);
    console.log("Who.tsxのデータ取得できた");
  } catch (error) {
    console.error("Error reading the file:", error);
    data = null;
  }

  const [done, setDone] = useState(false);
  const baseText = data;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest),
  );
  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
      onComplete: () => {
        setDone(true);
      },
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      {done && (
        <>
          <br /> <br />
        </>
      )}
    </span>
  );
}
