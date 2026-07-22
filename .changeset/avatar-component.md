---
"@marcgm/sharkui": minor
---

Add the `Avatar` component for displaying user images with fallbacks, status badges, and grouping.

- New `Avatar` component built on Base UI, with `AvatarImage` (falls back automatically when the image fails to load), `AvatarFallback`, `AvatarBadge` (status indicator), `AvatarGroup`, and `AvatarGroupCount` for stacked avatars.
- Supports `sm`, `default`, and `lg` sizes via the `size` prop.
- Ships with unit tests, Storybook stories, and interaction play functions.
- All avatar parts are exported from the package barrel.
