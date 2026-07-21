import { defineConfig } from "tsup";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  // react/react-dom are peers; dependencies are externalized by tsup automatically.
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    // Resolve the shadcn "@/..." alias when bundling JS.
    options.alias = {
      "@": path.resolve(dirname, "src"),
    };
  },
});
