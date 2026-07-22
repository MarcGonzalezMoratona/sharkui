import type { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import type { Separator } from "./separator";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof Separator>["play"]>
>[0];

export const playHorizontal = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const separator = canvas.getByRole("separator");

  await expect(separator).toBeInTheDocument();
  await expect(separator).toHaveAttribute("data-slot", "separator");
  await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  await expect(separator).toHaveAttribute("aria-orientation", "horizontal");
};

export const playVertical = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const separators = canvas.getAllByRole("separator");

  await expect(separators.length).toBeGreaterThan(0);

  for (const separator of separators) {
    await expect(separator).toHaveAttribute("data-slot", "separator");
    await expect(separator).toHaveAttribute("data-orientation", "vertical");
    await expect(separator).toHaveAttribute("aria-orientation", "vertical");
  }
};
