import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function renderTabs(props?: React.ComponentProps<typeof Tabs>) {
  return render(
    <Tabs defaultValue="account" {...props}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renders the root with the tabs slot and horizontal orientation by default", () => {
    renderTabs();

    const tab = screen.getByRole("tab", { name: "Account" });
    const root = tab.closest('[data-slot="tabs"]');

    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute("data-orientation", "horizontal");
  });

  it("renders the tablist with the tabs-list slot and default variant", () => {
    renderTabs();

    const tablist = screen.getByRole("tablist");

    expect(tablist).toHaveAttribute("data-slot", "tabs-list");
    expect(tablist).toHaveAttribute("data-variant", "default");
    expect(tablist).toHaveClass("bg-muted");
  });

  it("renders triggers with the tabs-trigger slot", () => {
    renderTabs();

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "data-slot",
      "tabs-trigger",
    );
  });

  it("shows only the active panel and marks its trigger selected", () => {
    renderTabs();

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Account panel")).toBeInTheDocument();
    expect(screen.queryByText("Password panel")).not.toBeInTheDocument();

    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("data-slot", "tabs-content");
  });

  it("switches the active tab when a trigger is clicked (uncontrolled)", () => {
    renderTabs();

    fireEvent.click(screen.getByRole("tab", { name: "Password" }));

    expect(screen.getByRole("tab", { name: "Password" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByText("Password panel")).toBeInTheDocument();
    expect(screen.queryByText("Account panel")).not.toBeInTheDocument();
  });

  it("calls onValueChange with the next value", () => {
    const onValueChange = vi.fn();
    renderTabs({ defaultValue: "account", onValueChange });

    fireEvent.click(screen.getByRole("tab", { name: "Password" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("password", expect.anything());
  });

  it("respects the controlled value prop", () => {
    const onValueChange = vi.fn();
    renderTabs({ value: "account", onValueChange });

    fireEvent.click(screen.getByRole("tab", { name: "Password" }));

    expect(onValueChange).toHaveBeenCalledWith("password", expect.anything());
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("does not activate a disabled trigger", () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });

    const disabled = screen.getByRole("tab", { name: "Disabled" });
    expect(disabled).toHaveAttribute("aria-selected", "false");

    fireEvent.click(disabled);

    expect(onValueChange).not.toHaveBeenCalled();
    expect(disabled).toHaveAttribute("aria-selected", "false");
  });

  it("reflects the vertical orientation on the root", () => {
    renderTabs({ orientation: "vertical" });

    const root = screen
      .getByRole("tab", { name: "Account" })
      .closest('[data-slot="tabs"]');

    expect(root).toHaveAttribute("data-orientation", "vertical");
  });

  it("merges a custom className without dropping base classes", () => {
    const { container } = renderTabs({ className: "custom-class" });

    expect(container.querySelector('[data-slot="tabs"]')).toHaveClass(
      "custom-class",
      "flex",
    );
  });
});

describe("TabsList", () => {
  it("applies the line variant", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList variant="line">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A panel</TabsContent>
      </Tabs>,
    );

    const tablist = screen.getByRole("tablist");

    expect(tablist).toHaveAttribute("data-variant", "line");
    expect(tablist).toHaveClass("bg-transparent");
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList className="custom-class">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A panel</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole("tablist")).toHaveClass(
      "custom-class",
      "inline-flex",
    );
  });
});

describe("TabsTrigger", () => {
  it("forwards arbitrary props to the underlying element", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" aria-label="First tab">
            A
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">A panel</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole("tab")).toHaveAttribute("aria-label", "First tab");
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" className="custom-class">
            A
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">A panel</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole("tab")).toHaveClass("custom-class", "relative");
  });
});

describe("TabsContent", () => {
  it("merges a custom className without dropping base classes", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="custom-class">
          A panel
        </TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole("tabpanel")).toHaveClass("custom-class", "flex-1");
  });
});
