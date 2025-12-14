import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  ArrowRight,
  BookOpenText,
  Eclipse,
  ExternalLink,
  GamepadDirectional,
  LogIn,
  Menu,
} from "lucide-react";
import CodeRunButton from "./coderunbutton";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center w-full px-10 py-4">
      <div className="flex items-center gap-2">
        <Eclipse className="fill-primary stroke-primary-foreground border border-primary" />
        <div className="text-xl font-medium inline-flex">
          JSC <p className="hidden sm:block ml-1">- Just a Simple Compiler</p>
        </div>
        <Badge className="hidden sm:inline-flex">
          <GamepadDirectional /> Playground Window
        </Badge>
      </div>
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
