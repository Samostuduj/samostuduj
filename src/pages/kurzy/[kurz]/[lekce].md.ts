import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { entryToMarkdown } from "../../../lib/entry-markdown";

export async function getStaticPaths() {
  const entries = await getCollection("lekce", ({ data }) => !data.draft);
  return entries.map((entry) => {
    const [kurz, lekce] = entry.id.split("/");
    return { params: { kurz, lekce }, props: { entry } };
  });
}

export const GET: APIRoute = ({ props }) =>
  new Response(entryToMarkdown(props.entry, `/kurzy/${props.entry.id}`), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
