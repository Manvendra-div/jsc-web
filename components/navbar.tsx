import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  BookOpenText,
  Eclipse,
  GamepadDirectional,
  Menu,
} from "lucide-react";
import CodeRunButton from "./coderunbutton";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function NavBar() {
  return (
    <div className="flex w-full items-center justify-between px-10 py-4">
      <Link
        href="/"
        className="flex items-center gap-2 no-underline"
        aria-label="JSC Compiler home"
        prefetch
      >
        <Eclipse className="fill-primary stroke-primary-foreground border border-primary" />
        <div className="inline-flex text-xl font-medium">
          <span aria-hidden="true">JSC</span>
          <span className="ml-1 hidden sm:block">
            Just a Simple Compiler
          </span>
          <span className="sr-only">JSC — Just a Simple Compiler</span>
        </div>
        <Badge className="hidden sm:inline-flex">
          <GamepadDirectional /> Playground Window
        </Badge>
      </Link>
      <div className="flex items-center gap-2">
        <CodeRunButton />
        <MobileMenu>
          <Button size={"icon"} className="sm:hidden">
            <Menu />
          </Button>
        </MobileMenu>
        <div className="h-8 bg-muted w-1.5 rounded-md hidden sm:block" />
        <Link href={"/docs"} className="hidden sm:block ">
          <Button size={"lg"} variant={"secondary"}>
            Read Docs
            <BookOpenText className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
