import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Toaster, toast } from "./toast";

async function getToaster() {
  return waitFor(() => {
    const el = document.querySelector("[data-sonner-toaster]");
    expect(el).not.toBeNull();
    return el as HTMLElement;
  });
}

describe("Toaster", () => {
  afterEach(() => {
    toast.dismiss();
    document.documentElement.classList.remove("dark");
  });

  it("uses the light theme by default", async () => {
    render(<Toaster />);
    toast("hello");

    expect(await getToaster()).toHaveAttribute("data-sonner-theme", "light");
  });

  it("follows the .dark class on <html>", async () => {
    document.documentElement.classList.add("dark");

    render(<Toaster />);
    toast("hello");

    expect(await getToaster()).toHaveAttribute("data-sonner-theme", "dark");
  });
});
