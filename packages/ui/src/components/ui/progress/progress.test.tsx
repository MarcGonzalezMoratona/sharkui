import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress, ProgressLabel, ProgressValue } from "./progress";

describe("Progress", () => {
  it("renders a progressbar with the progress slot", () => {
    render(<Progress value={60} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("data-slot", "progress");
  });

  it("renders the track and indicator slots", () => {
    render(<Progress value={60} />);

    const progress = screen.getByRole("progressbar");

    expect(
      progress.querySelector('[data-slot="progress-track"]'),
    ).toBeInTheDocument();
    expect(
      progress.querySelector('[data-slot="progress-indicator"]'),
    ).toBeInTheDocument();
  });

  it("exposes the value through aria attributes", () => {
    render(<Progress value={60} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuenow", "60");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
  });

  it("marks the progressing state for an in-between value", () => {
    render(<Progress value={60} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("data-progressing");
    expect(progress).not.toHaveAttribute("data-complete");
    expect(progress).not.toHaveAttribute("data-indeterminate");
  });

  it("marks the complete state when the value reaches the max", () => {
    render(<Progress value={100} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("data-complete");
    expect(progress).toHaveAttribute("aria-valuenow", "100");
  });

  it("marks the indeterminate state when value is null", () => {
    render(<Progress value={null} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("data-indeterminate");
    expect(progress).not.toHaveAttribute("aria-valuenow");
  });

  it("respects custom min and max bounds", () => {
    render(<Progress value={25} min={0} max={50} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuenow", "25");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "50");
  });

  it("renders a label and formats the value as a percentage", () => {
    render(
      <Progress value={72}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>,
    );

    const progress = screen.getByRole("progressbar");

    expect(
      progress.querySelector('[data-slot="progress-label"]'),
    ).toHaveTextContent("Uploading");
    expect(
      progress.querySelector('[data-slot="progress-value"]'),
    ).toHaveTextContent("72%");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Progress value={60} className="custom-class" />);

    expect(screen.getByRole("progressbar")).toHaveClass("custom-class", "flex");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Progress value={60} aria-label="Upload progress" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Upload progress",
    );
  });
});
