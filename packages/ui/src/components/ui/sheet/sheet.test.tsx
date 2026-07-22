import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

function renderSheet(props?: React.ComponentProps<typeof Sheet>) {
  return render(
    <Sheet {...props}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your details.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>Done</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>,
  );
}

describe("Sheet", () => {
  it("does not render the content while closed", () => {
    renderSheet();

    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the content when the trigger is clicked", async () => {
    renderSheet();

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("renders the content with the sheet-content slot when open", () => {
    renderSheet({ open: true });

    const content = screen.getByRole("dialog");

    expect(content).toHaveAttribute("data-slot", "sheet-content");
    expect(content).toHaveClass("fixed", "z-50");
  });

  it("defaults to the right side", () => {
    renderSheet({ open: true });

    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "right");
  });

  it.each(["top", "right", "bottom", "left"] as const)(
    "reflects the %s side on the content",
    (side) => {
      render(
        <Sheet open>
          <SheetContent side={side}>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetContent>
        </Sheet>,
      );

      expect(screen.getByRole("dialog")).toHaveAttribute("data-side", side);
    },
  );

  it("renders the overlay with the sheet-overlay slot", () => {
    renderSheet({ open: true });

    expect(
      document.querySelector('[data-slot="sheet-overlay"]'),
    ).toBeInTheDocument();
  });

  it("wires the title and description for accessibility", () => {
    renderSheet({ open: true });

    const content = screen.getByRole("dialog");
    const title = screen.getByRole("heading", { name: "Edit profile" });
    const description = screen.getByText("Update your details.");

    expect(title).toHaveAttribute("data-slot", "sheet-title");
    expect(description).toHaveAttribute("data-slot", "sheet-description");
    expect(content).toHaveAttribute("aria-labelledby", title.id);
    expect(content).toHaveAttribute("aria-describedby", description.id);
  });

  it("renders a close button with an accessible name by default", () => {
    renderSheet({ open: true });

    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute(
      "data-slot",
      "sheet-close",
    );
  });

  it("hides the default close button when showCloseButton is false", () => {
    render(
      <Sheet open>
        <SheetContent showCloseButton={false}>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("calls onOpenChange when the trigger is clicked", () => {
    const onOpenChange = vi.fn();
    renderSheet({ onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("closes the sheet when the close button is clicked", async () => {
    const onOpenChange = vi.fn();
    renderSheet({ defaultOpen: true, onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("merges a custom className on the content without dropping base classes", () => {
    render(
      <Sheet open>
        <SheetContent className="custom-class">
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByRole("dialog")).toHaveClass("custom-class", "fixed");
  });
});

describe("SheetHeader", () => {
  it("renders with the sheet-header slot and merges className", () => {
    render(<SheetHeader className="custom-class">Header</SheetHeader>);

    const header = screen.getByText("Header");

    expect(header).toHaveAttribute("data-slot", "sheet-header");
    expect(header).toHaveClass("custom-class", "flex");
  });
});

describe("SheetFooter", () => {
  it("renders with the sheet-footer slot and merges className", () => {
    render(<SheetFooter className="custom-class">Footer</SheetFooter>);

    const footer = screen.getByText("Footer");

    expect(footer).toHaveAttribute("data-slot", "sheet-footer");
    expect(footer).toHaveClass("custom-class", "mt-auto");
  });
});

describe("SheetTitle", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Sheet open>
        <SheetContent showCloseButton={false}>
          <SheetTitle className="custom-class">Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
      "custom-class",
      "font-medium",
    );
  });
});

describe("SheetDescription", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Sheet open>
        <SheetContent showCloseButton={false}>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription className="custom-class">
            Description
          </SheetDescription>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByText("Description")).toHaveClass(
      "custom-class",
      "text-muted-foreground",
    );
  });
});
