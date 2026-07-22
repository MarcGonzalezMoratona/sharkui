// Brand color system, generated from the brand hue.
//
// One shared lightness/chroma curve is applied to every family; only the hue
// and the family's max chroma change. That is what keeps the whole palette
// visually consistent (same idea as Tailwind's scales, but systematic).
//
// Families:
//   Brand   → primary (teal, brand), secondary, tertiary, neutral
//   Status  → success, warning, error, info
//
// Documentation-only: values are oklch and are NOT wired into
// packages/ui styles.css.

export type Shades = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

// Lightness per step (shared by every family).
const L: Record<number, number> = {
  50: 0.971,
  100: 0.938,
  200: 0.885,
  300: 0.812,
  400: 0.715,
  500: 0.6,
  600: 0.52,
  700: 0.448,
  800: 0.378,
  900: 0.302,
  950: 0.221,
};

// Chroma as a fraction of the family's max chroma (shared by every family).
const C_FRAC: Record<number, number> = {
  50: 0.18,
  100: 0.32,
  200: 0.48,
  300: 0.66,
  400: 0.86,
  500: 1.0,
  600: 0.98,
  700: 0.92,
  800: 0.8,
  900: 0.62,
  950: 0.46,
};

/** Build a full 50→950 ramp for a given hue and peak chroma. */
function scale(hue: number, chromaMax: number): Shades {
  const out = {} as Shades;
  for (const step of STEPS) {
    const c = (C_FRAC[step] * chromaMax).toFixed(3);
    out[step] = `oklch(${L[step]} ${c} ${hue})`;
  }
  return out;
}

// --- Brand ----------------------------------------------------------------
// primary is the brand teal (shade 500 ≈ oklch(0.6 0.103 184.7)).
// secondary/tertiary are cool harmonics; neutral is a near-gray navy tint.
export const brand = {
  primary: scale(184.7, 0.104),
  secondary: scale(255, 0.1),
  tertiary: scale(300, 0.11),
  neutral: scale(260, 0.028),
};

// --- Status ---------------------------------------------------------------
export const status = {
  success: scale(150, 0.13),
  warning: scale(80, 0.145),
  error: scale(27, 0.17),
  info: scale(230, 0.115),
};

export const palette = { ...brand, ...status };
