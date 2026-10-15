import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import manifest from "../data/letaky/manifest.json";

// /llms.txt — a curated, plain-text index for LLM agents (see llmstxt.org).
// Generated at build time from the same content collections the site renders,
// so it never drifts. Content is CC-BY-SA 4.0; we want agents to read it.

const SITE = "https://samostuduj.cz";

const line = (title: string, url: string, note?: string) =>
  `- [${title}](${url})${note ? `: ${note}` : ""}`;

export const GET: APIRoute = async () => {
  const [obory, kurzy, blog] = await Promise.all([
    getCollection("obory"),
    getCollection("kurzy", ({ data }) => !data.draft),
    getCollection("blog", ({ data }) => !data.draft),
  ]);

  obory.sort((a, b) => a.data.order - b.data.order);
  kurzy.sort((a, b) => a.data.order - b.data.order);
  blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const body = `# Samostuduj

> Vzdělávej se důkladně jako na vysoké škole — ale po svém. Materiály, kurzy a komunita pro samouky. Obsah je pod licencí CC-BY-SA 4.0.

Samostuduj.cz je český web pro samouky: popisuje jednotlivé obory, nabízí kurzy inspirované vysokoškolskými programy a vede blog o samostudiu jako legitimní cestě vzdělávání.

## Obory
${obory.map((o) => line(o.data.title, `${SITE}/obory/${o.id}`, o.data.summary)).join("\n")}

## Kurzy
${kurzy.map((p) => line(p.data.title, `${SITE}/kurzy/${p.id}`, p.data.summary)).join("\n")}

## Blog
${blog.map((b) => line(b.data.title, `${SITE}/blog/${b.id}`, b.data.summary)).join("\n")}

## Letáky
${manifest.flyers.map((f) => line(f.title, `${SITE}/letaky/${f.slug}`)).join("\n")}

## O projektu
${[
  line("O projektu", `${SITE}/o-projektu`, "co Samostuduj je a proč vzniká"),
  line("Manifest", `${SITE}/manifest`, "hodnoty a principy projektu"),
  line("Chci pomoct", `${SITE}/chci-pomoct`, "jak se zapojit"),
  line("FAQ", `${SITE}/faq`, "časté otázky"),
  line("Kontakt", `${SITE}/kontakt`),
].join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
