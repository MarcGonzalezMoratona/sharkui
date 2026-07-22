import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("renders an input with the input slot", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");

    expect(input.tagName).toBe("INPUT");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("reflects the type prop", () => {
    render(<Input type="email" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("renders a placeholder", () => {
    render(<Input placeholder="you@example.com" />);

    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("accepts user input", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });

    expect(input).toHaveValue("hello");
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "a" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Input disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("reflects the aria-invalid state", () => {
    render(<Input aria-invalid defaultValue="not-an-email" type="email" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveValue("not-an-email");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Input className="custom-class" />);

    expect(screen.getByRole("textbox")).toHaveClass(
      "custom-class",
      "rounded-md",
    );
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Input name="email" readOnly />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("readonly");
  });
});
