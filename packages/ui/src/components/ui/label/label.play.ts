import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Label } from "./label";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Label>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const label = canvas.getByText("Label");

  await expect(label).toBeInTheDocument();
  await expect(label).toHaveAttribute("data-slot", "label");
};

export const playWithInput = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText("Username")).toBeInTheDocument();

  const input = canvas.getByLabelText("Username");
  await userEvent.click(canvas.getByText("Username"));
  await expect(input).toHaveFocus();

  await userEvent.type(input, "shark");
  await expect(input).toHaveValue("shark");
};
