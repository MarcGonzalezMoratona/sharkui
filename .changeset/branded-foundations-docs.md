---
"@marcgm/sharkui": patch
---

Add design-system Foundations docs and a branded preview mode to Storybook:

- **Typography** page featuring Raleway (titles) and Open Sans (body), loaded via self-hosted `@fontsource-variable` packages.
- **Colors** page with a systematically generated brand palette — primary/secondary/tertiary/neutral plus success/warning/error/info, each as a full `50 → 950` shade ramp from a shared lightness/chroma curve.
- **Brand** toolbar toggle (Neutral / Branded) that previews any component with the design-system theme applied. The library stays headless: the brand only re-maps the semantic CSS variables inside a Storybook-only overlay, so nothing changes in the published tokens.
