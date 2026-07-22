#!/usr/bin/env node
// Scaffolds a new UI component: creates the folder with the 4 conventional
// files (.tsx / .stories.tsx / .play.ts / .test.tsx) and registers the export
// in src/index.ts.
//
// Usage:
//   node scripts/generate-component.mjs <Name> [--force]
//   pnpm gen:component <Name>
//
// <Name> accepts any casing: "Avatar", "avatar", "avatar-group", "AvatarGroup".

import { existsSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const srcDir = join(scriptDir, "..", "src")
const componentsDir = join(srcDir, "components", "ui")
const indexPath = join(srcDir, "index.ts")

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2)
const force = argv.includes("--force")
const rawName = argv.find((a) => !a.startsWith("--"))

if (!rawName) {
  console.error("Usage: pnpm gen:component <Name> [--force]")
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Name casing helpers
// ---------------------------------------------------------------------------
function splitWords(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
}

const words = splitWords(rawName)
if (words.length === 0) {
  console.error(`Invalid component name: "${rawName}"`)
  process.exit(1)
}

const Pascal = words
  .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
  .join("")
const camel = Pascal[0].toLowerCase() + Pascal.slice(1)
const kebab = words.map((w) => w.toLowerCase()).join("-")

// ---------------------------------------------------------------------------
// Templates (tokens: %PASCAL% %CAMEL% %KEBAB% — chosen to avoid clashing with
// JSX's double-brace style objects)
// ---------------------------------------------------------------------------
const componentTpl = `import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const %CAMEL%Variants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function %PASCAL%({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof %CAMEL%Variants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(%CAMEL%Variants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "%KEBAB%",
      variant,
    },
  })
}

export { %PASCAL%, %CAMEL%Variants }
`

const storiesTpl = `import type { Meta, StoryObj } from "@storybook/react-vite";

import { %PASCAL% } from "./%KEBAB%";
import { playDefault, playVariants } from "./%KEBAB%.play";

const meta = {
  title: "Components/%PASCAL%",
  component: %PASCAL%,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary"],
    },
  },
  args: {
    children: "%PASCAL%",
    variant: "default",
  },
} satisfies Meta<typeof %PASCAL%>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: playDefault,
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <%PASCAL% variant="default">Default</%PASCAL%>
      <%PASCAL% variant="secondary">Secondary</%PASCAL%>
    </div>
  ),
  play: playVariants,
};
`

const playTpl = `import type { StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import type { %PASCAL% } from "./%KEBAB%";

type PlayContext = Parameters<NonNullable<StoryObj<typeof %PASCAL%>["play"]>>[0];

export const playDefault = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);
  const %CAMEL% = canvas.getByText("%PASCAL%");

  await expect(%CAMEL%).toBeInTheDocument();
  await expect(%CAMEL%).toHaveAttribute("data-slot", "%KEBAB%");
};

export const playVariants = async ({ canvasElement }: PlayContext) => {
  const canvas = within(canvasElement);

  for (const label of ["Default", "Secondary"]) {
    await expect(canvas.getByText(label)).toBeInTheDocument();
  }
};
`

const testTpl = `import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { %PASCAL%, %CAMEL%Variants } from "./%KEBAB%";

describe("%PASCAL%", () => {
  it("renders its children", () => {
    render(<%PASCAL%>Hello</%PASCAL%>);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders a span with the %KEBAB% slot by default", () => {
    render(<%PASCAL%>Default</%PASCAL%>);

    const %CAMEL% = screen.getByText("Default");

    expect(%CAMEL%.tagName).toBe("SPAN");
    expect(%CAMEL%).toHaveAttribute("data-slot", "%KEBAB%");
    expect(%CAMEL%).toHaveAttribute("data-variant", "default");
    expect(%CAMEL%).toHaveClass("bg-primary");
  });

  it("applies the secondary variant", () => {
    render(<%PASCAL% variant="secondary">Variant</%PASCAL%>);

    const %CAMEL% = screen.getByText("Variant");

    expect(%CAMEL%).toHaveAttribute("data-variant", "secondary");
    expect(%CAMEL%).toHaveClass("bg-secondary");
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<%PASCAL% className="custom-class">Merged</%PASCAL%>);

    const %CAMEL% = screen.getByText("Merged");

    expect(%CAMEL%).toHaveClass("custom-class", "bg-primary");
  });

  it("renders as a custom element via the render prop", () => {
    render(<%PASCAL% render={<a href="/link" />}>Link</%PASCAL%>);

    const %CAMEL% = screen.getByRole("link", { name: "Link" });

    expect(%CAMEL%).toHaveAttribute("href", "/link");
    expect(%CAMEL%).toHaveAttribute("data-slot", "%KEBAB%");
  });

  it("forwards arbitrary props to the underlying element", () => {
    render(<%PASCAL% aria-invalid>Invalid</%PASCAL%>);

    expect(screen.getByText("Invalid")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("%CAMEL%Variants", () => {
  it("returns the default variant classes", () => {
    expect(%CAMEL%Variants()).toContain("bg-primary");
  });

  it("reflects an explicit variant", () => {
    expect(%CAMEL%Variants({ variant: "secondary" })).toContain("bg-secondary");
  });
});
`

function render(tpl) {
  return tpl
    .replaceAll("%PASCAL%", Pascal)
    .replaceAll("%CAMEL%", camel)
    .replaceAll("%KEBAB%", kebab)
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------
const targetDir = join(componentsDir, kebab)

if (existsSync(targetDir) && !force) {
  console.error(
    `Component "${kebab}" already exists at ${targetDir}. Use --force to overwrite.`
  )
  process.exit(1)
}

await mkdir(targetDir, { recursive: true })

const files = {
  [`${kebab}.tsx`]: render(componentTpl),
  [`${kebab}.stories.tsx`]: render(storiesTpl),
  [`${kebab}.play.ts`]: render(playTpl),
  [`${kebab}.test.tsx`]: render(testTpl),
}

for (const [file, content] of Object.entries(files)) {
  await writeFile(join(targetDir, file), content, "utf8")
  console.log(`  created  src/components/ui/${kebab}/${file}`)
}

// ---------------------------------------------------------------------------
// Register export in src/index.ts (inserted before the "// Utils" section)
// ---------------------------------------------------------------------------
const exportLine = `export { ${Pascal}, ${camel}Variants } from "./components/ui/${kebab}/${kebab}";`
let index = await readFile(indexPath, "utf8")

if (index.includes(exportLine)) {
  console.log(`  skipped  export already present in src/index.ts`)
} else if (index.includes("// Utils")) {
  index = index.replace("// Utils", `${exportLine}\n\n// Utils`)
  await writeFile(indexPath, index, "utf8")
  console.log(`  updated  src/index.ts`)
} else {
  index = `${index.trimEnd()}\n${exportLine}\n`
  await writeFile(indexPath, index, "utf8")
  console.log(`  updated  src/index.ts`)
}

console.log(`\nDone. Component "${Pascal}" scaffolded.`)
