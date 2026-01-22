import Hero from "@/components/landing/hero";
import LandingNavBar from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Code2, GamepadDirectional, Play } from "lucide-react";
import Link from "next/link";
import {motion} from "motion/react"
import CodeBoxAnimated from "@/components/landing/code-box-animated";
import Batch from "@/components/landing/batch";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black">
        <LandingNavBar />
        <Hero />
        <section className="relative rounded-4xl p-6 sm:p-10 border w-[90%] mb-10">
          <Batch/>
          <h1 className="text-xl sm:text-4xl font-semibold opacity-60 leading-tight">
            What's new in JSC
          </h1>
          <div className="flex mt-10 sm:mt-8 items-center gap-4 sm:gap-8 w-full">
            <Code2 className="hidden stroke-1 sm:block size-42 bg-muted rounded-full p-2.5 sm:p-4 stroke-primary transition" />
            <div className="flex flex-col gap-2">
              <span className="text-base sm:text-2xl font-mono leading-tight">
                New Set of Syntax
              </span>
              <span className="text-sm sm:text-lg text-muted-foreground">
                Compiler-style syntax designed from scratch
              </span>
              <Link href={"/docs"}>
                <Button className="w-fit">
                  Explore Docs <ArrowUpRight />
                </Button>
              </Link>
            </div>
            <CodeBoxAnimated/>
          </div>
          <div className="flex flex-row-reverse mt-10 sm:mt-32 items-center gap-4 sm:gap-8 w-full">
            <GamepadDirectional className="hidden stroke-1 sm:block size-42 bg-muted rounded-full p-2.5 sm:p-4 stroke-primary transition" />
            <div className="flex flex-col gap-2 sm:text-end">
              <span className="text-base sm:text-2xl leading-tight">
                Web-Based Playground
              </span>
              <span className="text-sm sm:text-lg text-muted-foreground">
                A Web Based Playground to run JSC code just into your Browser
              </span>
              <Button className="w-fit sm:ml-auto">
                Explore Playground <ArrowUpRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
