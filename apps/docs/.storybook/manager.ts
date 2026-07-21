import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

const prefersDark =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

addons.setConfig({
  theme: create({
    base: prefersDark ? "dark" : "light",
    brandTitle: "Shark UI",
    brandUrl: "https://github.com/MarcGonzalezMoratona/sharkui",
    brandImage: prefersDark ? "./brand-dark.svg" : "./brand-light.svg",
    brandTarget: "_blank",
  }),
});
