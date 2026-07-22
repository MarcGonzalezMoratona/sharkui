import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a div with the skeleton slot", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton.tagName).toBe("DIV");
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies the base classes", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-muted",
    );
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Skeleton className="h-4 w-48" data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-muted",
      "h-4",
      "w-48",
    );
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Skeleton aria-label="Loading" role="status" />);

    const skeleton = screen.getByRole("status");

    expect(skeleton).toHaveAttribute("aria-label", "Loading");
  });

  it("renders children when provided", () => {
    render(
      <Skeleton data-testid="skeleton">
        <span>child</span>
      </Skeleton>,
    );

    expect(screen.getByText("child")).toBeInTheDocument();
  });
});
