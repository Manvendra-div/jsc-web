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

    // 1) capture stdout into a JS string
    let captured = "";
    pyodide.setStdout({
      batched: (s: string) => {
        captured += s;
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
        className="hidden sm:inline-flex"
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
