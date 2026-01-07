import CodeBox from "@/components/codebox";
import Console from "@/components/console";
import NavBar from "@/components/navbar";
import { GamepadDirectional } from "lucide-react";

export default function Page() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="z-10 flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black relative">
        <NavBar />
        <div className="px-10 w-full flex flex-col h-[98dvh] max-h-[1400px] pb-10 gap-4">
          <CodeBox />
          <Console />
        </div>
      </main>
     <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="flex flex-wrap justify-center gap-24 p-10 opacity-10">
          {Array.from({ length: 40 }).map((_, i) => (
            <GamepadDirectional
              key={i}
              className="size-24 md:size-32 rotate-12"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
