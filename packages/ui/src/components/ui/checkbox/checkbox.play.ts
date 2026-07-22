import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Checkbox } from "./checkbox";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof Checkbox>["play"]>
>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const checkbox = canvas.getByRole("checkbox");

  await expect(checkbox).toBeInTheDocument();
  await expect(checkbox).toHaveAttribute("aria-checked", "false");

  await userEvent.click(checkbox);
  await expect(checkbox).toHaveAttribute("aria-checked", "true");

  await userEvent.click(checkbox);
  await expect(checkbox).toHaveAttribute("aria-checked", "false");
};

export const playChecked = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const checkbox = canvas.getByRole("checkbox");

  await expect(checkbox).toHaveAttribute("aria-checked", "true");
  await expect(checkbox).toHaveAttribute("data-checked");
  await expect(checkbox.querySelector("svg")).toBeInTheDocument();
};

export const playDisabled = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const checkbox = canvas.getByRole("checkbox");

  await expect(checkbox).toHaveAttribute("aria-disabled", "true");

  await userEvent.click(checkbox);
  await expect(checkbox).toHaveAttribute("aria-checked", "false");
};

export const playWithLabel = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const checkbox = canvas.getByRole("checkbox");

  await expect(
    canvas.getByText("Accept terms and conditions"),
  ).toBeInTheDocument();
  await expect(checkbox).toHaveAttribute("aria-checked", "false");

  await userEvent.click(canvas.getByText("Accept terms and conditions"));
  await expect(checkbox).toHaveAttribute("aria-checked", "true");
};
