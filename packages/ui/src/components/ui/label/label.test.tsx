import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Label } from "./label";

describe("Label", () => {
  it("renders its children", () => {
    render(<Label>Email</Label>);

    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders a label element with the label slot", () => {
    render(<Label>Email</Label>);

    const label = screen.getByText("Email");

    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("data-slot", "label");
    expect(label).toHaveClass("font-medium");
  });

  it("associates with a control via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );

    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Label className="custom-class">Merged</Label>);

    expect(screen.getByText("Merged")).toHaveClass(
      "custom-class",
      "font-medium",
    );
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Label id="terms-label">Terms</Label>);

    expect(screen.getByText("Terms")).toHaveAttribute("id", "terms-label");
  });
});
