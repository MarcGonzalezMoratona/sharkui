---
"@marcgm/sharkui": minor
---

Add the `Select` component for choosing a single value from a list of options.

- New `Select` component built on Base UI's `Select`, composing the portal, positioner, popup, and scroll arrows internally.
- Ships `SelectTrigger` (with `default`/`sm` sizes), `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, and `SelectSeparator` for building grouped, labelled menus.
- Supports placeholder, `defaultValue`/controlled `value`, disabled items, and disabled triggers.
- Ships with unit tests, Storybook stories, and interaction play functions.
- `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, and `SelectValue` are exported from the package barrel.
- Fixes the `Tabs` keyboard-navigation interaction test to match the list's manual activation (arrows move focus, `Enter` selects).
