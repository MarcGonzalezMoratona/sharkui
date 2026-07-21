<p align="center">
  <img src="https://raw.githubusercontent.com/MarcGonzalezMoratona/sharkui/main/assets/branding/logo-npm.png" alt="Shark UI" width="96" height="96" />
</p>

<h1 align="center">Shark UI</h1>

[![npm version](https://img.shields.io/npm/v/@marcgm/sharkui.svg)](https://www.npmjs.com/package/@marcgm/sharkui)
[![license](https://img.shields.io/npm/l/@marcgm/sharkui.svg)](https://github.com/MarcGonzalezMoratona/sharkui/blob/main/LICENSE)

A React design system built on [shadcn-ui](https://ui.shadcn.com/) (Base UI + Tailwind CSS v4).

## Install

```bash
npm install @marcgm/sharkui
```

`react` and `react-dom` are peer dependencies (`^18 || ^19`).

## Usage

Import the stylesheet once at the root of your app, then use the components:

```tsx
import "@marcgm/sharkui/styles.css";
import { Button } from "@marcgm/sharkui";

export function App() {
  return <Button variant="secondary">Click me</Button>;
}
```

> The `@marcgm/sharkui/styles.css` import is handled by your bundler (Vite, Next.js, etc.).

## Components

- `Button` — variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`; sizes: `default`, `xs`, `sm`, `lg`, plus `icon*` sizes.

Also exported: `buttonVariants` (the `cva` config) and `cn` (the `clsx` + `tailwind-merge` helper).

## Documentation

Component explorer and interactive docs live in Storybook — see the [repository](https://github.com/MarcGonzalezMoratona/sharkui).

## License

MIT © Marc González Moratona
