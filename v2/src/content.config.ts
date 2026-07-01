import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

// Studijní plány — stubbed for the rebuild; schema will firm up during migration.
const plany = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/plany" }),
  schema: z.object({
    title: z.string(),
    obor: z.string().optional(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, plany };
