import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { Select } from "./select";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Select>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("combobox");

  await expect(trigger).toHaveAttribute("data-slot", "select-trigger");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(canvas.getByText("Select a fruit")).toBeInTheDocument();

  await userEvent.click(trigger);

  const listbox = await waitFor(() => screen.getByRole("listbox"));
  await expect(
    listbox.closest('[data-slot="select-content"]'),
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole("option", { name: "Banana" }));

  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
  );
  await expect(trigger).toHaveTextContent("banana");
};

export const playWithGroups = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("combobox"));

  await waitFor(() => screen.getByRole("listbox"));
  await expect(screen.getByText("Fruits")).toHaveAttribute(
    "data-slot",
    "select-label",
  );
  await expect(screen.getByText("Vegetables")).toBeInTheDocument();

  await userEvent.click(screen.getByRole("option", { name: "Carrot" }));

  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
  );
  await expect(canvas.getByRole("combobox")).toHaveTextContent("carrot");
};

export const playDisabledItem = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("combobox"));

  await waitFor(() => screen.getByRole("listbox"));

  const disabled = screen.getByRole("option", {
    name: /Enterprise/,
  });
  await expect(disabled).toHaveAttribute("data-disabled");
  await expect(disabled).toHaveAttribute("aria-disabled", "true");
  await userEvent.click(screen.getByRole("option", { name: "Pro" }));

  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
  );
  await expect(canvas.getByRole("combobox")).toHaveTextContent("pro");
};

export const playPreselected = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("combobox");

  await expect(trigger).toHaveTextContent("banana");

  await userEvent.click(trigger);

  const selected = await waitFor(() =>
    screen.getByRole("option", { name: "Banana" }),
  );
  await expect(selected).toHaveAttribute("data-selected");
};
