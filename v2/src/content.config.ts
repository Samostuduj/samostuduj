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
    ai: z.boolean().default(false), // show the "AI byla použita" notice
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

export const collections = { blog, obory, plany };
