# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Model delegation policy

Split work by the kind of thinking it needs:

- **Keep on the current (default) model** — design and judgment work:
  - Design choices: visual/UX direction, architecture, data modeling, API shape, naming, trade-offs.
  - Verification: running the app, reviewing diffs, screenshotting/checking behavior, deciding whether something is correct.
- **Delegate to a Sonnet sub-agent** — straightforward implementation:
  - Once the approach is decided and the change is mechanical/unambiguous (wiring up a component to an agreed spec, porting content, boilerplate, repetitive edits), spawn a sub-agent with `model: sonnet` (via the Agent tool) to do the coding.
  - Give the sub-agent a precise spec so it doesn't need to make design decisions.

Rule of thumb: **I decide *what* and *how*; a Sonnet sub-agent writes the obvious code; I verify the result.** If an "implementation" task turns out to require real design decisions, pull it back to the current model rather than letting the sub-agent guess.

## Project

`samostuduj.cz` — a Czech self-study education site. The live site is the from-scratch **Astro** rebuild, now at the repo root and deployed on Netlify from `main` (see `netlify.toml`). The original Hugo site has been removed. Content is CC-BY-SA 4.0, site code is CC0.

## Manifest

The project's hard principles live in the Manifest (`src/pages/manifest.astro`, live at [samostuduj.cz/manifest](https://samostuduj.cz/manifest)) — read it before making contested content or product decisions; the site's soft public voice yields to it.

## Design context (Astro)

The design system lives in the code, not in a separate spec. When doing design work, read these first:

- **`src/styles/global.css`** — the source of truth for the theme: semantic CSS tokens (`--bg`, `--surface`, `--fg`, `--muted`, `--border`, `--accent`, `--accent-contrast`), their Tailwind v4 `@theme` utility mappings, and `.prose` styles. Light is the default; dark follows OS `prefers-color-scheme` or an explicit `.dark`/`.light` class.
- **`src/components/`** — reusable primitives already built: `Icon.astro` (inline Lucide SVG registry — check its keys before inventing an icon), `StatusBadge.astro` (`hotovo` / `rozpracovano` / `planovano` pills).
- **`src/content.config.ts`** — content collection schemas (`blog`, `obory`, `plany`).

Brand identity: **"The Autodidact's Notebook"** — Source Code Pro monospace throughout; the **One-Ink Rule** (accent ≤10% of the surface); **Paper-Doesn't-Float** (tonal surfaces + hairline borders, never drop shadows); subtle paper-noise body texture. Avoid template tells — no identical card grids, no per-section eyebrows. Reuse existing tokens and components before adding new ones.
