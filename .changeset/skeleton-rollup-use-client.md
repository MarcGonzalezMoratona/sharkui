---
"@marcgm/sharkui": minor
---

Add the `Skeleton` component and improve the published package for tree-shaking and React Server Components.

- New `Skeleton` component with unit tests, a Storybook story, and an interaction play function, exported from the package barrel.
- Interactive components (`Button`, `Badge`, `Checkbox`, `Input`, `Tooltip`, `Toaster`) now ship a `"use client"` directive, making them compatible with React Server Components / the Next.js App Router. Presentational components (`Card`, `Label`, `Skeleton`) and `cn` stay server-safe.
- Build migrated from tsup to Rollup with `preserveModules`, so the package keeps one module per source file. Unused components are tree-shaken away when importing from the barrel.
