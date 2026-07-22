---
"@marcgm/sharkui": minor
---

Add the `Progress` component for displaying task completion status.

- New `Progress` component built on Base UI's `Progress`, composing `ProgressTrack` and `ProgressIndicator` internally.
- Supports determinate, complete, and indeterminate (`value={null}`) states, plus custom `min`/`max` bounds.
- Exposes `ProgressLabel` and `ProgressValue` for an accessible label and a formatted percentage readout.
- Ships with unit tests, Storybook stories, and interaction play functions.
- `Progress`, `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, and `ProgressValue` are exported from the package barrel.
