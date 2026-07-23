import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../../../packages/ui/src/**/*.mdx",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    {
      // Enable GitHub-Flavored Markdown (tables, strikethrough, task lists) in
      // MDX docs — Storybook doesn't ship remark-gfm by default.
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-themes",
    "storybook-addon-pseudo-states",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  managerHead: (head) =>
    `${head}<link rel="icon" type="image/svg+xml" href="./favicon.svg" />`,
};
export default config;
