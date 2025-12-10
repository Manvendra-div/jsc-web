import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  ArrowRight,
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
        <p className="text-xl font-medium inline-flex">
          JSC<span className="hidden sm:block"> - Just a Simple Compiler</span>
        </p>
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
        <Button
          size={"lg"}
          variant={"secondary"}
          disabled
          className="hidden sm:inline-flex"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Button>
        <div className="h-8 bg-muted w-1.5 rounded-md hidden sm:block" />
        <Button size={"lg"} disabled className="hidden sm:inline-flex">
          Sign-Up
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Link target="_blank" href={"https://manvendrasingh.net.in"}>
          <Button
            size={"lg"}
            className="hidden sm:inline-flex bg-linear-to-r from-blue-600 to-violet-500 "
          >
            Mr. Developer
            <ExternalLink />
          </Button>
        </Link>
      </div>
    </div>
  );
}
