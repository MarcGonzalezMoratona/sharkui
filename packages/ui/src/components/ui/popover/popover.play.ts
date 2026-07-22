import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { Popover } from "./popover";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Popover>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /open popover/i });

  await expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
  await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(trigger);

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toHaveAttribute("data-slot", "popover-content");
  await expect(screen.getByText("Popover title")).toBeInTheDocument();
  await expect(
    screen.getByText(/lightweight, contextual content/i),
  ).toBeInTheDocument();

  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};

export const playDimensions = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /dimensions/i });

  await userEvent.click(trigger);

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toBeInTheDocument();
  await expect(screen.getByText("Set the dimensions for the layer.")).toBeInTheDocument();

  const width = screen.getByLabelText("Width");
  await userEvent.clear(width);
  await userEvent.type(width, "480px");
  await expect(width).toHaveValue("480px");
};

export const playSides = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: "top" }));

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toHaveAttribute("data-slot", "popover-content");
  await expect(screen.getByText("Side: top")).toBeInTheDocument();
};
