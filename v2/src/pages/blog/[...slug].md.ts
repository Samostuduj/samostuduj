import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { entryToMarkdown } from "../../lib/entry-markdown";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(entryToMarkdown(props.post, `/blog/${props.post.id}`), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
