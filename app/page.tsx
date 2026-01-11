import Hero from "@/components/landing/hero";
import LandingNavBar from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Code2, GamepadDirectional, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black">
        <LandingNavBar />
        <Hero />
        <section className="relative rounded-4xl p-6 sm:p-10 border w-[90%] mb-10">
          <div className="bg-muted rounded-full w-16 absolute h-4 top-2 left-1/2 -translate-x-1/2"/>
          <h1 className="text-xl sm:text-4xl font-semibold opacity-60 leading-tight">
            What's new in JSC
          </h1>
          <div className="flex mt-10 sm:mt-8 items-center gap-4 sm:gap-8 w-full">
            <Code2 className="hidden sm:block size-42 bg-muted rounded-full p-2.5 sm:p-4 stroke-primary hover:shadow-xl transition" />
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
            <div className="mask-b-from-60% hidden sm:block w-[40%] ml-auto space-y-4 border">
              <div className="relative bg-muted max-w-full rounded-2xl font-mono p-4 m-4">
                <p>
                  <span className="text-violet-600 font-medium">var</span>{" "}
                  developer = <span className="text-emerald-500">"Manu"</span>;
                </p>
                <p>
                  <span className="text-violet-600 font-medium">render</span>{" "}
                  <span className="text-emerald-500">"Hello world "</span> +
                  developer;
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
            </div>
          </div>
          <div className="flex flex-row-reverse mt-10 sm:mt-32 items-center gap-4 sm:gap-8 w-full">
            <GamepadDirectional className="hidden sm:block size-42 bg-muted rounded-full p-2.5 sm:p-4 stroke-primary hover:shadow-xl transition" />
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
