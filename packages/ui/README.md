# sharkui

[![npm version](https://img.shields.io/npm/v/sharkui.svg)](https://www.npmjs.com/package/sharkui)
[![license](https://img.shields.io/npm/l/sharkui.svg)](https://github.com/MarcGonzalezMoratona/sharkui/blob/main/LICENSE)

A React design system built on [shadcn-ui](https://ui.shadcn.com/) (Base UI + Tailwind CSS v4).

## Install

```bash
npm install sharkui
```

`react` and `react-dom` are peer dependencies (`^18 || ^19`).

## Usage

Import the stylesheet once at the root of your app, then use the components:

```tsx
import "sharkui/styles.css";
import { Button } from "sharkui";

export function App() {
  return <Button variant="secondary">Click me</Button>;
}
```

> The `sharkui/styles.css` import is handled by your bundler (Vite, Next.js, etc.).

## Components

- `Button` — variants: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`; sizes: `default`, `xs`, `sm`, `lg`, plus `icon*` sizes.

Also exported: `buttonVariants` (the `cva` config) and `cn` (the `clsx` + `tailwind-merge` helper).

## Documentation

Component explorer and interactive docs live in Storybook — see the [repository](https://github.com/MarcGonzalezMoratona/sharkui).

## License

MIT © Marc González Moratona
