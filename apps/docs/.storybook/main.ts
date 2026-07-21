import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../../../packages/ui/src/**/*.mdx",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "storybook-addon-pseudo-states",
  ],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  managerHead: (head) =>
    `${head}<link rel="icon" type="image/svg+xml" href="./favicon.svg" />`,
};
export default config;
