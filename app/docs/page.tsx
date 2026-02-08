import SideBar from "@/components/docs/side-bar";
import LandingNavBar from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GamepadDirectional, Menu } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black relative">
        <LandingNavBar />
        <div className="px-10 w-full flex flex-col h-[98dvh] max-h-[1400px] pb-10 gap-4">
          <div className="flex h-full gap-8">
            <div className="hidden md:flex">
              <SideBar />
            </div>
            <Separator orientation="vertical" className="hidden md:flex" />
            <div className="flex flex-col gap-8 pb-10 max-w-3xl w-full">
              <div className="flex md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Menu className="size-4" />
                      Sections
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Docs sections</SheetTitle>
                    </SheetHeader>
                    <div className="px-4 pb-6">
                      <SideBar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <section id="overview" className="scroll-mt-24">
                <h1 className="text-2xl font-medium leading-tight">
                  JSC Language Docs
                </h1>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  JSC (Just Simple Compiler) is a small language with a minimal
                  syntax designed for learning. Every statement ends with a
                  semicolon, strings use double quotes, and blocks use a
                  lightweight <span className="font-mono">::</span> and{" "}
                  <span className="font-mono">::end;</span> form.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Button asChild size={"sm"}>
                    <Link href="/playground">
                      <GamepadDirectional /> Open Playground
                    </Link>
                  </Button>
                </div>
              </section>

              <section id="variables" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">
                  Variables
                </h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Declare variables with <span className="font-mono">var</span>{" "}
                  and assign with <span className="font-mono">=</span>. Values
                  can be numbers or strings.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm">
                  <div>var name = "JSC";</div>
                  <div>var version = 1;</div>
                  <div>name = "Just Simple Compiler";</div>
                </div>
              </section>

              <section id="render" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">
                  Render (print)
                </h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Use <span className="font-mono">render</span> to print to the
                  console or stdout.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm">
                  <div>render "Hello world!";</div>
                  <div>render name;</div>
                </div>
              </section>

              <section id="assist" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">Assist</h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  The <span className="font-mono">assist</span> keyword routes
                  a prompt to an AI helper in the web runner. If no helper is
                  configured, it prints a placeholder response.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm">
                  <div>assist "Explain this error";</div>
                </div>
              </section>

              <section id="input" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">
                  Input (capture)
                </h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Use <span className="font-mono">capture</span> to read user
                  input. You can optionally pass a prompt expression.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm">
                  <div>var name = capture("Your name? ");</div>
                  <div>render name;</div>
                </div>
              </section>

              <section id="loops" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">Loops</h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Use <span className="font-mono">dountil</span> with a
                  comparison. The body runs until the condition becomes true.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm">
                  <div>var count = 0;</div>
                  <div>dountil (count &gt;= 3) ::</div>
                  <div className="pl-4">render count;</div>
                  <div className="pl-4">count = count + 1;</div>
                  <div>::end;</div>
                </div>
              </section>

              <section id="operators" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">Operators</h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  JSC supports addition/subtraction and comparison operators
                  for conditions.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm grid gap-2">
                  <div>+  -</div>
                  <div>&gt;  &gt;=  &lt;  &lt;=  ==  !=</div>
                </div>
              </section>

              <section id="comments" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">Comments</h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Comments start with{" "}
                  <span className="font-mono">*c</span> and continue to the end
                  of the line.
                </p>
                <div className="bg-muted p-4 rounded-md mt-3 font-mono text-sm">
                  <div>*c this is a comment</div>
                  <div>render "Still runs";</div>
                </div>
              </section>

              <section id="about" className="scroll-mt-24">
                <h2 className="text-xl font-medium leading-tight">About JSC</h2>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  JSC is a custom programming language with its own interpreter,
                  built in Python for the web playground. It is intentionally
                  small so you can focus on parsing, execution, and language
                  design fundamentals.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
