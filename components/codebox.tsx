"use client";
import { input_code_atom } from "@/atoms/code";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useAtom } from "jotai";
import { GamepadDirectional } from "lucide-react";
import { useEffect, useState } from "react";

export default function CodeBox() {
  const [code, setCode] = useAtom(input_code_atom);
  const [output, setOutput] = useState("");
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // @ts-ignore
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });

      monaco.editor.defineTheme("jsc", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "keyword", foreground: "7c3aed", fontStyle: "bold" }, // purple
          { token: "string", foreground: "047857" }, // teal/green
          { token: "number", foreground: "b45309" }, // amber/brown
          { token: "comment", foreground: "9ca3af", fontStyle: "italic" }, // gray
          { token: "identifier", foreground: "111827" }, // near-black
        ],
        colors: {
          "editor.background": "#00000000", // transparent
          "editor.lineHighlightBackground": "#ffffff05",
          "editorGutter.background": "#00000000",
          "editor.selectionBackground": "#3e3b59",
          "editorCursor.foreground": "#ff4aff",
        },
      });
      monaco.editor.setTheme("jsc");
    }
  }, [monaco]);
  return (
    <div>
      <div className="w-full mb-2.5 flex items-center gap-2">
        <GamepadDirectional className="stroke-foreground/60 stroke-2" />
        <span className="font-medium text-2xl text-foreground/60">
          Your JSC Playground
        </span>
      </div>
      <div className="bg-muted border rounded-md w-full h-[70dvh] max-h-[800px] py-4">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          theme="jsc"
          onChange={(v) => setCode(v ?? "")}
          options={{
            minimap: { enabled: false },
            glyphMargin: false,
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
          }}
        />
      </div>
    </div>
  );
}
