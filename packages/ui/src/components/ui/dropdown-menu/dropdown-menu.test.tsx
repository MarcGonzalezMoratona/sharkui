import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function renderMenu(props?: React.ComponentProps<typeof DropdownMenu>) {
  return render(
    <DropdownMenu {...props}>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
}

describe("DropdownMenu", () => {
  it("renders a trigger with the dropdown-menu-trigger slot", () => {
    renderMenu();

    const trigger = screen.getByRole("button", { name: "Open" });

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-slot", "dropdown-menu-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
  });

  it("does not render the content while closed", () => {
    renderMenu();

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the content when the trigger is clicked", async () => {
    renderMenu();

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByRole("menu")).toBeInTheDocument();
  });

  it("renders the content with the dropdown-menu-content slot when open", () => {
    renderMenu({ open: true });

    const content = screen.getByRole("menu");

    expect(content).toHaveAttribute("data-slot", "dropdown-menu-content");
    expect(content).toHaveClass("bg-popover", "rounded-lg");
  });

  it("renders items with the dropdown-menu-item slot and menuitem role", () => {
    renderMenu({ open: true });

    const profile = screen.getByRole("menuitem", { name: "Profile" });

    expect(profile).toHaveAttribute("data-slot", "dropdown-menu-item");
  });

  it("flags a destructive item with data-variant", () => {
    renderMenu({ open: true });

    expect(screen.getByRole("menuitem", { name: "Log out" })).toHaveAttribute(
      "data-variant",
      "destructive",
    );
  });

  it("renders the label, group and separator slots when open", () => {
    renderMenu({ open: true });

    expect(screen.getByText("My Account")).toHaveAttribute(
      "data-slot",
      "dropdown-menu-label",
    );
    expect(
      document.querySelector('[data-slot="dropdown-menu-group"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="dropdown-menu-separator"]'),
    ).toBeInTheDocument();
  });

  it("calls onOpenChange when the trigger is clicked", () => {
    const onOpenChange = vi.fn();
    renderMenu({ onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("closes the menu when an item is selected", async () => {
    const onOpenChange = vi.fn();
    renderMenu({ defaultOpen: true, onOpenChange });

    fireEvent.click(screen.getByRole("menuitem", { name: "Profile" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("closes the menu when Escape is pressed", async () => {
    const onOpenChange = vi.fn();
    renderMenu({ defaultOpen: true, onOpenChange });

    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("respects the controlled open prop", () => {
    renderMenu({ open: true });

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("merges a custom className on the content without dropping base classes", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent className="custom-class">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByRole("menu")).toHaveClass("custom-class", "bg-popover");
  });

  it("forwards arbitrary props to the content", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent aria-label="Account menu">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByRole("menu")).toHaveAttribute(
      "aria-label",
      "Account menu",
    );
  });
});

describe("DropdownMenuItem", () => {
  it("adds data-inset when inset is set", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByRole("menuitem", { name: "Item" })).toHaveAttribute(
      "data-inset",
      "true",
    );
  });

  it("marks a disabled item and does not fire its handler", () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onClick={onSelect}>
            Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const item = screen.getByRole("menuitem", { name: "Item" });
    fireEvent.click(item);

    expect(item).toHaveAttribute("data-disabled");
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuItem className="custom-class">Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByRole("menuitem", { name: "Item" })).toHaveClass(
      "custom-class",
      "rounded-md",
    );
  });
});

describe("DropdownMenuLabel", () => {
  it("adds data-inset when inset is set", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Section</DropdownMenuLabel>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("Section")).toHaveAttribute("data-inset", "true");
  });
});

describe("DropdownMenuCheckboxItem", () => {
  it("renders with the checkbox slot and menuitemcheckbox role", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show bar</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const item = screen.getByRole("menuitemcheckbox", { name: "Show bar" });

    expect(item).toHaveAttribute("data-slot", "dropdown-menu-checkbox-item");
    expect(item).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCheckedChange when toggled", () => {
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Show bar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "Show bar" }));

    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });
});

describe("DropdownMenuRadioGroup", () => {
  it("renders radio items and marks the selected one", () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="bottom">
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const top = screen.getByRole("menuitemradio", { name: "Top" });
    const bottom = screen.getByRole("menuitemradio", { name: "Bottom" });

    expect(top).toHaveAttribute("data-slot", "dropdown-menu-radio-item");
    expect(top).toHaveAttribute("aria-checked", "false");
    expect(bottom).toHaveAttribute("aria-checked", "true");
  });

  it("calls onValueChange when a radio item is selected", () => {
    const onValueChange = vi.fn();
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="bottom" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    fireEvent.click(screen.getByRole("menuitemradio", { name: "Top" }));

    expect(onValueChange).toHaveBeenCalledWith("top", expect.anything());
  });
});

describe("DropdownMenuShortcut", () => {
  it("renders with the shortcut slot and merges className", () => {
    render(
      <DropdownMenuShortcut className="custom-class">⌘S</DropdownMenuShortcut>,
    );

    const shortcut = screen.getByText("⌘S");

    expect(shortcut).toHaveAttribute("data-slot", "dropdown-menu-shortcut");
    expect(shortcut).toHaveClass("custom-class", "ml-auto");
  });
});

describe("DropdownMenuSub", () => {
  it("opens the submenu content when the sub trigger is clicked", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email link</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const subTrigger = screen.getByText("Share");
    expect(subTrigger).toHaveAttribute(
      "data-slot",
      "dropdown-menu-sub-trigger",
    );

    fireEvent.click(subTrigger);

    expect(
      await screen.findByRole("menuitem", { name: "Email link" }),
    ).toBeInTheDocument();
  });
});
