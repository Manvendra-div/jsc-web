import { Button } from "../ui/button";

export default function SideBar() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">Section</span>
      <Button size={"sm"} variant={"secondary"}>
        Render (print)
      </Button>
      <Button size={"sm"} variant={"secondary"}>
        Variable declaration
      </Button>
      <Button size={"sm"} variant={"secondary"}>
        Comments
      </Button>
      <span className="text-sm text-muted-foreground mt-4">About</span>
      <Button size={"sm"} variant={"secondary"}>
        About JSC
      </Button>
    </div>
  );
}
