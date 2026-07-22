import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders its children as an accessible button", () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies the default variant and size classes", () => {
    render(<Button>Default</Button>);

    const button = screen.getByRole("button", { name: "Default" });

    expect(button).toHaveClass("bg-primary", "h-7");
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it.each([
    ["secondary", "bg-secondary"],
    ["outline", "border-border"],
    ["ghost", "hover:bg-muted"],
    ["destructive", "text-destructive"],
    ["link", "text-primary"],
  ] as const)("applies the %s variant class", (variant, expectedClass) => {
    render(<Button variant={variant}>Variant</Button>);

    expect(screen.getByRole("button", { name: "Variant" })).toHaveClass(
      expectedClass,
    );
  });

  it.each([
    ["xs", "h-5"],
    ["sm", "h-6"],
    ["lg", "h-8"],
  ] as const)("applies the %s size class", (size, expectedClass) => {
    render(<Button size={size}>Size</Button>);

    expect(screen.getByRole("button", { name: "Size" })).toHaveClass(
      expectedClass,
    );
  });

  it("forwards the disabled attribute", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Button className="custom-class">Merged</Button>);

    const button = screen.getByRole("button", { name: "Merged" });

    expect(button).toHaveClass("custom-class", "bg-primary");
  });
});

describe("buttonVariants", () => {
  it("returns the default variant and size classes", () => {
    const classes = buttonVariants();

    expect(classes).toContain("bg-primary");
    expect(classes).toContain("h-7");
  });

  it("reflects explicit variant and size", () => {
    const classes = buttonVariants({ variant: "destructive", size: "lg" });

    expect(classes).toContain("text-destructive");
    expect(classes).toContain("h-8");
  });
});
