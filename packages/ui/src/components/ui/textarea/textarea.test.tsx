import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a textarea with the textarea slot", () => {
    render(<Textarea />);

    const textarea = screen.getByRole("textbox");

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("data-slot", "textarea");
  });

  it("renders a placeholder", () => {
    render(<Textarea placeholder="Type something..." />);

    expect(
      screen.getByPlaceholderText("Type something..."),
    ).toBeInTheDocument();
  });

  it("renders the value from defaultValue", () => {
    render(<Textarea defaultValue="Hello" />);

    expect(screen.getByRole("textbox")).toHaveValue("Hello");
  });

  it("accepts user input", () => {
    render(<Textarea />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "hello" } });

    expect(textarea).toHaveValue("hello");
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "a" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Textarea disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("reflects the rows prop", () => {
    render(<Textarea rows={8} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "8");
  });

  it("reflects the aria-invalid state", () => {
    render(<Textarea aria-invalid defaultValue="oops" />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveValue("oops");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Textarea className="custom-class" />);

    expect(screen.getByRole("textbox")).toHaveClass(
      "custom-class",
      "rounded-md",
    );
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Textarea name="bio" readOnly />);

    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveAttribute("name", "bio");
    expect(textarea).toHaveAttribute("readonly");
  });
});
