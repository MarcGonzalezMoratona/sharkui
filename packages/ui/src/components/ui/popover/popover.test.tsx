import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

function renderPopover(props?: React.ComponentProps<typeof Popover>) {
  return render(
    <Popover {...props}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover title</PopoverTitle>
          <PopoverDescription>Popover description</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>,
  );
}

describe("Popover", () => {
  it("renders a trigger with the popover-trigger slot", () => {
    renderPopover();

    const trigger = screen.getByRole("button", { name: "Open" });

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
  });

  it("does not render the content while closed", () => {
    renderPopover();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the content when the trigger is clicked", async () => {
    renderPopover();

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("renders the content with the popover-content slot when open", () => {
    renderPopover({ open: true });

    const content = screen.getByRole("dialog");

    expect(content).toHaveAttribute("data-slot", "popover-content");
    expect(content).toHaveClass("bg-popover", "rounded-lg");
  });

  it("wires the title and description for accessibility", () => {
    renderPopover({ open: true });

    const content = screen.getByRole("dialog");
    const title = screen.getByText("Popover title");
    const description = screen.getByText("Popover description");

    expect(title).toHaveAttribute("data-slot", "popover-title");
    expect(description).toHaveAttribute("data-slot", "popover-description");
    expect(content).toHaveAttribute("aria-labelledby", title.id);
    expect(content).toHaveAttribute("aria-describedby", description.id);
  });

  it("renders the header with the popover-header slot", () => {
    renderPopover({ open: true });

    expect(
      document.querySelector('[data-slot="popover-header"]'),
    ).toBeInTheDocument();
  });

  it("calls onOpenChange when the trigger is clicked", () => {
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("closes the popover when the trigger is toggled", async () => {
    const onOpenChange = vi.fn();
    renderPopover({ defaultOpen: true, onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("respects the controlled open prop", () => {
    renderPopover({ open: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("merges a custom className on the content without dropping base classes", () => {
    render(
      <Popover open>
        <PopoverContent className="custom-class">
          <PopoverTitle>Title</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByRole("dialog")).toHaveClass(
      "custom-class",
      "bg-popover",
    );
  });

  it("forwards arbitrary props to the content", () => {
    render(
      <Popover open>
        <PopoverContent aria-label="Settings panel">
          <PopoverTitle>Title</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Settings panel",
    );
  });
});

describe("PopoverHeader", () => {
  it("renders with the popover-header slot and merges className", () => {
    render(<PopoverHeader className="custom-class">Header</PopoverHeader>);

    const header = screen.getByText("Header");

    expect(header).toHaveAttribute("data-slot", "popover-header");
    expect(header).toHaveClass("custom-class", "flex");
  });
});

describe("PopoverTitle", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Popover open>
        <PopoverContent>
          <PopoverTitle className="custom-class">Title</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByText("Title")).toHaveClass(
      "custom-class",
      "font-medium",
    );
  });
});

describe("PopoverDescription", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Popover open>
        <PopoverContent>
          <PopoverTitle>Title</PopoverTitle>
          <PopoverDescription className="custom-class">
            Description
          </PopoverDescription>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.getByText("Description")).toHaveClass(
      "custom-class",
      "text-muted-foreground",
    );
  });
});
