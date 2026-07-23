---
"@marcgm/sharkui": patch
---

Document component props across the whole library:

- **Storybook prop categories** — every component's `argTypes` now groups props into a consistent set of categories (`Appearance`, `Positioning`, `State`, `Content`, `Events`) with per-prop descriptions, so the autodocs Controls/props table is organized instead of a flat list.
- **JSDoc on component props** — added JSDoc (with `@default`) to the props each component declares itself. `cva` variant/size props and `Pick`'d positioning props (`side`/`sideOffset`/`align`/`alignOffset`/`alignItemWithTrigger`) were rewritten into inline, type-identical literals so they carry JSDoc too — surfacing in both IDE hover and Storybook autodocs.

Docs/types only: no runtime or public API changes.
