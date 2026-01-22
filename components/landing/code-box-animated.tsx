"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function CodeBoxAnimated() {
  return (
    <div className="relative mask-b-from-60% hidden sm:block w-[40%] ml-auto space-y-4 border">
      <div className="relative bg-muted max-w-full rounded-2xl font-mono p-4 m-4">
        <p>
          <span className="text-violet-600 font-medium">var</span> developer ={" "}
          <span className="text-emerald-500">"Manu"</span>;
        </p>
        <p>
          <span className="text-violet-600 font-medium">render</span>{" "}
          <span className="text-emerald-500">"Hello world "</span> + developer;
        </p>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-2 right-2"
        >
          <Play className="fill-inherit" />
        </Button>
      </div>
      <div className="w-full h-0.5 bg-muted" />
      <div className="relative bg-muted max-w-full rounded-2xl font-mono p-4 m-4">
        <span className="text-fuchsia-500">manvendra@jsc:~$ </span>
        <span className="text-emerald-500">Hello world Manu</span>
      </div>
      <motion.div
        initial={{
          position: "absolute",
          bottom: 0,
          left: 0,
          scale: 0,
          opacity: 0,
        }}
        animate={{
          bottom: "8rem",
          left: "25.5rem",
          scale: 1,
          opacity: 1,
          rotate: 360,
          transition: {
            bottom: {
              type: "spring",
              duration: 0.6,
            },
            left: {
              type: "spring",
              duration: 0.6,
            },
            scale: { duration: 0.6, ease: "easeOut" },
            opacity: { duration: 0.4 },
            rotate: { duration: 1 },
          },
        }}
        className="size-10 rounded-full bg-white/60 backdrop-blur-sm shadow-2xl"
      />
    </div>
  );
}
