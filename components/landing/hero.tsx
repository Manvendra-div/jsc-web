import { ArrowUpRight, Download, Eclipse } from "lucide-react";
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
      <div className="flex flex-wrap max-w-72 justify-center items-center gap-2.5">
        <OSSelectDialog>
          <Button
            size={"lg"}
            className="items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-linear-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-full hover:bg-linear-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
          >
            Download <Download className="w-4-h-4" />
          </Button>
        </OSSelectDialog>
        <Button asChild variant={"secondary"} size={"lg"}>
          <Link href="/playground">
            Try it <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
