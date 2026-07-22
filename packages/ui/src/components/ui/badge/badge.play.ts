import type { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import type { Badge } from "./badge";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Badge>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const badge = canvas.getByText("Badge");

  await expect(badge).toBeInTheDocument();
  await expect(badge).toHaveAttribute("data-slot", "badge");
};

export const playVariants = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  for (const label of [
    "Default",
    "Secondary",
    "Destructive",
    "Outline",
    "Ghost",
    "Link",
  ]) {
    await expect(canvas.getByText(label)).toBeInTheDocument();
  }
};

export const playWithIcon = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const verified = canvas.getByText("Verified");

  await expect(verified).toBeInTheDocument();
  await expect(canvas.getByText("Done")).toBeInTheDocument();
  await expect(verified.querySelector("svg")).toBeInTheDocument();
};
