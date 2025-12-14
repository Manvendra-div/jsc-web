import SideBar from "@/components/docs/side-bar";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, GamepadDirectional } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-[1400px] flex-col items-center gap-8 bg-white dark:bg-black relative">
        <NavBar />
        <div className="px-10 w-full flex flex-col h-[98dvh] max-h-[1400px] pb-10 gap-4">
          <div className="flex h-full gap-8">
            <SideBar/>
            <Separator orientation="vertical" />
            <div className="">
              <h1 className="text-2xl font-medium leading-tight">
                Render Function
              </h1>
              <span className="text-muted-foreground leading-relaxed">
                Render function renders content on console or stdout
              </span>
              <div className="flex justify-between items-center bg-muted p-4 rounded-md mt-4 font-mono gap-8">
                render "Hello world!";
                <div className="flex items-center gap-2">
                  <Button size={"sm"}>
                    <GamepadDirectional /> Playground
                  </Button><Button variant={"outline"} size={"icon"}>
                    <Copy />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
