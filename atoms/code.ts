import { atom } from "jotai";

export const input_code_atom = atom<string>(`
*c Just a Simple Compiler Example v1.1

var developer = "Manvendra";
var y = "hey";

render "Hello, " + developer + "!";
`);

export const output_code_atom = atom<string | null>(null);
