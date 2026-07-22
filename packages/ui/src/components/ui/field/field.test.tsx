import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field";

describe("Field", () => {
  it("renders its children", () => {
    render(<Field>Content</Field>);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a group with the field slot and default vertical orientation", () => {
    render(<Field>Default</Field>);

    const field = screen.getByRole("group");

    expect(field.tagName).toBe("DIV");
    expect(field).toHaveAttribute("data-slot", "field");
    expect(field).toHaveAttribute("data-orientation", "vertical");
    expect(field).toHaveClass("flex-col");
  });

  it("applies the horizontal orientation", () => {
    render(<Field orientation="horizontal">Horizontal</Field>);

    const field = screen.getByRole("group");

    expect(field).toHaveAttribute("data-orientation", "horizontal");
    expect(field).toHaveClass("flex-row");
  });

  it("applies the responsive orientation", () => {
    render(<Field orientation="responsive">Responsive</Field>);

    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "responsive",
    );
  });

  it("reflects the data-invalid state", () => {
    render(<Field data-invalid="true">Invalid</Field>);

    expect(screen.getByRole("group")).toHaveAttribute("data-invalid", "true");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Field className="custom-class">Merged</Field>);

    const field = screen.getByRole("group");

    expect(field).toHaveClass("custom-class", "flex");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Field aria-label="profile">Profile</Field>);

    expect(screen.getByRole("group")).toHaveAttribute("aria-label", "profile");
  });
});

describe("Field subcomponents", () => {
  it.each([
    [FieldSet, "field-set", "fieldset"],
    [FieldGroup, "field-group", "div"],
    [FieldContent, "field-content", "div"],
    [FieldTitle, "field-label", "div"],
    [FieldDescription, "field-description", "p"],
  ] as const)("renders the %s slot", (Component, slot, tag) => {
    render(<Component>Label</Component>);

    const element = screen.getByText("Label");

    expect(element.tagName.toLowerCase()).toBe(tag);
    expect(element).toHaveAttribute("data-slot", slot);
  });

  it("renders the legend slot with the default legend variant", () => {
    render(<FieldLegend>Legend</FieldLegend>);

    const legend = screen.getByText("Legend");

    expect(legend.tagName).toBe("LEGEND");
    expect(legend).toHaveAttribute("data-slot", "field-legend");
    expect(legend).toHaveAttribute("data-variant", "legend");
  });

  it("applies the label variant on the legend", () => {
    render(<FieldLegend variant="label">Legend</FieldLegend>);

    expect(screen.getByText("Legend")).toHaveAttribute("data-variant", "label");
  });

  it("renders the label slot as a label element", () => {
    render(<FieldLabel htmlFor="name">Name</FieldLabel>);

    const label = screen.getByText("Name");

    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("data-slot", "field-label");
    expect(label).toHaveAttribute("for", "name");
  });

  it("applies the muted description color", () => {
    render(<FieldDescription>Description</FieldDescription>);

    expect(screen.getByText("Description")).toHaveClass(
      "text-muted-foreground",
    );
  });

  it("merges a custom className on a subcomponent", () => {
    render(<FieldContent className="custom-class">Content</FieldContent>);

    expect(screen.getByText("Content")).toHaveClass("custom-class");
  });
});

describe("FieldSeparator", () => {
  it("renders the separator slot without content", () => {
    const { container } = render(<FieldSeparator />);

    const separator = container.querySelector('[data-slot="field-separator"]');

    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("data-content", "false");
  });

  it("renders its content inside the separator content slot", () => {
    render(<FieldSeparator>Optional</FieldSeparator>);

    const content = screen.getByText("Optional");

    expect(content).toHaveAttribute("data-slot", "field-separator-content");
    expect(content.closest('[data-slot="field-separator"]')).toHaveAttribute(
      "data-content",
      "true",
    );
  });
});

describe("FieldError", () => {
  it("renders nothing when there are no errors or children", () => {
    const { container } = render(<FieldError />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders explicit children as an alert", () => {
    render(<FieldError>Something went wrong</FieldError>);

    const alert = screen.getByRole("alert");

    expect(alert).toHaveAttribute("data-slot", "field-error");
    expect(alert).toHaveTextContent("Something went wrong");
  });

  it("renders a single error message without a list", () => {
    render(<FieldError errors={[{ message: "Required field." }]} />);

    expect(screen.getByRole("alert")).toHaveTextContent("Required field.");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders multiple errors as a list", () => {
    render(
      <FieldError
        errors={[{ message: "Too short." }, { message: "Missing a number." }]}
      />,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("deduplicates errors sharing the same message", () => {
    render(
      <FieldError
        errors={[{ message: "Required." }, { message: "Required." }]}
      />,
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Required.");
  });

  it("prefers children over the errors prop", () => {
    render(
      <FieldError errors={[{ message: "From prop." }]}>
        From children
      </FieldError>,
    );

    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("From children");
    expect(alert).not.toHaveTextContent("From prop.");
  });
});

describe("Field composition", () => {
  it("renders a full field set with grouped fields", () => {
    render(
      <FieldSet>
        <FieldLegend>Shipping address</FieldLegend>
        <FieldDescription>Where should we send your order?</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street</FieldLabel>
          </Field>
          <FieldSeparator>Optional</FieldSeparator>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>,
    );

    expect(screen.getByText("Shipping address")).toBeInTheDocument();
    expect(
      screen.getByText("Where should we send your order?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Street")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });
});
