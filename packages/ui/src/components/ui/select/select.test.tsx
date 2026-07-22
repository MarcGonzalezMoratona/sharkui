import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

function renderSelect(props?: React.ComponentProps<typeof Select>) {
  return render(
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry" disabled>
          Blueberry
        </SelectItem>
      </SelectContent>
    </Select>,
  );
}

function selectOption(option: HTMLElement) {
  fireEvent.pointerDown(option);
  fireEvent.click(option);
}

describe("Select", () => {
  it("renders a trigger with the select-trigger slot", () => {
    renderSelect();

    const trigger = screen.getByRole("combobox");

    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
  });

  it("shows the placeholder while no value is selected", () => {
    renderSelect();

    expect(screen.getByText("Select a fruit")).toBeInTheDocument();
  });

  it("applies the default size data attribute", () => {
    renderSelect();

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "data-size",
      "default",
    );
  });

  it("applies the sm size data attribute", () => {
    render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute("data-size", "sm");
  });

  it("does not render the listbox while closed", () => {
    renderSelect();

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens the listbox with its options when the trigger is clicked", async () => {
    renderSelect();

    fireEvent.click(screen.getByRole("combobox"));

    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="select-content"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  it("marks the collapsed trigger with aria-expanded false", () => {
    renderSelect();

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("selects an option and calls onValueChange", async () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });

    fireEvent.click(screen.getByRole("combobox"));
    selectOption(await screen.findByRole("option", { name: "Banana" }));

    expect(onValueChange).toHaveBeenCalledWith("banana", expect.anything());
    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("banana");
  });

  it("reflects the value set through defaultValue", () => {
    renderSelect({ defaultValue: "apple" });

    expect(screen.getByRole("combobox")).toHaveTextContent("apple");
  });

  it("respects the controlled value prop", () => {
    renderSelect({ value: "banana" });

    expect(screen.getByRole("combobox")).toHaveTextContent("banana");
  });

  it("marks a disabled option as disabled", async () => {
    renderSelect();

    fireEvent.click(screen.getByRole("combobox"));

    const disabledOption = await screen.findByRole("option", {
      name: "Blueberry",
    });
    expect(disabledOption).toHaveAttribute("data-disabled");
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
  });

  it("does not open when the trigger is disabled", () => {
    render(
      <Select>
        <SelectTrigger disabled>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();

    fireEvent.click(trigger);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("merges a custom className on the trigger without dropping base classes", () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toHaveClass("custom-class", "flex");
  });

  it("forwards arbitrary props to the trigger", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit picker">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-label",
      "Fruit picker",
    );
  });

  it("renders groups, labels and separators with their slots when open", async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );

    fireEvent.click(screen.getByRole("combobox"));

    await screen.findByRole("listbox");

    expect(screen.getByText("Fruits")).toHaveAttribute(
      "data-slot",
      "select-label",
    );
    expect(
      document.querySelector('[data-slot="select-group"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="select-separator"]'),
    ).toBeInTheDocument();
  });
});
