import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { Toaster } from "./toast";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Toaster>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /show toast/i }));

  const toastEl = await waitFor(() =>
    screen.getByText("Event has been created"),
  );

  await expect(toastEl).toBeInTheDocument();
};

export const playVariants = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /^success$/i }));

  await waitFor(() =>
    expect(screen.getByText("Changes saved successfully")).toBeInTheDocument(),
  );
};

export const playWithAction = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /show toast/i }));

  const undo = await waitFor(() =>
    screen.getByRole("button", { name: /undo/i }),
  );

  await userEvent.click(undo);

  await waitFor(() => expect(screen.getByText("Undone")).toBeInTheDocument());
};
