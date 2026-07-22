import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Content</Card>);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a div with the card slot and default size", () => {
    render(<Card>Default</Card>);

    const card = screen.getByText("Default");

    expect(card.tagName).toBe("DIV");
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "default");
    expect(card).toHaveClass("ring-1");
  });

  it("applies the sm size", () => {
    render(<Card size="sm">Small</Card>);

    expect(screen.getByText("Small")).toHaveAttribute("data-size", "sm");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Card className="custom-class">Merged</Card>);

    const card = screen.getByText("Merged");

    expect(card).toHaveClass("custom-class", "rounded-lg");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Card aria-label="stats">Stats</Card>);

    expect(screen.getByText("Stats")).toHaveAttribute("aria-label", "stats");
  });
});

describe("Card subcomponents", () => {
  it.each([
    [CardHeader, "card-header", "Header"],
    [CardTitle, "card-title", "Title"],
    [CardDescription, "card-description", "Description"],
    [CardAction, "card-action", "Action"],
    [CardContent, "card-content", "Content"],
    [CardFooter, "card-footer", "Footer"],
  ] as const)("renders the %s slot", (Component, slot, label) => {
    render(<Component>{label}</Component>);

    expect(screen.getByText(label)).toHaveAttribute("data-slot", slot);
  });

  it("applies the title typography", () => {
    render(<CardTitle>Title</CardTitle>);

    expect(screen.getByText("Title")).toHaveClass("font-medium");
  });

  it("applies the muted description color", () => {
    render(<CardDescription>Description</CardDescription>);

    expect(screen.getByText("Description")).toHaveClass(
      "text-muted-foreground",
    );
  });

  it("merges a custom className on a subcomponent", () => {
    render(<CardContent className="custom-class">Content</CardContent>);

    expect(screen.getByText("Content")).toHaveClass("custom-class");
  });
});

describe("Card composition", () => {
  it("renders a full card with all slots", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Team members</CardTitle>
          <CardDescription>Invite your colleagues.</CardDescription>
          <CardAction>
            <button type="button">More</button>
          </CardAction>
        </CardHeader>
        <CardContent>Body copy</CardContent>
        <CardFooter>Footer copy</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Team members")).toBeInTheDocument();
    expect(screen.getByText("Invite your colleagues.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
    expect(screen.getByText("Body copy")).toBeInTheDocument();
    expect(screen.getByText("Footer copy")).toBeInTheDocument();
  });
});
