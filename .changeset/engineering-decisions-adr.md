---
"@marcgm/sharkui": patch
---

Add an **Engineering › Decisions** section to Storybook — an Architecture Decision Record (ADR) log documenting the technical decisions behind the design system:

- Nine ADRs, each with **Context / Decision / Alternatives considered / Consequences**, covering Base UI as the primitive layer, Tailwind v4 CSS-first tokens, the headless brand overlay, the systematic OKLCH palette, the ESM per-module Rollup build, two-tier testing, oxlint, Changesets, and the component convention.
- An **Overview** page explaining the ADR format and how to add new records, surfaced in the sidebar right after Foundations.
- Enable `remark-gfm` in the Storybook docs pipeline so GitHub-Flavored Markdown (tables, strikethrough, task lists) renders in MDX — Storybook does not ship it by default.
