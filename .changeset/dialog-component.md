---
"@marcgm/sharkui": minor
---

Add the `Dialog` component for modal content that interrupts the user with important information or actions.

- New `Dialog` primitives wrapping Base UI: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogOverlay`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, and `DialogPortal`.
- `DialogContent` renders through a portal with an overlay, open/close animations, and an optional top-right close button (`showCloseButton`); `DialogFooter` supports an optional `showCloseButton` action.
- Ships with unit tests, Storybook stories, and interaction play functions (default, edit profile, confirm delete, and without close button).
