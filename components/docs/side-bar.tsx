import Link from "next/link";
import { Button } from "../ui/button";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">Section</span>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#overview">Overview</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#variables">Variables</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#render">Render</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#assist">Assist</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#input">Input (capture)</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#loops">Loops</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#operators">Operators</Link>
      </Button>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#comments">Comments</Link>
      </Button>
      <span className="text-sm text-muted-foreground mt-4">About</span>
      <Button asChild size={"sm"} variant={"secondary"}>
        <Link href="#about">About JSC</Link>
      </Button>
    </div>
  );
}
