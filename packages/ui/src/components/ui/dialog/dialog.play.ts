import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { Dialog } from "./dialog";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Dialog>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /open dialog/i });

  await expect(trigger).toHaveAttribute("data-slot", "dialog-trigger");
  await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await userEvent.click(trigger);

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toHaveAttribute("data-slot", "dialog-content");
  await expect(screen.getByText("Dialog title")).toBeInTheDocument();
  await expect(
    screen.getByText(/click outside, press escape/i),
  ).toBeInTheDocument();

  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};

export const playEditProfile = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /edit profile/i });

  await userEvent.click(trigger);

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toBeInTheDocument();

  const name = screen.getByDisplayValue("Marc González");
  await userEvent.clear(name);
  await userEvent.type(name, "Marc GM");
  await expect(name).toHaveValue("Marc GM");

  await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};

export const playConfirmDelete = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /delete account/i }));

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toHaveAttribute("data-slot", "dialog-content");
  await expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: /^delete$/i }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};

export const playWithoutCloseButton = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /^open$/i }));

  const content = await waitFor(() => screen.getByRole("dialog"));
  await expect(content).toBeInTheDocument();
  await expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: /got it/i }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};
