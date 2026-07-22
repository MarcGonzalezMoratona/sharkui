import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Input } from "./input";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Input>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole("textbox");

  await expect(input).toBeInTheDocument();
  await expect(input).toHaveAttribute("data-slot", "input");

  await userEvent.type(input, "hello world");
  await expect(input).toHaveValue("hello world");
};

export const playDisabled = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole("textbox");

  await expect(input).toBeDisabled();

  await userEvent.type(input, "nope");
  await expect(input).toHaveValue("");
};

export const playInvalid = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole("textbox");

  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toHaveValue("not-an-email");
};

export const playWithLabel = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText("Email");

  await expect(input).toBeInTheDocument();

  await userEvent.type(input, "you@example.com");
  await expect(input).toHaveValue("you@example.com");
};
