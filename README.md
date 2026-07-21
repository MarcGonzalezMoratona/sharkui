<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/branding/icon-filled-alt.svg">
    <img alt="Shark UI" src="assets/branding/icon-filled.svg" width="96" height="96">
  </picture>
</p>

<h1 align="center">Shark UI</h1>

<p align="center">
  A React design system built on <a href="https://ui.shadcn.com/">shadcn-ui</a> — Base UI + Tailwind CSS v4.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@marcgm/sharkui"><img src="https://img.shields.io/npm/v/@marcgm/sharkui.svg" alt="npm version"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/@marcgm/sharkui.svg" alt="license"></a>
</p>

## Install

```bash
npm install @marcgm/sharkui
```

```tsx
import "@marcgm/sharkui/styles.css";
import { Button } from "@marcgm/sharkui";

export function App() {
  return <Button variant="secondary">Click me</Button>;
}
```

## Documentation

Interactive component explorer built with Storybook, deployed on Vercel:
**https://sharkui.vercel.app** _(live once deployed)_.

## Monorepo

```
packages/ui     → the published library (npm: @marcgm/sharkui)
apps/docs       → Storybook (component docs, deployed to Vercel)
assets/branding → logo source files (SVG + rendered PNG)
```

Built with pnpm workspaces.

```bash
pnpm install        # install all workspaces
pnpm dev            # run Storybook locally
pnpm -r build       # build every package
```

## Tech stack

React 19 · TypeScript · Tailwind CSS v4 · Base UI · shadcn-ui · tsup · Storybook · Vitest · pnpm

## License

MIT © Marc González Moratona
