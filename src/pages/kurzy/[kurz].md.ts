import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE = "https://samostuduj.cz";

export async function getStaticPaths() {
  const entries = await getCollection("kurzy", ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { kurz: entry.id }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props;
  const lekce = (await getCollection("lekce", ({ data }) => !data.draft))
    .filter((l) => l.id.startsWith(`${entry.id}/`))
    .sort((a, b) => a.data.order - b.data.order);

  const parts = [`# ${entry.data.title}`];
  if (entry.data.summary) parts.push(`> ${entry.data.summary}`);
  parts.push((entry.body ?? "").trim());
  if (lekce.length) {
    const list = lekce
      .map((l) => {
        const slug = l.id.slice(entry.id.length + 1);
        const note = l.data.summary ? `: ${l.data.summary}` : "";
        return `- [${l.data.title}](${SITE}/kurzy/${entry.id}/${slug})${note}`;
      })
      .join("\n");
    parts.push(`## Lekce\n\n${list}`);
  }
  parts.push(`---\n\nZdroj: ${SITE}/kurzy/${entry.id} · Licence obsahu: CC-BY-SA 4.0`);

  return new Response(parts.filter(Boolean).join("\n\n") + "\n", {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
