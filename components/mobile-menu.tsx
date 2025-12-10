"use client"

import { ArrowRight, Eclipse, ExternalLink, GamepadDirectional, LogIn } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const menu_data: {
    icon: ReactNode;
    text: string;
    cn: string;
    type: "link" | "action";
    action: (() => void) | Url;
  }[] = [
    {
      icon: <LogIn className="w-4 h-4" />,
      text: "Login",
      cn: "",
      type: "action",
      action: () => {},
    },
    {
      icon: <ArrowRight className="w-4 h-4" />,
      text: "Sign-Up",
      cn: "",
      type: "action",
      action: () => {},
    },
    {
      icon: <ExternalLink />,
      text: "Mr. Developer",
      cn: "bg-linear-to-r from-blue-600 to-violet-500",
      type: "link",
      action: "https://manvendrasingh.net.in",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-4" side="left">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2">
              <Eclipse className="fill-primary stroke-primary-foreground border border-primary" />
              <p className="text-xl font-medium inline-flex">
                JSC
                <span className="hidden sm:block">
                  {" "}
                  - Just a Simple Compiler
                </span>
              </p>
              <Badge className="hidden sm:inline-flex">
                <GamepadDirectional /> Playground Window
              </Badge>
            </div>
          </SheetTitle>
        </SheetHeader>
        {menu_data.map((item, index) => {
          return item.type === "link" ? (
            <Link key={index} href={item.action as unknown as Url} className="w-full">
              <Button
                variant={index > 2 ? "secondary" : "default"}
                className={cn(item.cn,"w-full")}
                size={"lg"}
              >
                {item.text}
                {item.icon}
              </Button>
            </Link>
          ) : (
            <Button
              key={index}
              size={"lg"}
              variant={index > 2 ? "secondary" : "default"}
              className={cn(item.cn, "w-full ml-auto")}
              onClick={item.action as () => void}
            >
              {item.text}
              {item.icon}
            </Button>
          );
        })}
      </SheetContent>
    </Sheet>
  );
}