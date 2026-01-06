import { Copy, GamepadDirectional } from "lucide-react";
import { Button } from "../ui/button";

export default function CodeBox({
  content,
  keywordRange,
}: {
  content: string;
  keywordRange: number;
}) {
  return (
    <div className="flex justify-between items-center bg-muted p-4 rounded-md mt-4 font-mono gap-8">
      render "Hello world!";
      <div className="flex items-center gap-2">
        <Button size={"sm"}>
          <GamepadDirectional /> Playground
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <Copy />
        </Button>
      </div>
    </div>
  );
}
