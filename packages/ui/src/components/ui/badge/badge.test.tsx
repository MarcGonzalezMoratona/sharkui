import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, badgeVariants } from "./badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders a span with the badge slot by default", () => {
    render(<Badge>Default</Badge>);

    const badge = screen.getByText("Default");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-variant", "default");
    expect(badge).toHaveClass("bg-primary");
  });

  it.each([
    ["secondary", "bg-secondary"],
    ["destructive", "text-destructive"],
    ["outline", "border-border"],
    ["ghost", "hover:bg-muted"],
    ["link", "text-primary"],
  ] as const)("applies the %s variant", (variant, expectedClass) => {
    render(<Badge variant={variant}>Variant</Badge>);

    const badge = screen.getByText("Variant");

    expect(badge).toHaveAttribute("data-variant", variant);
    expect(badge).toHaveClass(expectedClass);
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Badge className="custom-class">Merged</Badge>);

    const badge = screen.getByText("Merged");

    expect(badge).toHaveClass("custom-class", "bg-primary");
  });

  it("renders as a custom element via the render prop", () => {
    render(
      <Badge render={<a href="/profile" />} variant="link">
        Profile
      </Badge>,
    );

    const badge = screen.getByRole("link", { name: "Profile" });

    expect(badge).toHaveAttribute("href", "/profile");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveClass("text-primary");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Badge aria-invalid>Invalid</Badge>);

    expect(screen.getByText("Invalid")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("badgeVariants", () => {
  it("returns the default variant classes", () => {
    expect(badgeVariants()).toContain("bg-primary");
  });

  it("reflects an explicit variant", () => {
    expect(badgeVariants({ variant: "destructive" })).toContain(
      "text-destructive",
    );
  });
});
