import type { APIRoute } from "astro";
import manifest from "../../data/letaky/manifest.json";

const SITE = "https://samostuduj.cz";

export async function getStaticPaths() {
  return manifest.flyers.map((flyer) => ({
    params: { slug: flyer.slug },
    props: { flyer },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { flyer } = props;
  const body = `# ${flyer.title}\n\n${flyer.body.trim()}\n\n---\n\nZdroj: ${SITE}/letaky/${flyer.slug} · Licence obsahu: CC-BY-SA 4.0\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
