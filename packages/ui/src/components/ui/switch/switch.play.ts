import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Switch } from "./switch";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Switch>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const switchEl = canvas.getByRole("switch");

  await expect(switchEl).toBeInTheDocument();
  await expect(switchEl).toHaveAttribute("aria-checked", "false");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("aria-checked", "true");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("aria-checked", "false");
};

export const playChecked = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const switchEl = canvas.getByRole("switch");

  await expect(switchEl).toHaveAttribute("aria-checked", "true");
  await expect(switchEl).toHaveAttribute("data-checked");
};

export const playDisabled = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const switchEl = canvas.getByRole("switch");

  await expect(switchEl).toHaveAttribute("aria-disabled", "true");
  await expect(switchEl).toHaveAttribute("data-disabled");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("aria-checked", "false");
};

export const playWithLabel = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const switchEl = canvas.getByRole("switch");

  await expect(canvas.getByText("Airplane mode")).toBeInTheDocument();
  await expect(switchEl).toHaveAttribute("aria-checked", "false");

  await userEvent.click(canvas.getByText("Airplane mode"));
  await expect(switchEl).toHaveAttribute("aria-checked", "true");
};
