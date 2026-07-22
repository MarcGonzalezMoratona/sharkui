import type { StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import type { DropdownMenu } from "./dropdown-menu";

type PlayContext = Parameters<
  NonNullable<StoryObj<typeof DropdownMenu>["play"]>
>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: /open menu/i });

  await expect(trigger).toHaveAttribute("data-slot", "dropdown-menu-trigger");
  await expect(screen.queryByRole("menu")).not.toBeInTheDocument();

  await userEvent.click(trigger);

  const content = await waitFor(() => screen.getByRole("menu"));
  await expect(content).toHaveAttribute("data-slot", "dropdown-menu-content");
  await expect(screen.getByText("My Account")).toBeInTheDocument();
  await expect(
    screen.getByRole("menuitem", { name: /profile/i }),
  ).toBeInTheDocument();

  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
  );
};

export const playCheckboxItems = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /view/i }));

  await waitFor(() => screen.getByRole("menu"));

  const statusBar = screen.getByRole("menuitemcheckbox", {
    name: "Status Bar",
  });
  await expect(statusBar).toHaveAttribute("aria-checked", "true");

  const activityBar = screen.getByRole("menuitemcheckbox", {
    name: "Activity Bar",
  });
  await expect(activityBar).toHaveAttribute("aria-checked", "false");

  await userEvent.click(activityBar);

  await expect(activityBar).toHaveAttribute("aria-checked", "true");
  await expect(screen.getByRole("menu")).toBeInTheDocument();
};

export const playRadioGroup = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByRole("button", { name: /panel position/i }),
  );

  await waitFor(() => screen.getByRole("menu"));

  const bottom = screen.getByRole("menuitemradio", { name: "Bottom" });
  await expect(bottom).toHaveAttribute("aria-checked", "true");

  const top = screen.getByRole("menuitemradio", { name: "Top" });
  await userEvent.click(top);

  await expect(top).toHaveAttribute("aria-checked", "true");
  await expect(bottom).toHaveAttribute("aria-checked", "false");
};

export const playWithSubmenu = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /actions/i }));

  await waitFor(() => screen.getByRole("menu"));
  await expect(
    screen.getByRole("menuitem", { name: /new tab/i }),
  ).toBeInTheDocument();

  const subTrigger = screen.getByText("Share");
  await expect(subTrigger).toHaveAttribute(
    "data-slot",
    "dropdown-menu-sub-trigger",
  );

  await userEvent.click(subTrigger);

  await expect(
    await waitFor(() => screen.getByRole("menuitem", { name: /email link/i })),
  ).toBeInTheDocument();
};

export const playKitchen = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByRole("button", { name: /all features/i }));

  const content = await waitFor(() => screen.getByRole("menu"));
  await expect(content).toHaveAttribute("data-slot", "dropdown-menu-content");
  await expect(screen.getByText("My Account")).toBeInTheDocument();

  const bookmarked = screen.getByRole("menuitemcheckbox", {
    name: "Bookmarked",
  });
  await expect(bookmarked).toHaveAttribute("aria-checked", "true");

  await userEvent.click(bookmarked);
  await expect(bookmarked).toHaveAttribute("aria-checked", "false");

  await userEvent.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
  );
};
