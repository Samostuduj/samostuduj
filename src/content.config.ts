import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Shared: how finished a piece of content is. Drives badges + "připravujeme" states.
const status = z
  .enum(["hotovo", "rozpracovano", "planovano"])
  .default("planovano");

// Blog — migrated from the Hugo `content/blog` section.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default("Samostuduj"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    summary: z.string().optional(),
  }),
});

// Obory — long-form field guides. `icon` maps to a key in Icon.astro.
const obory = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/obory" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string(),
    order: z.number().default(99),
    status,
    // Fuller, on-page description of the field — the /obory index leads with
    // this. Falls back to `summary` (the short SEO blurb) when absent.
    about: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Studijní plány — curriculum roadmaps, grouped by obor on the index.
const plany = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/plany" }),
  schema: z.object({
    title: z.string(),
    obor: z.string().optional(),
    level: z.enum(["úvod", "bakalář", "magistr"]).optional(),
    order: z.number().default(99),
    summary: z.string().optional(),
    status,
    draft: z.boolean().default(false),
  }),
});

// Aktuality — short, time-bound announcements (new content, calls for help,
// news, events). Surfaced in a site-wide strip, a homepage band, and /aktuality.
const aktuality = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/aktuality" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // Drives the type badge, icon, and per-type color.
    type: z
      .enum(["novy-obsah", "hledame", "novinka", "udalost"])
      .default("novinka"),
    // Optional CTA target (e.g. /plany/uvod-do-psychologie).
    link: z.string().optional(),
    // Prominence ladder. strip = site-wide strip + homepage band + archive;
    // hero = homepage band + archive; archive = /aktuality only (default).
    placement: z.enum(["strip", "hero", "archive"]).default("archive"),
    // Wins the single strip slot when several items are placement:strip.
    pinned: z.boolean().default(false),
    // Auto-hidden after this date (build-time filter).
    expires: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, obory, plany, aktuality };
