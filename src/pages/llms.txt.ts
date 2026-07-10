import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// /llms.txt — a curated, plain-text index for LLM agents (see llmstxt.org).
// Generated at build time from the same content collections the site renders,
// so it never drifts. Content is CC-BY-SA 4.0; we want agents to read it.

const SITE = "https://samostuduj.cz";

const line = (title: string, url: string, note?: string) =>
  `- [${title}](${url})${note ? `: ${note}` : ""}`;

export const GET: APIRoute = async () => {
  const [obory, plany, blog] = await Promise.all([
    getCollection("obory"),
    getCollection("plany", ({ data }) => !data.draft),
    getCollection("blog", ({ data }) => !data.draft),
  ]);

  obory.sort((a, b) => a.data.order - b.data.order);
  plany.sort((a, b) => a.data.order - b.data.order);
  blog.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const body = `# Samostuduj

> Vzdělávej se důkladně jako na vysoké škole — ale po svém. Materiály, studijní plány a komunita pro samouky. Obsah je pod licencí CC-BY-SA 4.0.

Samostuduj.cz je český web pro samouky: popisuje jednotlivé obory, nabízí studijní plány inspirované vysokoškolskými programy a vede blog o samostudiu jako legitimní cestě vzdělávání.

## Obory
${obory.map((o) => line(o.data.title, `${SITE}/obory/${o.id}`, o.data.summary)).join("\n")}

## Studijní plány
${plany.map((p) => line(p.data.title, `${SITE}/plany/${p.id}`, p.data.summary)).join("\n")}

## Blog
${blog.map((b) => line(b.data.title, `${SITE}/blog/${b.id}`, b.data.summary)).join("\n")}

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
