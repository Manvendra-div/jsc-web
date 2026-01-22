"use client";

import { motion } from "motion/react";

export default function Batch() {
  return (
    <motion.div
      initial={{
        width: "0px",
      }}
      animate={{
        width: "4rem",
        dur:0.3
      }}
      className="bg-muted rounded-full absolute h-2 sm:h-4 top-2 left-1/2 -translate-x-1/2"
    />
  );
}
