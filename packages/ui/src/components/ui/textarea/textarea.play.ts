import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Textarea } from "./textarea";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof Textarea>["play"]>
>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByRole("textbox");

  await expect(textarea).toBeInTheDocument();
  await expect(textarea).toHaveAttribute("data-slot", "textarea");

  await userEvent.type(textarea, "hello world");
  await expect(textarea).toHaveValue("hello world");
};

export const playDisabled = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByRole("textbox");

  await expect(textarea).toBeDisabled();

  await userEvent.type(textarea, "nope");
  await expect(textarea).toHaveValue("");
};

export const playInvalid = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByRole("textbox");

  await expect(textarea).toHaveAttribute("aria-invalid", "true");
  await expect(textarea).toHaveValue("Too short");
};

export const playWithLabel = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const textarea = canvas.getByLabelText("Message");

  await expect(textarea).toBeInTheDocument();

  await userEvent.type(textarea, "Hello there");
  await expect(textarea).toHaveValue("Hello there");
};
