import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function renderDialog(props?: React.ComponentProps<typeof Dialog>) {
  return render(
    <Dialog {...props}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>,
  );
}

describe("Dialog", () => {
  it("renders a trigger with the dialog-trigger slot", () => {
    renderDialog();

    const trigger = screen.getByRole("button", { name: "Open" });

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-slot", "dialog-trigger");
  });

  it("does not render the content while closed", () => {
    renderDialog();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the content when the trigger is clicked", async () => {
    renderDialog();

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("renders the content with the dialog-content slot when open", () => {
    renderDialog({ open: true });

    const content = screen.getByRole("dialog");

    expect(content).toHaveAttribute("data-slot", "dialog-content");
    expect(content).toHaveClass("bg-popover", "rounded-xl");
  });

  it("renders the overlay with the dialog-overlay slot when open", () => {
    renderDialog({ open: true });

    expect(
      document.querySelector('[data-slot="dialog-overlay"]'),
    ).toBeInTheDocument();
  });

  it("wires the title and description for accessibility", () => {
    renderDialog({ open: true });

    const content = screen.getByRole("dialog");
    const title = screen.getByText("Dialog title");
    const description = screen.getByText("Dialog description");

    expect(title).toHaveAttribute("data-slot", "dialog-title");
    expect(description).toHaveAttribute("data-slot", "dialog-description");
    expect(content).toHaveAttribute("aria-labelledby", title.id);
    expect(content).toHaveAttribute("aria-describedby", description.id);
  });

  it("renders the header with the dialog-header slot", () => {
    renderDialog({ open: true });

    expect(
      document.querySelector('[data-slot="dialog-header"]'),
    ).toBeInTheDocument();
  });

  it("renders a close button by default", () => {
    renderDialog({ open: true });

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("hides the close button when showCloseButton is false", () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });

  it("calls onOpenChange when the trigger is clicked", () => {
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("closes the dialog when the close button is clicked", async () => {
    const onOpenChange = vi.fn();
    renderDialog({ defaultOpen: true, onOpenChange });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("closes the dialog when Escape is pressed", async () => {
    const onOpenChange = vi.fn();
    renderDialog({ defaultOpen: true, onOpenChange });

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("respects the controlled open prop", () => {
    renderDialog({ open: true });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("merges a custom className on the content without dropping base classes", () => {
    render(
      <Dialog open>
        <DialogContent className="custom-class">
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toHaveClass("custom-class", "bg-popover");
  });

  it("forwards arbitrary props to the content", () => {
    render(
      <Dialog open>
        <DialogContent aria-label="Settings dialog">
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Settings dialog",
    );
  });
});

describe("DialogHeader", () => {
  it("renders with the dialog-header slot and merges className", () => {
    render(<DialogHeader className="custom-class">Header</DialogHeader>);

    const header = screen.getByText("Header");

    expect(header).toHaveAttribute("data-slot", "dialog-header");
    expect(header).toHaveClass("custom-class", "flex");
  });
});

describe("DialogFooter", () => {
  it("renders with the dialog-footer slot and merges className", () => {
    render(<DialogFooter className="custom-class">Footer</DialogFooter>);

    const footer = screen.getByText("Footer");

    expect(footer).toHaveAttribute("data-slot", "dialog-footer");
    expect(footer).toHaveClass("custom-class", "flex");
  });

  it("renders a Close action when showCloseButton is true", () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});

describe("DialogTitle", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle className="custom-class">Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Title")).toHaveClass("custom-class", "font-medium");
  });
});

describe("DialogDescription", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription className="custom-class">
            Description
          </DialogDescription>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Description")).toHaveClass(
      "custom-class",
      "text-muted-foreground",
    );
  });
});

describe("DialogClose", () => {
  it("closes the dialog when a custom close action is clicked", async () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter>
            <DialogClose render={<Button>Cancel</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
