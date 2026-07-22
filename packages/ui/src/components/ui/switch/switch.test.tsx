import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./switch";

describe("Switch", () => {
  it("renders a switch with the switch slot", () => {
    render(<Switch />);

    const switchEl = screen.getByRole("switch");

    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute("data-slot", "switch");
  });

  it("renders the thumb slot", () => {
    render(<Switch />);

    expect(
      screen.getByRole("switch").querySelector('[data-slot="switch-thumb"]'),
    ).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Switch />);

    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-checked", "false");
    expect(switchEl).toHaveAttribute("data-unchecked");
  });

  it("renders checked when defaultChecked is set", () => {
    render(<Switch defaultChecked />);

    const switchEl = screen.getByRole("switch");

    expect(switchEl).toHaveAttribute("aria-checked", "true");
    expect(switchEl).toHaveAttribute("data-checked");
  });

  it("toggles when clicked (uncontrolled)", () => {
    render(<Switch />);

    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-checked", "false");

    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute("aria-checked", "true");

    fireEvent.click(switchEl);
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  it("calls onCheckedChange with the next value", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);

    fireEvent.click(screen.getByRole("switch"));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("respects the controlled checked prop", () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked onCheckedChange={onCheckedChange} />);

    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-checked", "true");

    fireEvent.click(switchEl);

    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything());
    expect(switchEl).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);

    const switchEl = screen.getByRole("switch");
    expect(switchEl).toHaveAttribute("aria-disabled", "true");
    expect(switchEl).toHaveAttribute("data-disabled");

    fireEvent.click(switchEl);

    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  it("applies the default size data attribute", () => {
    render(<Switch />);

    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "default");
  });

  it("applies the sm size data attribute", () => {
    render(<Switch size="sm" />);

    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "sm");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Switch className="custom-class" />);

    expect(screen.getByRole("switch")).toHaveClass("custom-class", "peer");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Switch aria-label="Airplane mode" />);

    expect(screen.getByRole("switch")).toHaveAttribute(
      "aria-label",
      "Airplane mode",
    );
  });
});
