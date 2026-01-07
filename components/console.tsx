"use client";

import { motion } from "motion/react";
import {
  ArrowDownRight,
  BrushCleaning,
  Copy,
  ExternalLink,
  GripVertical,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { output_code_atom } from "@/atoms/code";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import copy from "copy-to-clipboard";
import { toast } from "sonner";

export default function Console() {
  const [stdout, setStdout] = useAtom(output_code_atom);
  const [toggleFloat, setToggleFloat] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = (content: string) => {
    // The library returns a boolean indicating success
    const success = copy(content);
    if (success) {
      setIsCopied(true);
      toast.success("Console Copied to Clipboard.")
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  useEffect(() => {
    // Set initial window size
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();

    // Add resize listener
    window.addEventListener("resize", updateWindowSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <motion.div
      key={toggleFloat ? "floating" : "embedded"}
      drag={toggleFloat}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={
        windowSize.width > 0 && windowSize.height > 0
          ? {
              top: 0,
              left: 0,
            }
          : undefined
      }
      initial={toggleFloat ? { scale: 0.8, opacity: 0 } : false}
      animate={
        toggleFloat ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }
      }
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={cn(
        toggleFloat
          ? "fixed min-h-[200px] w-[300px] sm:min-h-[400px] sm:w-[600px] border-4 shadow-2xl bg-background/60 backdrop-blur-lg z-50"
          : "min-h-[200px] relative w-full bg-muted",
        "border rounded-md p-4 grow flex flex-col"
      )}
    >
      <span className="font-medium text-muted-foreground text-sm">Console</span>
      {toggleFloat && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

      <div className="absolute top-4 right-4 flex items-center gap-2">
        {!!stdout && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleCopy(stdout)}
                variant={"outline"}
                size={"icon"}
              >
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to Copy Console</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              disabled={!!!stdout}
              onClick={() => setStdout(null)}
            >
              <BrushCleaning />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear Console</p>
          </TooltipContent>
        </Tooltip>
        <Button
          onClick={() => setToggleFloat(!toggleFloat)}
          size={"sm"}
          className="hidden sm:inline-flex"
        >
          {toggleFloat ? (
            <>
              Pop In The Console <ArrowDownRight />
            </>
          ) : (
            <>
              Pop Out The Console <ExternalLink />
            </>
          )}
        </Button>
        <Button
          onClick={() => setToggleFloat(!toggleFloat)}
          size={"icon"}
          className="sm:hidden"
        >
          <ExternalLink />
        </Button>
      </div>
      {stdout ? (
        <>
          <div className="font-mono text-green-400 mt-4">{stdout}</div>
        </>
      ) : (
        <div className="absolute flex flex-col text-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 gap-2.5 justify-center pointer-events-none">
          <span className="text-base sm:text-xl font-mono">
            Nothing to show
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            Start Running Something
          </span>
        </div>
      )}
    </motion.div>
  );
}
