import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { Tooltip } from "./tooltip";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Tooltip>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /hover me/i });

  await userEvent.hover(trigger);
  const content = await waitFor(() => screen.getByText("Add to library"));
  await expect(content).toBeInTheDocument();

  await userEvent.unhover(trigger);
  await waitFor(() =>
    expect(screen.queryByText("Add to library")).not.toBeInTheDocument(),
  );
};

export const playKeyboard = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /save/i });

  await userEvent.tab();
  await expect(trigger).toHaveFocus();
  const content = await waitFor(() => screen.getByText(/save changes/i));
  await expect(content).toBeInTheDocument();
};

export const playOpen = async () => {
  const content = await waitFor(() => screen.getByText("Open by default"));
  await expect(content).toBeInTheDocument();
};
