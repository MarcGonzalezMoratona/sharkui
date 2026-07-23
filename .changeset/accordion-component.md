---
"@marcgm/sharkui": minor
---

Add the **Accordion** component — a disclosure widget built on Base UI, exporting `Accordion`, `AccordionItem`, `AccordionTrigger`, and `AccordionContent`:

- **Single and multiple modes** — one panel open at a time by default, or set `multiple` to keep several open. Controlled (`value`) and uncontrolled (`defaultValue`) usage, plus `disabled` at the root or per item.
- **Accessible by default** — each trigger is a `<button>` inside a heading with `aria-expanded`/`aria-controls`, panels expose `role="region"`, and triggers stay in the natural tab order (Base UI dropped roving focus per the updated APG guidance).
- **Storybook** — `Default`, `Multiple`, `Disabled`, and `KeyboardNavigation` stories, with `argTypes` grouped into `State`, `Behavior`, `Events`, and `Content` categories.
- **Tests** — unit tests (Vitest) covering slots, open state, single/multiple toggling, controlled value, `onValueChange`, and disabled behavior, plus interaction play functions run in-browser.
