import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

describe("Table", () => {
  it("renders a table element with the table slot", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = screen.getByRole("table");

    expect(table.tagName).toBe("TABLE");
    expect(table).toHaveAttribute("data-slot", "table");
  });

  it("wraps the table in an overflow container", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const container = screen
      .getByRole("table")
      .closest('[data-slot="table-container"]');

    expect(container).not.toBeNull();
    expect(container).toHaveClass("overflow-x-auto");
  });

  it("merges a custom className without dropping base classes", () => {
    render(
      <Table className="custom-class">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("table")).toHaveClass("custom-class", "w-full");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(
      <Table aria-label="invoices">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("table")).toHaveAttribute("aria-label", "invoices");
  });
});

describe("Table subcomponents", () => {
  it("renders the header slot", () => {
    render(
      <Table>
        <TableHeader data-testid="header">
          <TableRow>
            <TableHead>Head</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    expect(screen.getByTestId("header")).toHaveAttribute(
      "data-slot",
      "table-header",
    );
  });

  it("renders the body slot", () => {
    render(
      <Table>
        <TableBody data-testid="body">
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId("body")).toHaveAttribute(
      "data-slot",
      "table-body",
    );
  });

  it("renders the footer slot", () => {
    render(
      <Table>
        <TableFooter data-testid="footer">
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByTestId("footer")).toHaveAttribute(
      "data-slot",
      "table-footer",
    );
  });

  it("renders a row with the row slot", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId("row")).toHaveAttribute("data-slot", "table-row");
  });

  it("renders a column header with the head slot", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const head = screen.getByRole("columnheader", { name: "Invoice" });

    expect(head).toHaveAttribute("data-slot", "table-head");
  });

  it("renders a cell with the cell slot", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Body cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const cell = screen.getByRole("cell", { name: "Body cell" });

    expect(cell).toHaveAttribute("data-slot", "table-cell");
  });

  it("renders a caption with the caption slot", () => {
    render(
      <Table>
        <TableCaption>A list of invoices.</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByText("A list of invoices.")).toHaveAttribute(
      "data-slot",
      "table-caption",
    );
  });

  it("forwards colSpan to a cell", () => {
    render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByRole("cell", { name: "Total" })).toHaveAttribute(
      "colspan",
      "3",
    );
  });

  it("marks a row as selected via data-state", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-testid="row" data-state="selected">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId("row")).toHaveAttribute("data-state", "selected");
  });

  it("merges a custom className on a subcomponent", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-right">Amount</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("cell", { name: "Amount" })).toHaveClass(
      "text-right",
    );
  });
});

describe("Table composition", () => {
  it("renders a full table with all slots", () => {
    render(
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(
      screen.getByText("A list of your recent invoices."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Invoice" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "INV001" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Total" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });
});
