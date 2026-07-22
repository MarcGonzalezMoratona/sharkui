import type { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import type { Skeleton } from "./skeleton";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof Skeleton>["play"]>
>[0];

const getSkeletons = (canvasElement: HTMLElement) =>
  Array.from(
    canvasElement.querySelectorAll<HTMLElement>('[data-slot="skeleton"]'),
  );

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const [skeleton] = getSkeletons(canvasElement);

  await expect(skeleton).toBeInTheDocument();
  await expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
};

export const playCircle = async ({ canvasElement }: PlayContext) => {
  const [skeleton] = getSkeletons(canvasElement);

  await expect(skeleton).toBeInTheDocument();
  await expect(skeleton).toHaveClass("animate-pulse", "rounded-full");
};

export const playCardLoading = async ({ canvasElement }: PlayContext) => {
  const skeletons = getSkeletons(canvasElement);

  await expect(skeletons).toHaveLength(3);
  for (const skeleton of skeletons) {
    await expect(skeleton).toHaveClass("animate-pulse");
  }
};
