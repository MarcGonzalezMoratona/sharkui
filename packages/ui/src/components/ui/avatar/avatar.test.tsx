import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar";

describe("Avatar", () => {
  it("renders a span with the avatar slot and default size", () => {
    render(<Avatar data-testid="avatar" />);

    const avatar = screen.getByTestId("avatar");

    expect(avatar.tagName).toBe("SPAN");
    expect(avatar).toHaveAttribute("data-slot", "avatar");
    expect(avatar).toHaveAttribute("data-size", "default");
  });

  it.each([
    ["default", "default"],
    ["sm", "sm"],
    ["lg", "lg"],
  ] as const)("applies the %s size", (size, expected) => {
    render(<Avatar data-testid="avatar" size={size} />);

    expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", expected);
  });

  it("merges a custom className without dropping base classes", () => {
    render(<Avatar data-testid="avatar" className="custom-class" />);

    const avatar = screen.getByTestId("avatar");

    expect(avatar).toHaveClass("custom-class", "rounded-full");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<Avatar data-testid="avatar" aria-label="Marc Gonzalez" />);

    expect(screen.getByTestId("avatar")).toHaveAttribute(
      "aria-label",
      "Marc Gonzalez",
    );
  });
});

describe("AvatarFallback", () => {
  it("renders the fallback while the image has not loaded", () => {
    render(
      <Avatar>
        <AvatarImage src="http://example.test/avatar.png" alt="Marc Gonzalez" />
        <AvatarFallback>MG</AvatarFallback>
      </Avatar>,
    );

    const fallback = screen.getByText("MG");

    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute("data-slot", "avatar-fallback");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-class">MG</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText("MG")).toHaveClass("custom-class", "rounded-full");
  });
});

describe("AvatarImage", () => {
  class MockImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    complete = false;
    naturalWidth = 0;

    set src(_value: string) {
      queueMicrotask(() => this.onload?.());
    }
  }

  beforeEach(() => {
    vi.stubGlobal("Image", MockImage as unknown as typeof Image);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the image and hides the fallback once it loads", async () => {
    render(
      <Avatar>
        <AvatarImage src="http://example.test/avatar.png" alt="Marc Gonzalez" />
        <AvatarFallback>MG</AvatarFallback>
      </Avatar>,
    );

    const image = await screen.findByRole("img", { name: "Marc Gonzalez" });

    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("data-slot", "avatar-image");
    expect(image).toHaveAttribute("src", "http://example.test/avatar.png");
    await waitFor(() =>
      expect(screen.queryByText("MG")).not.toBeInTheDocument(),
    );
  });

  it("merges a custom className without dropping base classes", async () => {
    render(
      <Avatar>
        <AvatarImage
          src="http://example.test/avatar.png"
          alt="Marc Gonzalez"
          className="custom-class"
        />
      </Avatar>,
    );

    const image = await screen.findByRole("img", { name: "Marc Gonzalez" });

    expect(image).toHaveClass("custom-class", "object-cover");
  });
});

describe("AvatarBadge", () => {
  it("renders a span with the badge slot", () => {
    render(<AvatarBadge data-testid="badge" />);

    const badge = screen.getByTestId("badge");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "avatar-badge");
  });

  it("renders its children", () => {
    render(<AvatarBadge>3</AvatarBadge>);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("merges a custom className without dropping base classes", () => {
    render(<AvatarBadge data-testid="badge" className="bg-green-500" />);

    expect(screen.getByTestId("badge")).toHaveClass(
      "bg-green-500",
      "rounded-full",
    );
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<AvatarBadge data-testid="badge" aria-label="online" />);

    expect(screen.getByTestId("badge")).toHaveAttribute("aria-label", "online");
  });
});

describe("AvatarGroup", () => {
  it("renders a div with the group slot", () => {
    render(<AvatarGroup data-testid="group" />);

    const group = screen.getByTestId("group");

    expect(group.tagName).toBe("DIV");
    expect(group).toHaveAttribute("data-slot", "avatar-group");
  });

  it("merges a custom className without dropping base classes", () => {
    render(<AvatarGroup data-testid="group" className="custom-class" />);

    expect(screen.getByTestId("group")).toHaveClass("custom-class", "flex");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<AvatarGroup data-testid="group" role="group" />);

    expect(screen.getByTestId("group")).toHaveAttribute("role", "group");
  });
});

describe("AvatarGroupCount", () => {
  it("renders a div with the group count slot", () => {
    render(<AvatarGroupCount data-testid="count">+5</AvatarGroupCount>);

    const count = screen.getByTestId("count");

    expect(count.tagName).toBe("DIV");
    expect(count).toHaveAttribute("data-slot", "avatar-group-count");
    expect(count).toHaveTextContent("+5");
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <AvatarGroupCount data-testid="count" className="custom-class">
        +5
      </AvatarGroupCount>,
    );

    expect(screen.getByTestId("count")).toHaveClass(
      "custom-class",
      "rounded-full",
    );
  });
});
