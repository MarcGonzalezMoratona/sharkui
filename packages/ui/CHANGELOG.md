# @marcgm/sharkui

## 0.9.0

### Minor Changes

- [`31cde9a`](https://github.com/MarcGonzalezMoratona/sharkui/commit/31cde9ab3d5691eb2e65297074e3ed008160e1ff) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Separator` component for dividing content and groups of related elements.

  - New `Separator` component built on Base UI, accessible with `role="separator"`.
  - Supports horizontal and vertical orientation via the `orientation` prop.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - `Separator` is exported from the package barrel.

- [`5a8688e`](https://github.com/MarcGonzalezMoratona/sharkui/commit/5a8688e0ee0f7f137dd7dcd96b0612cfc1cea730) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Sheet` component for content that slides in from the edges of the viewport.

  - New `Sheet` component built on Base UI's `Dialog`, with `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, and `SheetDescription`.
  - Supports `top`, `right`, `bottom`, and `left` sides via the `side` prop, plus an optional close button via `showCloseButton`.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - All `Sheet` parts are exported from the package barrel.

## 0.8.0

### Minor Changes

- [`7987ba5`](https://github.com/MarcGonzalezMoratona/sharkui/commit/7987ba5c89c37a248c536b9e8b55575e65de1bf8) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Tabs` component for switching between related panels.

  - New `Tabs` component built on Base UI, with `TabsList`, `TabsTrigger`, and `TabsContent`.
  - Supports `default` and `line` list variants via the `variant` prop on `TabsList`, plus horizontal and vertical orientation via the `orientation` prop.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - All tabs parts and `tabsListVariants` are exported from the package barrel.

## 0.7.0

### Minor Changes

- [`2e9586a`](https://github.com/MarcGonzalezMoratona/sharkui/commit/2e9586abbf5f6522d2770270917f55d4a8d8cd30) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Avatar` component for displaying user images with fallbacks, status badges, and grouping.

  - New `Avatar` component built on Base UI, with `AvatarImage` (falls back automatically when the image fails to load), `AvatarFallback`, `AvatarBadge` (status indicator), `AvatarGroup`, and `AvatarGroupCount` for stacked avatars.
  - Supports `sm`, `default`, and `lg` sizes via the `size` prop.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - All avatar parts are exported from the package barrel.

## 0.6.0

### Minor Changes

- [`689d382`](https://github.com/MarcGonzalezMoratona/sharkui/commit/689d3820eb23b007b53ac1d03c587976238e6876) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Skeleton` component and improve the published package for tree-shaking and React Server Components.

  - New `Skeleton` component with unit tests, a Storybook story, and an interaction play function, exported from the package barrel.
  - Interactive components (`Button`, `Badge`, `Checkbox`, `Input`, `Tooltip`, `Toaster`) now ship a `"use client"` directive, making them compatible with React Server Components / the Next.js App Router. Presentational components (`Card`, `Label`, `Skeleton`) and `cn` stay server-safe.
  - Build migrated from tsup to Rollup with `preserveModules`, so the package keeps one module per source file. Unused components are tree-shaken away when importing from the barrel.

## 0.5.0

### Minor Changes

- Add `Checkbox`, `Label`, and `Input` components with unit tests, Storybook stories, and interaction play functions. All three are exported from the package barrel.

## 0.4.0

### Minor Changes

- Add Card component with CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter subcomponents, including unit tests, Storybook stories, and interaction play functions.

## 0.3.0

### Minor Changes

- Add `Badge` component with `default`, `secondary`, `destructive`, `outline`, `ghost`, and `link` variants, plus the `badgeVariants` helper. Supports polymorphic rendering via the `render` prop and inline-start/inline-end icon slots.

## 0.2.0

### Minor Changes

- [`6c7fc99`](https://github.com/MarcGonzalezMoratona/sharkui/commit/6c7fc993f349c86306bed052666b3fc15b681739) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add themed Toast component (`Toaster`, `toast`) built on Sonner, exported from the package barrel.

## 0.1.0

### Minor Changes

- [`f3f0e36`](https://github.com/MarcGonzalezMoratona/sharkui/commit/f3f0e368c604c537bcf815155d447661dc0fe7e5) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add Tooltip component built on Base UI (`Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`), exported from the package barrel.

## 0.0.1

### Patch Changes

- [`023f9c3`](https://github.com/MarcGonzalezMoratona/sharkui/commit/023f9c32830f53b46d20b5904e1fccb1ecbe711c) - Link the live Storybook documentation (https://sharkui.vercel.app) from the package README.
