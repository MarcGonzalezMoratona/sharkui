import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Accordion } from "./accordion";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof Accordion>["play"]>
>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const first = canvas.getByRole("button", { name: "What is Shark UI?" });
  const second = canvas.getByRole("button", { name: "Is it accessible?" });

  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(second).toHaveAttribute("aria-expanded", "false");
  await expect(
    canvas.getByText(/A component library built on Base UI/),
  ).toBeInTheDocument();

  await userEvent.click(second);
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(
    canvas.getByText(/It follows the WAI-ARIA design pattern/),
  ).toBeInTheDocument();
};

export const playMultiple = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const first = canvas.getByRole("button", { name: "Shipping" });
  const second = canvas.getByRole("button", { name: "Returns" });

  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(second).toHaveAttribute("aria-expanded", "true");

  await userEvent.click(first);
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(second).toHaveAttribute("aria-expanded", "true");
};

export const playDisabled = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const disabled = canvas.getByRole("button", { name: "Enterprise plan" });

  await expect(disabled).toHaveAttribute("data-disabled");
  await expect(disabled).toHaveAttribute("aria-expanded", "false");

  await userEvent.click(disabled, { pointerEventsCheck: 0 });
  await expect(disabled).toHaveAttribute("aria-expanded", "false");
};

export const playKeyboard = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const first = canvas.getByRole("button", { name: "Step one" });
  const second = canvas.getByRole("button", { name: "Step two" });

  first.focus();
  await expect(first).toHaveFocus();

  await userEvent.keyboard("{Enter}");
  await expect(first).toHaveAttribute("aria-expanded", "false");

  await userEvent.keyboard(" ");
  await expect(first).toHaveAttribute("aria-expanded", "true");

  await userEvent.tab();
  await expect(second).toHaveFocus();

  await userEvent.keyboard("{Enter}");
  await expect(second).toHaveAttribute("aria-expanded", "true");
};
