import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders a checkbox with the checkbox slot", () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
  });

  it("is unchecked by default", () => {
    render(<Checkbox />);

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("renders checked when defaultChecked is set", () => {
    render(<Checkbox defaultChecked />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveAttribute("data-checked");
    expect(checkbox.querySelector("svg")).toBeInTheDocument();
  });

  it("toggles when clicked (uncontrolled)", () => {
    render(<Checkbox />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "false");

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");

    fireEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("calls onCheckedChange with the next value", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("respects the controlled checked prop", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox checked onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "true");

    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything());
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-disabled", "true");
    expect(checkbox).toHaveAttribute("data-disabled");

    fireEvent.click(checkbox);

    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("renders the indeterminate state as mixed", () => {
    render(<Checkbox indeterminate />);

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "mixed",
    );
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Checkbox className="custom-class" />);

    expect(screen.getByRole("checkbox")).toHaveClass("custom-class", "peer");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Checkbox aria-label="Accept terms" />);

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-label",
      "Accept terms",
    );
  });
});
