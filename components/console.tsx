"use client";

import { Delete, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useAtom, useAtomValue } from "jotai";
import { output_code_atom } from "@/atoms/code";

export default function Console() {
  const [stdout, setStdout] = useAtom(output_code_atom);
  return (
    <div className="bg-muted border rounded-md p-4 w-full grow relative flex flex-col">
      <span className="font-medium text-muted-foreground text-sm">Console</span>
      <div className="absolute top-4 right-10 flex items-center gap-2">
        <Button variant={"outline"} size={"icon"} onClick={()=>setStdout(null)}>
          <Delete />
        </Button>
        <Button size={"sm"} className="">
          Pop Out The Console <ExternalLink />
        </Button>
      </div>
      {stdout ? (
        <>
          <div className="font-mono text-green-400 mt-4">{stdout}</div>
        </>
      ) : (
        <div className="absolute flex flex-col  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  gap-2.5 justify-center">
          <span className="text-xl font-mono">Nothing to show</span>
          <span className="text-muted-foreground">Start Running Something</span>
        </div>
      )}
    </div>
  );
}
