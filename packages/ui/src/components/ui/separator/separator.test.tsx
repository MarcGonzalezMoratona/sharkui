import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./separator";

describe("Separator", () => {
  it("renders a div with the separator slot and role", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator).toBeInTheDocument();
    expect(separator.tagName).toBe("DIV");
    expect(separator).toHaveAttribute("data-slot", "separator");
  });

  it("defaults to a horizontal orientation", () => {
    render(<Separator />);

    const separator = screen.getByRole("separator");

    expect(separator).toHaveAttribute("data-orientation", "horizontal");
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("applies the vertical orientation", () => {
    render(<Separator orientation="vertical" />);

    const separator = screen.getByRole("separator");

    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies the base classes", () => {
    render(<Separator />);

    expect(screen.getByRole("separator")).toHaveClass("shrink-0", "bg-border");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Separator className="my-4" />);

    expect(screen.getByRole("separator")).toHaveClass(
      "shrink-0",
      "bg-border",
      "my-4",
    );
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Separator aria-label="Section divider" />);

    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-label",
      "Section divider",
    );
  });

  it("renders as a custom element via the render prop", () => {
    render(<Separator render={<hr />} />);

    const separator = screen.getByRole("separator");

    expect(separator.tagName).toBe("HR");
    expect(separator).toHaveAttribute("data-slot", "separator");
    expect(separator).toHaveClass("shrink-0", "bg-border");
  });
});
