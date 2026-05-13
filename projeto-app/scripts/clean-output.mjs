import { rm } from "node:fs/promises";
import { resolve, relative } from "node:path";

const workspace = resolve(".");
const output = resolve(workspace, "projeto");
const relativeOutput = relative(workspace, output);

if (!relativeOutput || relativeOutput.startsWith("..") || relativeOutput.includes(":")) {
  throw new Error(`Output path outside workspace: ${output}`);
}

await rm(output, { recursive: true, force: true });
