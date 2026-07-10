import type { CollectionEntry } from "astro:content";

type MdEntry =
  | CollectionEntry<"blog">
  | CollectionEntry<"obory">
  | CollectionEntry<"plany">;

const SITE = "https://samostuduj.cz";

// Render a content entry as clean, standalone Markdown for AI agents: H1 title,
// an optional summary blockquote, the raw source body, and a source/license
// footer. This is the payload behind every /…​.md route and the Accept:
// text/markdown negotiation — far cheaper for agents than the full HTML page.
export function entryToMarkdown(entry: MdEntry, path: string): string {
  const summary = "summary" in entry.data ? entry.data.summary : undefined;
  const parts = [`# ${entry.data.title}`];
  if (summary) parts.push(`> ${summary}`);
  parts.push((entry.body ?? "").trim());
  parts.push(`---\n\nZdroj: ${SITE}${path} · Licence obsahu: CC-BY-SA 4.0`);
  return parts.filter(Boolean).join("\n\n") + "\n";
}
