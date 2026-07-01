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

`samostuduj.cz` — a Czech self-study education site. The live site is built with **Hugo** (repo root); a from-scratch **Astro** rebuild lives on the `astro-rebuild` branch under `v2/` (see issue #7). Content is CC-BY-SA 4.0, site code is CC0.
