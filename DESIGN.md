---
name: Samostuduj
description: The public content site for self-directed university-level study in Czechia & Slovakia.
colors:
  accent: "#575896"
  accent-dark: "#8b85cc"
  accent-contrast: "#ffffff"
  accent-contrast-dark: "#16131f"
  bg: "#fafafa"
  bg-dark: "#121212"
  surface: "#f1f1ee"
  surface-dark: "#1c1c1c"
  fg: "#212121"
  fg-dark: "#e0e0e0"
  muted: "#5f5f5f"
  muted-dark: "#9a9a9a"
  border: "#e2e2dc"
  border-dark: "#2c2c2c"
typography:
  display:
    fontFamily: "Source Code Pro, ui-monospace, SFMono-Regular, monospace"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Source Code Pro, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Source Code Pro, ui-monospace, SFMono-Regular, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Source Code Pro, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  card: "20px"
  section-y: "48px"
  gap: "16px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-contrast}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-contrast}"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.xl}"
    padding: "20px"
  card-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    typography: "{typography.label}"
  icon-tile:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent}"
    rounded: "{rounded.lg}"
    size: "40px"
---

# Design System: Samostuduj

## 1. Overview

**Creative North Star: "The Autodidact's Notebook"**

Samostuduj argues that you can study a university subject rigorously without a
university — so the site itself has to look like proof, not like a brochure. The
whole system reads as a self-learner's own study notebook: set entirely in
Source Code Pro (a monospace typeface), written in indigo pen ink, on a faintly
textured paper ground. It is text-forward, calm, and unmistakably hand-made by
someone who studies this way — never institutional, never a product funnel.

Density is generous and reading-first. Content sits in a single ~1024px column;
sections breathe with vertical rhythm rather than competing for attention. Color
is used with extreme restraint: the page is near-monochrome paper-and-ink, and
the one indigo accent earns its rarity. Depth is achieved with hairline borders
and tonal surfaces, not shadows — the page feels like paper, and paper doesn't
float. Honesty is a visual value: unfinished sections say *"Připravujeme"* in a
plain badge rather than faking completeness.

This system explicitly rejects the four things its audience distrusts:
corporate-university polish (stock smiles, institutional blue, prestige
signaling), slick-SaaS theater (gradient-mesh heroes, floating dashboard
mockups, "Get started free"), MOOC-catalog clutter (course-card walls, ratings,
upsells), and generic AI-generated grammar (cream/sand backgrounds, tracked
uppercase eyebrows on every section, gradient text, identical icon-card grids).

**Key Characteristics:**
- Monospace throughout — one typeface, many weights; the type *is* the brand.
- Paper-and-ink palette: near-monochrome surfaces, a single indigo accent.
- Flat by default — hairline borders and tonal layering, essentially no shadows.
- Reading-first single column (~max-w-5xl / 64rem), calm vertical rhythm.
- Honest states over polish theater.

## 2. Colors

A near-monochrome paper-and-ink palette with one saturated indigo accent, tuned
for both light and dark with contrast-checked pairs.

### Primary
- **Pen-Ink Indigo** (`#575896` light / `#8b85cc` dark): The single accent,
  sampled from the indigo ink of the brand's hand-drawn print collateral. Used
  for links, the primary button fill, the highlighted hero phrase, icon tiles
  (at 10% opacity behind an ink-colored glyph), and focus/hover affordances.
  Its scarcity is deliberate — it marks the *one* thing that matters per view.

### Neutral
- **Paper** (`#fafafa` light / `#121212` dark): The body background, carrying a
  subtle fractal-noise paper texture fixed behind all content.
- **Surface** (`#f1f1ee` light / `#1c1c1c` dark): Cards, dropdowns, and callout
  panels — one tonal step off paper, no shadow needed to separate them.
- **Ink** (`#212121` light / `#e0e0e0` dark): Primary body and heading text.
- **Faded Ink** (`#5f5f5f` light / `#9a9a9a` dark): Secondary text, captions,
  metadata, muted descriptions. Contrast-checked to stay ≥4.5:1 on paper.
- **Hairline** (`#e2e2dc` light / `#2c2c2c` dark): All borders and dividers —
  the primary structural device in place of shadows.

### Named Rules
**The One-Ink Rule.** Indigo is the only chromatic color in the system and
appears on roughly ≤10% of any view. If a second accent hue is ever tempting,
the answer is a weight change or a tonal surface, not another color.

**The Paper-Doesn't-Float Rule.** Depth comes from a hairline border or a
one-step tonal surface, never a drop shadow on content. Paper lies flat.

## 3. Typography

**Display Font:** Source Code Pro (with `ui-monospace, SFMono-Regular, monospace`)
**Body Font:** Source Code Pro (same family, regular weight)
**Label/Mono Font:** Source Code Pro (same family) — the whole system is mono.

**Character:** One monospace family carries everything, differentiated by weight
(300–700) and size rather than by pairing. Monospace signals rigor, craft, and a
maker's-tool honesty — it reads like study notes and source code, not marketing.
Because every glyph shares a width, hierarchy leans on weight contrast and
generous line-height (1.7 body) to stay readable in long-form Czech prose.

### Hierarchy
- **Display** (700, `clamp(2.25rem–3rem)`, lh 1.1, tracking -0.02em): Hero `h1`
  only. `text-wrap: balance`; tracking floors at -0.02em so mono glyphs never
  touch. One accent-colored phrase inside an otherwise ink headline.
- **Headline** (700, ~1.5rem, lh 1.2): Section `h2` on pages; card titles step
  down from here to ~1rem semibold.
- **Body** (400, 1rem, lh 1.7): Long-form prose and descriptions. Cap measure at
  65–75ch; the reading column already enforces this.
- **Label** (500, 0.75rem): Badges, eyebrow pills, nav links, metadata. Lower
  case by default — see the rule below.

### Named Rules
**The No-Tracked-Eyebrow Rule.** No small uppercase letter-spaced kicker above
sections. The hero's one rounded pill (*"Zdarma · svobodné licence · vlastním
tempem"*) is the single deliberate label of that kind; it is not repeated as
section scaffolding. Monospace + lowercase is the house voice.

## 4. Elevation

Effectively flat. The system conveys depth through **hairline borders and a
single tonal surface step**, not shadows — consistent with the paper metaphor.
Content cards, callouts, and the hero pill all sit flat on the page and separate
from the background by a 1px `--border` line and/or the `--surface` tone.

### Shadow Vocabulary
- **Floating menu only** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` — Tailwind `shadow-lg`): The *only* shadow in the
  system, reserved for the nav dropdown panel, which genuinely floats above
  content and needs to read as temporarily lifted. Nothing else uses it.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. The single permitted
shadow (`shadow-lg`) exists only on transient overlays (the nav dropdown). If a
card has a drop shadow, it's wrong — give it a `--border` and/or `--surface`
instead.

## 5. Components

### Buttons
- **Shape:** Gently rounded (8px, `rounded-lg`), padding `12px 20px`
  (`px-5 py-3`), medium weight.
- **Primary:** Indigo fill (`--accent`) with `--accent-contrast` text; hover
  drops to `opacity-90`. Used once per view for the main action.
- **Secondary / Ghost:** Transparent on paper with a 1px `--border`; text shifts
  to indigo on hover (`hover:text-accent`). For the lower-priority action beside
  a primary button.

### Chips / Badges
- **Status badge:** Rounded-full pill, 1px border, `px-2.5 py-0.5`, `text-xs`
  medium. Three states map to content status: *Hotovo* (`border-accent/40
  bg-accent/10 text-accent`), *Rozpracováno* (`border-border bg-surface text-fg`,
  prefixed with a small solid accent dot), *Připravujeme* (`border-border
  text-muted`).
- **Hero pill:** Rounded-full, `border-accent`, `text-accent`, `text-xs` — a
  single deliberate eyebrow, used once on the homepage hero only.

### Cards / Containers
- **Corner Style:** 12px (`rounded-xl`).
- **Background:** `--surface`, one tonal step off paper.
- **Shadow Strategy:** None (see Elevation). Separation is the `--border` line.
- **Border:** 1px `--border` at rest → `--border` shifts to `--accent` on hover
  for interactive cards (`hover:border-accent transition`).
- **Internal Padding:** 20px (`p-5`).
- **Icon tile:** 40px (`h-10 w-10`) `rounded-lg` square, `bg-accent/10` behind an
  `--accent` stroke icon — the recurring card-header motif.

### Navigation
- **Style:** Sticky top bar, 1px bottom `--border`, translucent paper
  (`bg-bg/85`) with `backdrop-blur-sm`. Logo (mark + lowercase "samostuduj"
  wordmark, bold, tight tracking) at left, links right-aligned.
- **Links:** `text-sm` medium, `rounded-md px-3 py-2`, `hover:text-accent`.
- **Dropdowns:** Native `<details>`/`<summary>` (no JS) with a chevron that
  rotates `group-open:rotate-180`; panel is a `--surface` card with the lone
  `shadow-lg`.
- **Mobile:** `<details>` hamburger expanding a full-width `--surface` panel;
  grouped sections labelled in muted text.
- **Theme toggle:** Bordered icon button, moon/sun swap, persists to
  `localStorage`, defaults to OS preference, set before paint to avoid flash.

### Icons
Lucide stroke icons, inlined as SVG paths in a local registry (viewBox 0 0 24 24,
`stroke-width: 2`, `currentColor`). Stroke weight and monospace-friendly geometry
match the hand-drawn feel — never filled, never a raster icon or icon font.

## 6. Do's and Don'ts

### Do:
- **Do** set everything in Source Code Pro; build hierarchy from weight (300–700)
  and size, not from a second typeface.
- **Do** keep indigo (`#575896` / `#8b85cc`) to ≤10% of any view — links, one
  primary button, one highlighted phrase, icon tiles.
- **Do** separate surfaces with a 1px `--border` and/or the `--surface` tone;
  keep content flat.
- **Do** state honesty plainly — use the *Připravujeme* / *Rozpracováno* badges
  for unfinished content instead of hiding or faking it.
- **Do** hold body prose to 65–75ch inside the ~64rem reading column, line-height
  1.7, with correct Czech diacritics at every breakpoint.
- **Do** verify WCAG AA in both themes (`--muted` body text stays ≥4.5:1 on
  `--bg`); ship a `prefers-reduced-motion` alternative for every transition.

### Don't:
- **Don't** look like a corporate university — no stock student photography, no
  institutional blue, no prestige signaling, no bloated nav.
- **Don't** look like a slick SaaS startup — no gradient-mesh hero, no floating
  dashboard mockup, no "Get started free" CTA spam.
- **Don't** look like a MOOC platform — no course-card walls, ratings, or upsell
  clutter.
- **Don't** ship generic AI grammar — no cream/sand body background, no uppercase
  tracked eyebrow above every section, no gradient text (`background-clip: text`),
  no endless identical icon-card grids.
- **Don't** put a drop shadow on content — `shadow-lg` is for the nav dropdown
  and nothing else.
- **Don't** introduce a second accent hue; reach for a weight change or a tonal
  surface instead (The One-Ink Rule).
- **Don't** use `border-left`/`border-right` >1px as a colored stripe on cards,
  callouts, or list items.
