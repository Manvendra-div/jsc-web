import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  ArrowRight,
  Eclipse,
  ExternalLink,
  GamepadDirectional,
  LogIn,
} from "lucide-react";
import CodeRunButton from "./coderunbutton";
import Link from "next/link";


export default function NavBar() {
  return (
    <div className="flex justify-between items-center w-full px-10 py-4">
      <div className="flex items-center gap-2">
        <Eclipse className="fill-primary stroke-primary-foreground border border-primary"/>
        <span className="text-xl font-medium">
          JSC - Just a Simple Compiler
        </span>
        <Badge>
          <GamepadDirectional /> Playground Window
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <CodeRunButton />
        <Button size={"lg"} variant={"secondary"} disabled>
          <LogIn className="w-4 h-4" />
          Login
        </Button>
        <div className="h-8 bg-muted w-1.5 rounded-md" />
        <Button size={"lg"} disabled>
          Sign-Up
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Link target="_blank" href={"https://manvendrasingh.net.in"}>
          <Button
            size={"lg"}
            className="bg-linear-to-r from-blue-600 to-violet-500 "
          >
            Mr. Developer
            <ExternalLink />
          </Button>
        </Link>
      </div>
    </div>
  );
}
