import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Button } from "./button";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Button>["play"]>>[0];

export const playDefault = async ({ args, canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button", { name: /button/i });

  await expect(button).toBeEnabled();
  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(1);
};

export const playDisabled = async ({ args, canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button", { name: /button/i });

  await expect(button).toBeDisabled();

  await userEvent.click(button, { pointerEventsCheck: 0 });
  await expect(args.onClick).not.toHaveBeenCalled();
};
