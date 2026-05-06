"use client";

import { Loader2, Play } from "lucide-react";
import { Button } from "./ui/button";
import { useAtom, useAtomValue } from "jotai";
import {
  input_code_atom,
  loading_run_atom,
  output_code_atom,
} from "@/atoms/code";
import { useEffect, useState } from "react";
import { PyodideInterface } from "pyodide";
import { toast } from "sonner";

export default function CodeRunButton() {
  const input_src = useAtomValue(input_code_atom);
  const setstdout = useAtom(output_code_atom)[1];
  const [pyodide, setPyodide] = useState<PyodideInterface>();
  const [isRunLoading, setIsRunLoading] = useAtom(loading_run_atom);

  useEffect(() => {
    (async () => {
      setIsRunLoading(true);
      // @ts-ignore
      const py = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });

      const jscSource = await fetch("/jsc-v0.1.py").then((r) => r.text());
      await py.runPythonAsync(jscSource);

      setPyodide(py);
      setIsRunLoading(false);
      toast.success("Pyodide is Loaded.");
    })();
  }, []);

  const runthecode = async () => {
    setIsRunLoading(true);
    if (!pyodide) return;

    // 1) capture stdout into a JS string, forcing each print/render on its own line
    let captured = "";
    pyodide.setStdout({
      batched: (s: string) => {
        // Pyodide may batch prints without trailing newlines,
        // so normalize each chunk to end with "\n" for the console.
        if (!s) return;
        if (s.endsWith("\n")) {
          captured += s;
        } else {
          captured += s + "\n";
        }
      },
    });

    // 2) pass code into Python
    pyodide.globals.set("input_code", input_src);

    try {
      // or, if everything is in the same file and already in globals:
      await pyodide.runPythonAsync(`
      tokens = lex(input_code)
      parser = Parser(tokens)
      ast = parser.parse()
      env = Env()
      eval_node(ast, env)
      `);

      // 3) push captured output into jotai atom
      setstdout(captured.trimEnd());
      setIsRunLoading(false);
      toast.success("Code Executed Successfully");
    } catch (e: any) {
      setstdout("Error: " + e.toString());
      toast.error("Something Went Wrong");
      setIsRunLoading(false);
    }
  };
  
  return (
    <>
      <Button
        size={"lg"}
        onClick={runthecode}
        className="hidden sm:inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-linear-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-full hover:bg-linear-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
        disabled={isRunLoading}
      >
        {isRunLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Loading...
          </>
        ) : (
          <>
            <Play className="fill-primary-foreground w-4 h-4" /> Run the
            playground
          </>
        )}
      </Button>
      <Button
        size={"icon"}
        onClick={runthecode}
        className="sm:hidden"
        disabled={isRunLoading}
      >
        {isRunLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          <>
            <Play className="fill-primary-foreground w-4 h-4" />
          </>
        )}
      </Button>
    </>
  );
}
