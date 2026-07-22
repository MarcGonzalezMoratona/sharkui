import type { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import type { Tabs } from "./tabs";

type PlayContext = Parameters<NonNullable<StoryObj<typeof Tabs>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const tablist = canvas.getByRole("tablist");
  await expect(tablist).toHaveAttribute("data-slot", "tabs-list");

  const account = canvas.getByRole("tab", { name: "Account" });
  const password = canvas.getByRole("tab", { name: "Password" });

  await expect(account).toHaveAttribute("aria-selected", "true");
  await expect(account).toHaveAttribute("data-active");
  await expect(
    canvas.getByText(/Make changes to your account here/),
  ).toBeInTheDocument();

  await userEvent.click(password);
  await expect(password).toHaveAttribute("aria-selected", "true");
  await expect(account).toHaveAttribute("aria-selected", "false");
  await expect(
    canvas.getByText(/Change your password here/),
  ).toBeInTheDocument();
};

export const playKeyboardNavigation = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const account = canvas.getByRole("tab", { name: "Account" });
  const password = canvas.getByRole("tab", { name: "Password" });

  account.focus();
  await expect(account).toHaveFocus();

  await userEvent.keyboard("{ArrowRight}");
  await expect(password).toHaveFocus();
  await expect(password).toHaveAttribute("aria-selected", "true");

  await userEvent.keyboard("{ArrowLeft}");
  await expect(account).toHaveFocus();
  await expect(account).toHaveAttribute("aria-selected", "true");
};

export const playLineVariant = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const tablist = canvas.getByRole("tablist");
  await expect(tablist).toHaveAttribute("data-variant", "line");

  const analytics = canvas.getByRole("tab", { name: "Analytics" });

  await userEvent.click(analytics);
  await expect(analytics).toHaveAttribute("aria-selected", "true");
  await expect(
    canvas.getByText("Detailed charts and metrics for the current period."),
  ).toBeInTheDocument();
};

export const playVertical = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  const tabs = canvasElement.querySelector('[data-slot="tabs"]');
  await expect(tabs).toHaveAttribute("data-orientation", "vertical");

  const security = canvas.getByRole("tab", { name: "Security" });

  await userEvent.click(security);
  await expect(security).toHaveAttribute("aria-selected", "true");
  await expect(
    canvas.getByText("Sessions, devices, and access controls."),
  ).toBeInTheDocument();
};
