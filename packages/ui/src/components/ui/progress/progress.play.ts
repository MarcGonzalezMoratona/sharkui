import type { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import type { Progress } from "./progress";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof Progress>["play"]>
>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const progress = canvas.getByRole("progressbar");

  await expect(progress).toBeInTheDocument();
  await expect(progress).toHaveAttribute("aria-valuenow", "60");
  await expect(progress).toHaveAttribute("data-progressing");
};

export const playEmpty = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const progress = canvas.getByRole("progressbar");

  await expect(progress).toHaveAttribute("aria-valuenow", "0");
  await expect(progress).not.toHaveAttribute("data-complete");
};

export const playComplete = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const progress = canvas.getByRole("progressbar");

  await expect(progress).toHaveAttribute("aria-valuenow", "100");
  await expect(progress).toHaveAttribute("data-complete");
};

export const playIndeterminate = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const progress = canvas.getByRole("progressbar");

  await expect(progress).toHaveAttribute("data-indeterminate");
  await expect(progress).not.toHaveAttribute("aria-valuenow");
};

export const playLabeled = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const progress = canvas.getByRole("progressbar");

  await expect(canvas.getByText("Uploading")).toBeInTheDocument();
  await expect(
    progress.querySelector('[data-slot="progress-value"]'),
  ).toHaveTextContent("72%");
};
