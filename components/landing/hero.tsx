import { ArrowUpRight, BookOpenText, Download, Eclipse } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import OSSelectDialog from "./os-select-dialog";

export default function Hero() {
  return (
    <div className="h-[80dvh] relative flex flex-col justify-center items-center gap-4 w-full text-center">
      <Eclipse className="fill-primary stroke-white dark:stroke-black border-2 border-primary size-16 sm:size-28" />
      <span className="text-2xl sm:text-4xl font-medium leading-tight">
        JSC - Just Simple Compiler
      </span>
      <span className="text-muted-foreground text-xs sm:text-base leading-relaxed w-[66%] sm:w-[50%]">
        A custom programming language with its own interpreter, built in Python.
        Designed to explore language design, parsing, and execution from
        scratch.
      </span>
      <div className="flex items-center gap-2.5">
        <OSSelectDialog>
          <Button
            size={"lg"}
            className="relative before:absolute before:top-0 before:left-0 before:w-full
     before:h-full before:content-[''] before:opacity-[0.12] before:z-10 before:pointer-events-none
     before:bg-[url('https://www.ui-layouts.com/noise.gif')] overflow-hidden"
          >
            Download <Download className="w-4-h-4" />
          </Button>
        </OSSelectDialog>
        <Button asChild size={"lg"}>
          <Link href="/docs">
            Read Docs
            <BookOpenText className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant={"secondary"} size={"lg"}>
          <Link href="/playground">
            Try it <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
