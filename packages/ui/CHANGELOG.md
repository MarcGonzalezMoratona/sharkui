# @marcgm/sharkui

## 0.15.0

### Minor Changes

- [`b3e9601`](https://github.com/MarcGonzalezMoratona/sharkui/commit/b3e9601b4c212cb6606b2ebae7451111b372f428) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Field` component for building accessible form fields with labels, descriptions, and validation messages.

  - New `Field` primitives wrapping Base UI.
  - Ships with unit tests, Storybook stories, and interaction play functions.

## 0.14.0

### Minor Changes

- [`116b372`](https://github.com/MarcGonzalezMoratona/sharkui/commit/116b37284d6ef26db49ac76efbf8ee30e3214a87) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `DropdownMenu` component for displaying a menu of actions or options triggered by a button.

  - New `DropdownMenu` primitives wrapping Base UI: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, and `DropdownMenuPortal`.
  - Supports submenus (`DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`), checkbox items (`DropdownMenuCheckboxItem`), and radio groups (`DropdownMenuRadioGroup`, `DropdownMenuRadioItem`).
  - Ships with unit tests, Storybook stories, and interaction play functions.

## 0.13.0

### Minor Changes

- [`b3d87f0`](https://github.com/MarcGonzalezMoratona/sharkui/commit/b3d87f0a23c70d61d69f4c9954d8fd96728061e0) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Dialog` component for modal content that interrupts the user with important information or actions.

  - New `Dialog` primitives wrapping Base UI: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogOverlay`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, and `DialogPortal`.
  - `DialogContent` renders through a portal with an overlay, open/close animations, and an optional top-right close button (`showCloseButton`); `DialogFooter` supports an optional `showCloseButton` action.
  - Ships with unit tests, Storybook stories, and interaction play functions (default, edit profile, confirm delete, and without close button).

- [`b7a13d6`](https://github.com/MarcGonzalezMoratona/sharkui/commit/b7a13d62ca26cf6061ed9c41c5f5fb4d7f567a1f) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Popover` component for lightweight, contextual content anchored to a trigger.

  - New `Popover` primitives wrapping Base UI: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, and `PopoverDescription`.
  - `PopoverContent` supports `align`, `alignOffset`, `side`, and `sideOffset` positioning, with open/close animations and portal rendering.
  - Ships with unit tests, Storybook stories, and interaction play functions (default, dimensions, and sides).
  - All primitives are exported from the package barrel.

## 0.12.0

### Minor Changes

- [`2b0aa17`](https://github.com/MarcGonzalezMoratona/sharkui/commit/2b0aa17d39016528755f5249784a94cb42a48abf) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Textarea` component for multi-line text input.

  - New `Textarea` component wrapping the native `<textarea>` with `field-sizing-content` auto-grow, focus/invalid ring styling, and full prop forwarding.
  - Supports placeholder, `defaultValue`/controlled `value`, `rows`, disabled, `readOnly`, and `aria-invalid` states.
  - Ships with unit tests, Storybook stories, and interaction play functions (default, disabled, invalid, and labelled).
  - `Textarea` is exported from the package barrel.

## 0.11.0

### Minor Changes

- [`5ad423c`](https://github.com/MarcGonzalezMoratona/sharkui/commit/5ad423c42e961eb2c2463168c83e0888760d9c60) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Progress` component for displaying task completion status.

  - New `Progress` component built on Base UI's `Progress`, composing `ProgressTrack` and `ProgressIndicator` internally.
  - Supports determinate, complete, and indeterminate (`value={null}`) states, plus custom `min`/`max` bounds.
  - Exposes `ProgressLabel` and `ProgressValue` for an accessible label and a formatted percentage readout.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - `Progress`, `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, and `ProgressValue` are exported from the package barrel.

- [`7bd460b`](https://github.com/MarcGonzalezMoratona/sharkui/commit/7bd460bc4146e5e89028df46745154134d8b2dd7) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Select` component for choosing a single value from a list of options.

  - New `Select` component built on Base UI's `Select`, composing the portal, positioner, popup, and scroll arrows internally.
  - Ships `SelectTrigger` (with `default`/`sm` sizes), `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, and `SelectSeparator` for building grouped, labelled menus.
  - Supports placeholder, `defaultValue`/controlled `value`, disabled items, and disabled triggers.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, and `SelectValue` are exported from the package barrel.
  - Fixes the `Tabs` keyboard-navigation interaction test to match the list's manual activation (arrows move focus, `Enter` selects).

## 0.10.0

### Minor Changes

- [`38de5a1`](https://github.com/MarcGonzalezMoratona/sharkui/commit/38de5a1f073ff9de75f0ce72ce7b2444db5589ac) Thanks [@MarcGonzalezMoratona](https://github.com/MarcGonzalezMoratona)! - Add the `Switch` component for toggling a single setting on or off.

  - New `Switch` component built on Base UI's `Switch`, with a `size` prop (`sm` and `default`).
  - Supports checked, unchecked, and disabled states, plus controlled and uncontrolled usage via `checked`/`defaultChecked` and `onCheckedChange`.
  - Ships with unit tests, Storybook stories, and interaction play functions.
  - `Switch` is exported from the package barrel.

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
