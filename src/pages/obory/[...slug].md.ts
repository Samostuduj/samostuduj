import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { entryToMarkdown } from "../../lib/entry-markdown";

export async function getStaticPaths() {
  const entries = await getCollection("obory");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(entryToMarkdown(props.entry, `/obory/${props.entry.id}`), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
