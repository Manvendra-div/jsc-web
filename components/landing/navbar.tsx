import { ArrowUpRight, BookOpenText, Eclipse, Menu } from "lucide-react";
import { Button } from "../ui/button";
import MobileMenu from "../mobile-menu";

export default function LandingNavBar() {
  return (
    <div className="flex justify-between items-center w-full px-10 py-4">
      <div className="flex items-center gap-2">
        <Eclipse className="fill-primary stroke-primary-foreground border border-primary" />
        <div className="text-xl font-medium inline-flex">
          JSC <p className="hidden sm:block ml-1">- Just a Simple Compiler</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MobileMenu>
          <Button size={"icon"} className="sm:hidden">
            <Menu />
          </Button>
        </MobileMenu>
        <Button
          size={"lg"}
          variant={"secondary"}
          className="hidden sm:inline-flex"
        >
          Read Docs
          <BookOpenText className="w-4 h-4" />
        </Button>
        <div className="h-8 bg-muted w-1.5 rounded-md hidden sm:block" />
        <Button size={"lg"} className="hidden sm:inline-flex">
          Try it
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
