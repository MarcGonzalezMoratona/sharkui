import type { StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import type { Avatar } from "./avatar";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Avatar>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const avatar = canvasElement.querySelector('[data-slot="avatar"]');
  await expect(avatar).toBeInTheDocument();
  await expect(avatar).toHaveAttribute("data-size", "default");

  const image = await canvas.findByAltText("Marc Gonzalez");
  await expect(image).toHaveAttribute("data-slot", "avatar-image");
};

export const playFallback = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const fallback = await canvas.findByText("MG");
  await expect(fallback).toHaveAttribute("data-slot", "avatar-fallback");
  await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
};

export const playSizes = async ({ canvasElement }: PlayContext) => {
  const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');

  await expect(avatars).toHaveLength(3);
  await expect(avatars[0]).toHaveAttribute("data-size", "sm");
  await expect(avatars[1]).toHaveAttribute("data-size", "default");
  await expect(avatars[2]).toHaveAttribute("data-size", "lg");
};

export const playWithStatusBadge = async ({ canvasElement }: PlayContext) => {
  const avatar = canvasElement.querySelector('[data-slot="avatar"]');
  await expect(avatar).toBeInTheDocument();

  const badge = canvasElement.querySelector('[data-slot="avatar-badge"]');
  await expect(badge).toBeInTheDocument();
  await expect(badge).toHaveClass("bg-green-500");
};

export const playGroup = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const group = canvasElement.querySelector('[data-slot="avatar-group"]');
  await expect(group).toBeInTheDocument();

  await waitFor(async () => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars).toHaveLength(3);
  });

  const count = canvas.getByText("+5");
  await expect(count).toHaveAttribute("data-slot", "avatar-group-count");
};
