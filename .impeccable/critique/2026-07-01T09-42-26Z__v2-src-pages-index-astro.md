---
target: the homepage (/)
total_score: 32
p0_count: 0
p1_count: 1
timestamp: 2026-07-01T09-42-26Z
slug: v2-src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No active/current-page indicator in nav; theme toggle is icon-only, no label |
| 2 | Match System / Real World | 4 | Czech copy is warm and human; labels are plain-language |
| 3 | User Control and Freedom | 3 | Good (dark/light, no forced flows); mobile menu has 15 destinations, no grouping |
| 4 | Consistency and Standards | 4 | Disciplined token system; uniform card/border/radius vocabulary |
| 5 | Error Prevention | 3 | Static page, little to get wrong; blog grid would break with <3 posts |
| 6 | Recognition Rather Than Recall | 3 | "obory vs plány vs manifest vs letáky" model never explained on the page |
| 7 | Flexibility and Efficiency | 3 | Keyboard/no-JS friendly (`<details>` nav); no search, no skip-to-content |
| 8 | Aesthetic and Minimalist Design | 4 | Genuinely restrained; strong hierarchy, one accent, generous whitespace |
| 9 | Error Recovery | 2 | No empty/404 states surfaced; nothing to recover from but nothing offered |
| 10 | Help and Documentation | 3 | FAQ/O projektu in nav/footer, but homepage never explains the core model |
| **Total** | | **32/40** | **Strong — solid foundation, address weak areas** |

## Anti-Patterns Verdict

**Does this look AI-generated? No.** This is the headline finding, and it holds up under both assessments.

**LLM assessment:** The page dodges essentially every anti-reference — no gradient-mesh hero, no floating dashboard, no cream/sand background, no course-card wall, no prestige signaling, no gradient text. The monospace Source Code Pro across headings and body is a strong, unusual, deliberate commitment that immediately reads as "autodidact's notebook / terminal," not template output. The One-Ink Rule holds (~8 accent nodes in the hero viewport, indigo well under 10% of any view). Paper-Doesn't-Float is respected — borders and tonal `bg-surface` cards, the lone `shadow-lg` reserved for the nav dropdown. The single hero pill is the only tracked-style label (No-Tracked-Eyebrow discipline intact). The one soft spot: the "Pro koho" audience section is a genuinely identical 4-up icon-card grid — the closest thing on the page to the "identical icon-card grids" anti-reference.

**Deterministic scan:** CLI detector returned **0 findings, exit code 0 (clean)** across index.astro, Header.astro, BaseLayout.astro, and StatusBadge.astro. Browser overlay (injected on the correct page at :4322) reported a single anti-pattern: `single-font` — "only font used is Source Code Pro." This is a **false positive**: Source Code Pro is the deliberate brand typeface, loaded in 5 weights from the brand kit and exposed as `--font-mono`. The mono-only look is intended identity, not accidental monotony. Net: the detector confirms the LLM verdict — this page is not slop.

## Overall Impression

A genuinely good, distinctive site with real craft — it earns trust that it's *not* a scammy MOOC or a corporate-university clone. The single biggest opportunity is not aesthetic but argumentative: **the homepage never actually makes its own case.** The stated purpose is to convince a skeptic that self-study can rival a degree, then hand them a first step. The hero asserts "stejně důkladně jako na vysoké škole" in one clause and then the page pivots to audience cards and blog posts — the persuasion and the orientation never happen.

## What's Working

1. **Committed, distinctive type system.** Monospace Source Code Pro across headings and body is the single strongest anti-slop signal — it *is* the notebook/terminal north star, and nothing generic ships this way. It's the reason the "AI made this" reaction never fires.
2. **Disciplined color and elevation.** The One-Ink Rule genuinely holds and Paper-Doesn't-Float is respected. All measured contrasts pass WCAG AA in both themes (muted-on-bg 6.12 light / 6.66 dark; accent-on-bg 6.66 light / 5.64 dark; white CTA text on accent 6.95).
3. **Empathetic, non-institutional copy.** "Ze školy sis odnesl(a) spíš pachuť než motivaci?" and "Nenašel jsem se? To je v pořádku. Žádné škatulky." speak human-to-human and disarm the skeptical, intimidated persona — the opposite of stock-smiling-student prestige copy.

## Priority Issues

**[P1] The homepage never makes its core argument or explains its own model.**
- *Why it matters:* The target user is skeptical and deciding if self-study is legit. An unsupported "jako na vysoké škole" claim plus undefined jargon (obory / plány / manifest / letáky) leaves the core objection unanswered — the primary job-to-be-done fails.
- *Fix:* Add one section between hero and blog that does persuasion + orientation: a short "Jak to funguje" naming the three artifacts in one line each (obory = field maps, plány = step-by-step study plans, manifest = why we believe this) plus one piece of evidence/reassurance that self-study can go as deep as a degree. This is also the missing emotional-arc beat.
- *Suggested command:* /impeccable craft (new "how it works" section) or /impeccable clarify (copy)

**[P2] The audience grid is the page's one template-shaped, low-value block.**
- *Why it matters:* Four identical icon-square + title + muted-text cards categorizing the reader — the closest thing to an anti-reference violation. It also sorts people into boxes right after the copy promised "žádné škatulky" (no boxes): a tonal contradiction.
- *Fix:* Break the visual uniformity (drop the icon squares for something more notebook-like, vary layout) or — better — replace it with the "how it works / first step" content from P1. If kept, cut to 3 and reword from labeling *types* toward *situations*.
- *Suggested command:* /impeccable bolder or /impeccable layout

**[P2] No clear single "first step" for a decided reader.**
- *Why it matters:* The JTBD explicitly includes "find a concrete first step." The hero offers two co-equal-feeling CTAs ("Prozkoumat studijní plány" filled, "Číst blog" bordered), and the page *ends* on blog cards. A convinced reader has no obvious "start here," and the page leans blog-ward relative to the study tools that are the actual product.
- *Fix:* Make one path unambiguously the beginning (e.g., "Začni tady" → a starter plán or the obory index), demote blog to clearly secondary, and add a closing CTA band so the end of the page points forward, not sideways.
- *Suggested command:* /impeccable layout or /impeccable clarify

**[P3] Nav breadth overwhelms orientation, especially on mobile.**
- *Why it matters:* ~15 destinations are exposed; the mobile menu renders the whole flat tree at once with no hierarchy cue. "Letáky" sits as an unexplained top-level peer. Casey (distracted mobile) meets a wall of links with no "start here."
- *Fix:* Lead the mobile menu and header with the two things newcomers need — Obory and Studijní plány — and tuck lower-traffic items (Letáky, Kontakt) further down. Add an active/current-page state.
- *Suggested command:* /impeccable layout or /impeccable adapt

**[P3] Theme toggle and nav lack status/current-state affordances.**
- *Why it matters:* "Visibility of system status" is the weakest heuristic; these are cheap wins.
- *Fix:* Add `aria-current` / an underline for the active section; give the theme toggle a discernible state.
- *Suggested command:* /impeccable polish

## Persona Red Flags

**Jordan (first-timer, desktop):** Loves the hero — feels seen by the "pachuť než motivaci" line. Then hits "Pro koho," thinks *okay, I'm one of these people, now what?* — no answer. Scrolls into blog posts and realizes the homepage never told them what obory or plány actually are or gave them a starting move. *Failing elements: the audience grid (no forward motion), absence of a "how it works" section, the blog block as the page's closer.*

**Casey (distracted, mobile, late):** Hero works well at 390px — clean, no overflow, CTAs are comfortable 48–50px tap targets. Then taps the hamburger and gets 15 flat links with two uppercase group headers and no "start here." Low attention, low patience — likely bounces from the menu. *Failing elements: mobile menu (15 undifferentiated destinations, no lead item), "Letáky" as an unexplained peer.*

**Skeptical late-night CZ/SK reader ("is this legit?") — the persona the site exists for, and the one most under-served:** The hero claims "stejně důkladně jako na vysoké škole" then provides zero evidence, structure, or credibility signal to back it — no sample of a plán's rigor, no explanation of the method, no manifest teaser. A skeptic reads an emotional promise followed by lifestyle-audience cards and recent blog posts, and their internal "prove it" stays unanswered. They may respect the taste, but the *argument* is never made on the page that's supposed to make it. *Failing elements: the hero's unsupported claim, the missing persuasion/how-it-works section, the manifest being invisible from the homepage.*

## Minor Observations

- Mobile menu is `position: absolute` and overlays content with no scrim/backdrop; the hero shows through faintly, reading slightly unfinished. An opaque `bg-surface` panel or subtle overlay would tidy it.
- Blog section hard-codes a 3-column grid and `.slice(0,3)`; with 1–2 posts the row has awkward empty tracks. Currently fine (3 posts exist).
- Icon-square background `bg-accent/10` can look faintly muddy on the textured paper bg in light mode.
- `scroll-behavior: smooth` is global with no `prefers-reduced-motion` guard — cheap a11y nicety to add.
- The whole page leans blog-ward: second CTA "Číst blog", section "Všechny články →", and footer all point at editorial, relative to the study tools that are the product.

## Questions to Consider

1. If the homepage's job is to convince a skeptic that self-study can rival a degree — where on this page is the argument actually made?
2. Should the last thing a visitor sees be "latest blog posts"? Peak-end says the closer should leave them feeling capable and pointed at a first step.
3. The copy says "žádné škatulky" (no boxes) and then the next section sorts the reader into four boxes. Which is the real brand — and should the audience grid exist at all?
4. "Obory," "plány," "manifest," "letáky" — four nouns a newcomer can't rank. If you could teach a first-timer only one, which is it, and why isn't the page built around that door?
5. Is monospace-everything a genuine identity or a costume? It's the best anti-slop asset today — but at a full plán's reading length, does the notebook metaphor still serve legibility?
