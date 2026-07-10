import type { Context } from "@netlify/edge-functions";

// Content negotiation for AI agents. When a request asks for Markdown, serve
// the pre-built .md twin of the page (see src/pages/**/[...slug].md.ts and
// index.md.ts) instead of the full HTML — up to ~80% fewer tokens. Anything
// without a .md twin falls through to the normal HTML response.
export default async (request: Request, context: Context) => {
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("text/markdown")) return;

  const { pathname } = new URL(request.url);

  // Already Markdown, or a static asset with a file extension — leave it alone.
  if (pathname.endsWith(".md")) return;
  if (/\.[a-z0-9]+$/i.test(pathname)) return;

  const mdPath =
    pathname === "/" ? "/index.md" : pathname.replace(/\/+$/, "") + ".md";

  const res = await context.rewrite(mdPath);
  if (res.status === 404) return; // no Markdown twin → serve HTML

  const out = new Response(res.body, res);
  out.headers.set("Content-Type", "text/markdown; charset=utf-8");
  out.headers.set("Vary", "Accept");
  return out;
};

export const config = { path: "/*" };
