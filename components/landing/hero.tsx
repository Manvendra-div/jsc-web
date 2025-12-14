import { ArrowUpRight, BookOpenText, Eclipse } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <Link href={"/docs"}>
          <Button size={"lg"}>
            Read Docs
            <BookOpenText className="w-4 h-4" />
          </Button>
        </Link>
        <Link href={"/playground"}>
          <Button variant={"secondary"} size={"lg"}>
            Try it <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
