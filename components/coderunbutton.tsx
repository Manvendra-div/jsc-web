"use client";

import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { useAtom, useAtomValue } from "jotai";
import { input_code_atom, output_code_atom } from "@/atoms/code";
import { useEffect, useState } from "react";
import { PyodideInterface } from "pyodide";

export default function CodeRunButton() {
  const input_src = useAtomValue(input_code_atom);
  const setstdout = useAtom(output_code_atom)[1];
  const [pyodide, setPyodide] = useState<PyodideInterface>();
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const py = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });

      const jscSource = await fetch("/jsc.py").then((r) => r.text());
      await py.runPythonAsync(jscSource);

      setPyodide(py);
    })();
  }, []);

  const runthecode = async () => {
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
    } catch (e: any) {
      setstdout("Error: " + e.toString());
    }
  };
  return (
    <Button size={"lg"} onClick={runthecode}>
      <Play className="fill-primary-foreground w-4 h-4" /> Run the playground
    </Button>
  );
}
