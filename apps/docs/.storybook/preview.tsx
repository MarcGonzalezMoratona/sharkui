import type { Preview, Decorator } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";

import "@fontsource-variable/raleway";
import "@fontsource-variable/open-sans";

import "../../../packages/ui/src/styles.css";
import "./branded.css";

// Wraps the story in a `.branded` scope when the "Brand" toolbar is set to
// "branded". The library itself stays headless — branded.css only re-maps the
// semantic CSS variables inside this wrapper, so nothing leaks into the
// published package.
const withBrand: Decorator = (Story, context) => {
  if (context.globals.brand !== "branded") return <Story />;
  return (
    <div className="branded" style={{ padding: "1.5rem", minHeight: "100%" }}>
      <Story />
    </div>
  );
};

export const globalTypes = {
  brand: {
    name: "Brand",
    description: "Design-system brand theme",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "neutral", title: "Neutral" },
        { value: "branded", title: "Branded" },
      ],
      dynamicTitle: true,
    },
  },
};

export const initialGlobals = {
  brand: "neutral",
};

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
      parentSelector: "html",
    }),
    withBrand,
  ],
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          "Engineering",
          "Components",
          "*",
        ],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
