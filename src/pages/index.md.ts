import type { APIRoute } from "astro";

// Markdown twin of the homepage — the target of Accept: text/markdown on "/".
// Kept short on purpose; the full machine-readable index lives at /llms.txt.
const body = `# Samostuduj

> Vzdělávej se důkladně jako na vysoké škole — ale po svém. Materiály, kurzy a komunita pro samouky.

Samostuduj.cz je český web pro samouky: popisuje jednotlivé obory, nabízí kurzy inspirované vysokoškolskými programy a vede blog o samostudiu jako legitimní cestě vzdělávání.

## Rozcestník
- Obory: https://samostuduj.cz/obory
- Kurzy: https://samostuduj.cz/kurzy
- Blog: https://samostuduj.cz/blog
- O projektu: https://samostuduj.cz/o-projektu
- Manifest: https://samostuduj.cz/manifest

Kompletní strojově čitelný index: https://samostuduj.cz/llms.txt

---

Licence obsahu: CC-BY-SA 4.0
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
