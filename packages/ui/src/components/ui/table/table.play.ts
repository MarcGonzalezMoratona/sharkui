import type { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import type { Table } from "./table";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Table>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText("A list of your recent invoices."),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole("columnheader", { name: "Invoice" }),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole("cell", { name: "INV001" }),
  ).toBeInTheDocument();
  await expect(canvas.getByText("Total")).toBeInTheDocument();
  await expect(canvas.getByText("$1,750.00")).toBeInTheDocument();

  await expect(canvas.getAllByRole("row")).toHaveLength(7);
};

export const playWithSelectedRow = async ({ canvasElement }: PlayContext) => {
  const selected = canvasElement.querySelector('[data-state="selected"]');

  await expect(selected).not.toBeNull();
  await expect(selected).toHaveAttribute("data-slot", "table-row");
  await expect(
    within(selected as HTMLElement).getByText("INV002"),
  ).toBeInTheDocument();
};
