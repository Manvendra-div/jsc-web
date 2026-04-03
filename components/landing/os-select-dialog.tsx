import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function OSSelectDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="xs:max-w-200">
        <DialogHeader>
          <DialogTitle>Select your platform</DialogTitle>
          <DialogDescription>
            Select your OS to download the best compatible binaries
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-full flex flex-col h-40 relative overflow-hidden"
            // asChild
          >
            <Link href={"#"}>
              <Image
                alt="Windows"
                height={100}
                width={100}
                src={"/windows-logo.svg"}
                className="opacity-80"
              />
            </Link>
            <div className="absolute inset-0 bg-accent/60 flex items-center justify-center">
              <span className="border-2 border-dashed px-1.5 sm:px-4 py-2 bg-background/90 text-muted-foreground text-xs sm:text-sm">Will be available soon</span>
            </div>
          </Button>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-full flex flex-col h-40"
            asChild
          >
            <Link href={"/jsc-linux"}>
              <Image
                alt="Linux"
                height={100}
                width={100}
                src={"/linux-logo.svg"}
                className="opacity-80"
              />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
