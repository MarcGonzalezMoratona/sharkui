import type { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import type { Card } from "./card";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Card>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText("Team members")).toBeInTheDocument();
  await expect(
    canvas.getByText(
      "Invite your colleagues to collaborate on this workspace.",
    ),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole("button", { name: "More options" }),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole("button", { name: "Cancel" }),
  ).toBeInTheDocument();
  await expect(
    canvas.getByRole("button", { name: "Invite" }),
  ).toBeInTheDocument();
};

export const playSmall = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText("Compact card")).toBeInTheDocument();

  const card = canvasElement.querySelector('[data-slot="card"]');

  await expect(card).toHaveAttribute("data-size", "sm");
};

export const playStat = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText("Total revenue")).toBeInTheDocument();
  await expect(canvas.getByText("$45,231.89")).toBeInTheDocument();
  await expect(canvas.getByText("+20.1% from last month")).toBeInTheDocument();
};

export const playWithLinkAction = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText("Documentation")).toBeInTheDocument();
  await expect(
    canvas.getByRole("button", { name: "Open" }),
  ).toBeInTheDocument();
};
