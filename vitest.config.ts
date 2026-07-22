import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/ui/vitest.config.ts", "apps/docs/vite.config.ts"],
    coverage: {
      provider: "istanbul",
      include: ["packages/ui/src/**/*.{ts,tsx}"],
      exclude: [
        "packages/ui/src/**/*.stories.tsx",
        "packages/ui/src/**/*.play.ts",
        "packages/ui/src/**/*.test.{ts,tsx}",
        "packages/ui/src/index.ts",
      ],
      reporter: ["text", "html", "json", "json-summary"],
    },
  },
});
