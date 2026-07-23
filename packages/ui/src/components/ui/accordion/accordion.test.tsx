import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

function renderAccordion(props?: React.ComponentProps<typeof Accordion>) {
  return render(
    <Accordion defaultValue={["item-1"]} {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger one</AccordionTrigger>
        <AccordionContent>Panel one</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Trigger two</AccordionTrigger>
        <AccordionContent>Panel two</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" disabled>
        <AccordionTrigger>Trigger three</AccordionTrigger>
        <AccordionContent>Panel three</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

describe("Accordion", () => {
  it("renders the root with the accordion slot and base classes", () => {
    renderAccordion();

    const root = screen
      .getByRole("button", { name: "Trigger one" })
      .closest('[data-slot="accordion"]');

    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("flex", "w-full", "flex-col", "border");
  });

  it("renders items with the accordion-item slot", () => {
    renderAccordion();

    const item = screen
      .getByRole("button", { name: "Trigger one" })
      .closest('[data-slot="accordion-item"]');

    expect(item).toBeInTheDocument();
  });

  it("renders each trigger as a button with the accordion-trigger slot", () => {
    renderAccordion();

    const trigger = screen.getByRole("button", { name: "Trigger one" });

    expect(trigger).toHaveAttribute("data-slot", "accordion-trigger");
  });

  it("wraps every trigger in a heading", () => {
    renderAccordion();

    expect(screen.getAllByRole("heading")).toHaveLength(3);
  });

  it("shows only the default-open panel and reflects it on the trigger", () => {
    renderAccordion();

    expect(screen.getByRole("button", { name: "Trigger one" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.queryByText("Panel two")).not.toBeInTheDocument();

    const panel = screen.getByRole("region");
    expect(panel).toHaveAttribute("data-slot", "accordion-content");
  });

  it("opens a panel and closes the previous one when single (uncontrolled)", () => {
    renderAccordion();

    fireEvent.click(screen.getByRole("button", { name: "Trigger two" }));

    expect(screen.getByRole("button", { name: "Trigger two" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: "Trigger one" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByText("Panel two")).toBeInTheDocument();
    expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
  });

  it("toggles the open panel closed when its trigger is clicked again", () => {
    renderAccordion();

    fireEvent.click(screen.getByRole("button", { name: "Trigger one" }));

    expect(screen.getByRole("button", { name: "Trigger one" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("Panel one")).not.toBeInTheDocument();
  });

  it("keeps multiple panels open when multiple is set", () => {
    renderAccordion({ multiple: true, defaultValue: ["item-1"] });

    fireEvent.click(screen.getByRole("button", { name: "Trigger two" }));

    expect(screen.getByRole("button", { name: "Trigger one" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: "Trigger two" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.getByText("Panel two")).toBeInTheDocument();
  });

  it("calls onValueChange with the next open values", () => {
    const onValueChange = vi.fn();
    renderAccordion({ onValueChange });

    fireEvent.click(screen.getByRole("button", { name: "Trigger two" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(["item-2"], expect.anything());
  });

  it("respects the controlled value prop", () => {
    const onValueChange = vi.fn();
    renderAccordion({ value: ["item-1"], onValueChange });

    fireEvent.click(screen.getByRole("button", { name: "Trigger two" }));

    expect(onValueChange).toHaveBeenCalledWith(["item-2"], expect.anything());
    expect(screen.getByRole("button", { name: "Trigger one" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Panel one")).toBeInTheDocument();
  });

  it("does not open a disabled item", () => {
    const onValueChange = vi.fn();
    renderAccordion({ onValueChange });

    const disabled = screen.getByRole("button", { name: "Trigger three" });
    expect(disabled).toHaveAttribute("aria-expanded", "false");
    expect(disabled).toHaveAttribute("data-disabled");

    fireEvent.click(disabled);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(disabled).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Panel three")).not.toBeInTheDocument();
  });

  it("disables every trigger when the root is disabled", () => {
    renderAccordion({ disabled: true });

    const root = screen
      .getByRole("button", { name: "Trigger one" })
      .closest('[data-slot="accordion"]');
    expect(root).toHaveAttribute("data-disabled");

    for (const name of ["Trigger one", "Trigger two", "Trigger three"]) {
      expect(screen.getByRole("button", { name })).toHaveAttribute(
        "data-disabled",
      );
    }
  });

  it("merges a custom className without dropping base classes", () => {
    const { container } = renderAccordion({ className: "custom-class" });

    expect(container.querySelector('[data-slot="accordion"]')).toHaveClass(
      "custom-class",
      "flex",
    );
  });
});

describe("AccordionItem", () => {
  it("marks the open item with data-open", () => {
    renderAccordion();

    const item = screen
      .getByRole("button", { name: "Trigger one" })
      .closest('[data-slot="accordion-item"]');

    expect(item).toHaveAttribute("data-open");
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a" className="custom-class">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent>A panel</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const item = screen
      .getByRole("button", { name: "A" })
      .closest('[data-slot="accordion-item"]');

    expect(item).toHaveClass("custom-class", "not-last:border-b");
  });
});

describe("AccordionTrigger", () => {
  it("forwards arbitrary props to the underlying button", () => {
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger data-testid="trigger-a">A</AccordionTrigger>
          <AccordionContent>A panel</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute(
      "data-testid",
      "trigger-a",
    );
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger className="custom-class">A</AccordionTrigger>
          <AccordionContent>A panel</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole("button", { name: "A" })).toHaveClass(
      "custom-class",
      "relative",
    );
  });
});

describe("AccordionContent", () => {
  it("merges a custom className onto the inner content wrapper", () => {
    render(
      <Accordion defaultValue={["a"]}>
        <AccordionItem value="a">
          <AccordionTrigger>A</AccordionTrigger>
          <AccordionContent className="custom-class">A panel</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const inner = screen.getByRole("region").firstElementChild;

    expect(inner).toHaveClass("custom-class");
    expect(inner).toHaveTextContent("A panel");
  });
});
