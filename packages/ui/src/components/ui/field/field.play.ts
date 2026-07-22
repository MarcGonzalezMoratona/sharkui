import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Field } from "./field";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Field>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const label = canvas.getByText("Email");
  const input = canvas.getByRole("textbox");

  await expect(label).toHaveAttribute("for", "email");
  await expect(input).toHaveAttribute("id", "email");
  await expect(
    canvas.getByText("We'll never share your email with anyone else."),
  ).toBeInTheDocument();

  await userEvent.type(input, "you@example.com");
  await expect(input).toHaveValue("you@example.com");
};

export const playWithError = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const field = canvasElement.querySelector('[data-slot="field"]');
  await expect(field).toHaveAttribute("data-invalid", "true");

  const alert = canvas.getByRole("alert");
  await expect(alert).toHaveAttribute("data-slot", "field-error");
  await expect(alert).toHaveTextContent(
    "Password must be at least 8 characters.",
  );

  const input = canvas.getByLabelText("Password");
  await expect(input).toHaveAttribute("aria-invalid", "true");
};

export const playHorizontalWithControl = async ({
  canvasElement,
}: PlayContext) => {
  const canvas = within(canvasElement);

  const field = canvasElement.querySelector('[data-slot="field"]');
  await expect(field).toHaveAttribute("data-orientation", "horizontal");

  await expect(canvas.getByText("Notifications")).toBeInTheDocument();

  const switchEl = canvas.getByRole("switch");
  await expect(switchEl).toHaveAttribute("aria-checked", "true");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("aria-checked", "false");
};

export const playFieldGroup = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByLabelText("Full name")).toBeInTheDocument();
  await expect(canvas.getByLabelText("Username")).toBeInTheDocument();
  await expect(canvas.getByLabelText("Bio")).toBeInTheDocument();

  const separator = canvasElement.querySelector(
    '[data-slot="field-separator-content"]',
  );
  await expect(separator).toHaveTextContent("Optional");
};

export const playFieldSet = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const fieldSet = canvasElement.querySelector('[data-slot="field-set"]');
  await expect(fieldSet?.tagName).toBe("FIELDSET");

  await expect(canvas.getByText("Shipping address")).toBeInTheDocument();
  await expect(
    canvas.getByText("Where should we send your order?"),
  ).toBeInTheDocument();
  await expect(canvas.getByLabelText("Street")).toBeInTheDocument();
  await expect(canvas.getByLabelText("City")).toBeInTheDocument();
};

export const playWithTitle = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const title = canvas.getByText("Marketing emails");
  await expect(title).toHaveAttribute("data-slot", "field-label");
  await expect(
    canvas.getByText("Receive tips, product updates, and offers."),
  ).toBeInTheDocument();

  const switchEl = canvas.getByRole("switch");
  await expect(switchEl).toHaveAttribute("aria-checked", "false");

  await userEvent.click(switchEl);
  await expect(switchEl).toHaveAttribute("aria-checked", "true");
};
