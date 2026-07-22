import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import preserveDirectives from "rollup-plugin-preserve-directives";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(dirname, "src");

// One input per component (plus the barrel and shared utils). Combined with
// `preserveModules`, Rollup emits one output file per source module and keeps
// the imports between them as ESM.
const entries = [
  "index.ts",
  "lib/utils.ts",
  ...readdirSync(path.join(src, "components"), { recursive: true })
    .filter((f) => typeof f === "string" && f.endsWith(".tsx"))
    .filter((f) => !/\.(stories|test)\.|\.play\./.test(f))
    .map((f) => path.join("components", f)),
].map((f) => path.join(src, f));

export default {
  input: entries,
  output: {
    dir: "dist",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
    entryFileNames: "[name].js",
    strict: false,
  },
  external: (id) =>
    !id.startsWith(".") && !path.isAbsolute(id) && !id.startsWith("@/"),
  plugins: [
    alias({ entries: [{ find: /^@\//, replacement: `${src}/` }] }),
    nodeResolve({ extensions: [".ts", ".tsx", ".mjs", ".js"] }),
    esbuild({
      jsx: "automatic",
      target: "es2023",
      sourceMap: true,
      tsconfigRaw: { compilerOptions: { alwaysStrict: false } },
    }),
    preserveDirectives(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
    if (warning.code === "SOURCEMAP_ERROR") return;
    warn(warning);
  },
};
