// Extends Vitest's `expect` with jest-dom matchers (toBeInTheDocument,
// toHaveClass, etc.) and augments the "vitest" module types.
import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
