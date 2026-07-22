import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { Sheet } from "./sheet";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Sheet>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /open sheet/i }));

  const dialog = await waitFor(() => screen.getByRole("dialog"));
  await expect(dialog).toHaveAttribute("data-side", "right");
  await expect(
    screen.getByRole("heading", { name: "Edit profile" }),
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};

export const playSides = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: "left" }));

  const dialog = await waitFor(() => screen.getByRole("dialog"));
  await expect(dialog).toHaveAttribute("data-side", "left");
  await expect(
    screen.getByRole("heading", { name: "Sheet from left" }),
  ).toBeInTheDocument();

  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};

export const playNavigation = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByRole("button", { name: /open navigation/i }),
  );

  const dialog = await waitFor(() => screen.getByRole("dialog"));
  await expect(dialog).toHaveAttribute("data-side", "left");
  await expect(
    screen.getByRole("link", { name: "Dashboard" }),
  ).toBeInTheDocument();

  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
};
