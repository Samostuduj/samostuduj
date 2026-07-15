import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";
import puppeteer from "puppeteer";

// Build-time flyer pipeline: fetches published A5 flyers (Markdown + optional
// logo) from the public `nktrjsk/letaky` repo, renders each to print-ready
// PDFs (color + b/w) and PNG previews with Puppeteer, and writes a manifest
// consumed by src/pages/letaky.astro. Runs on `astro:config:setup` for both
// `astro dev` and `astro build` (not dev-gated), like scripts/brand-kit.mjs.
//
// Bump RENDERER_VERSION whenever the HTML/CSS render pipeline changes in a
// way that should invalidate the on-disk cache and force a re-render.
const RENDERER_VERSION = 1;

const REPO = "nktrjsk/letaky";
const API_TREE_URL = `https://api.github.com/repos/${REPO}/git/trees/main?recursive=1`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main`;

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LETAKY_DIR = path.join(ROOT, ".letaky");
const CACHE_FILE = path.join(LETAKY_DIR, "cache.json");
const RENDER_DIR = path.join(LETAKY_DIR, "render");
const PUBLIC_ROOT = path.join(ROOT, "public", "letaky", "soubory");
const DATA_DIR = path.join(ROOT, "src", "data", "letaky");
const MANIFEST_FILE = path.join(DATA_DIR, "manifest.json");

const FONT_CSS_FILES = [
  path.join(ROOT, "node_modules", "@fontsource-variable", "fraunces", "full.css"),
  path.join(ROOT, "node_modules", "@fontsource-variable", "fraunces", "full-italic.css"),
  path.join(ROOT, "node_modules", "@fontsource", "crimson-pro", "400.css"),
  path.join(ROOT, "node_modules", "@fontsource", "crimson-pro", "600.css"),
  path.join(ROOT, "node_modules", "@fontsource", "crimson-pro", "400-italic.css"),
];
const PAGE_CSS_FILE = path.join(ROOT, "scripts", "letaky-page.css");

function fileHref(absPath) {
  return pathToFileURL(absPath).href;
}

function ghHeaders() {
  const headers = { "User-Agent": "samostuduj-letaky-build" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

// ─── Fetch phase ─────────────────────────────────────────────────────────

async function fetchTree() {
  const res = await fetch(API_TREE_URL, { headers: ghHeaders() });
  if (!res.ok) {
    throw new Error(`letaky: GitHub tree fetch failed (${res.status} ${res.statusText})`);
  }
  const json = await res.json();
  return Array.isArray(json.tree) ? json.tree : [];
}

/** Group `flyers/<slug>/v<N>.md` blobs by slug, keeping only the highest N. */
function pickLatestVersions(tree) {
  const re = /^flyers\/([^/]+)\/v(\d+)\.md$/;
  const bySlug = new Map();
  for (const entry of tree) {
    if (entry.type !== "blob") continue;
    const m = re.exec(entry.path);
    if (!m) continue;
    const slug = m[1];
    const version = Number(m[2]);
    const existing = bySlug.get(slug);
    if (!existing || version > existing.version) {
      bySlug.set(slug, { slug, version, path: entry.path });
    }
  }
  return [...bySlug.values()];
}

function unquote(v) {
  if (v == null) return v;
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
    return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return v;
}

/** Same frontmatter contract as flyer-editor's src/lib/flyerFile.ts:
 *  flat `key: value` lines, optionally double-quoted string values. */
function parseFrontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!m) throw new Error("letaky: file is missing its frontmatter block");
  const [, block, body] = m;
  const raw = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    raw[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return {
    fm: {
      version: Number(raw.version),
      title: unquote(raw.title) ?? "",
      org: unquote(raw.org) ?? "",
      year: unquote(raw.year) ?? "",
      web: unquote(raw.web) ?? "",
      fontSize: Number(raw.fontSize),
      palette: raw.palette === "bw" ? "bw" : "color",
      logo: raw.logo && raw.logo !== "null" ? raw.logo : null,
      publishedAt: unquote(raw.publishedAt) ?? "",
    },
    body,
  };
}

async function fetchFlyer({ slug, version, path: filePath }) {
  const rawUrl = `${RAW_BASE}/${filePath}`;
  const res = await fetch(rawUrl, { headers: ghHeaders() });
  if (!res.ok) throw new Error(`letaky: raw fetch failed for ${filePath} (${res.status})`);
  const raw = await res.text();
  const { fm, body } = parseFrontmatter(raw);
  const sections = body.split(/\n\s*---\s*\n/);

  let logoBuffer = null;
  if (fm.logo) {
    const logoUrl = `${RAW_BASE}/flyers/${slug}/${fm.logo}`;
    const logoRes = await fetch(logoUrl, { headers: ghHeaders() });
    if (!logoRes.ok) {
      throw new Error(`letaky: logo fetch failed for flyers/${slug}/${fm.logo} (${logoRes.status})`);
    }
    logoBuffer = Buffer.from(await logoRes.arrayBuffer());
  }

  return { slug, version, raw, fm, body, sections, logoBuffer };
}

async function fetchAll() {
  const tree = await fetchTree();
  const latest = pickLatestVersions(tree);
  return Promise.all(latest.map(fetchFlyer));
}

// ─── Cache ───────────────────────────────────────────────────────────────

function readCache() {
  if (!existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeCache(cache) {
  mkdirSync(LETAKY_DIR, { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + "\n");
}

function outputPaths(slug) {
  const dir = path.join(PUBLIC_ROOT, slug);
  return {
    dir,
    pdfColor: path.join(dir, `${slug}-barevny.pdf`),
    pdfBw: path.join(dir, `${slug}-cernobily.pdf`),
    md: path.join(dir, `${slug}.md`),
  };
}

function previewPaths(slug, pageCount) {
  const dir = path.join(PUBLIC_ROOT, slug);
  return Array.from({ length: pageCount }, (_, i) => path.join(dir, `nahled-${i + 1}.png`));
}

function needsRender(flyer, cache) {
  const entry = cache[flyer.slug];
  if (!entry) return true;
  if (entry.version !== flyer.version) return true;
  if (entry.publishedAt !== flyer.fm.publishedAt) return true;
  if (entry.rendererVersion !== RENDERER_VERSION) return true;

  const out = outputPaths(flyer.slug);
  if (!existsSync(out.pdfColor) || !existsSync(out.pdfBw) || !existsSync(out.md)) return true;
  if (previewPaths(flyer.slug, flyer.sections.length).some((p) => !existsSync(p))) return true;

  return false;
}

// ─── Render phase (Puppeteer) ────────────────────────────────────────────

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

// Verbatim port of PreviewPane.tsx's fitTitles, run client-side after fonts
// load: max 34pt / min 20pt / step 0.5, measured with overflow hidden +
// nowrap, falling back to wrapping if still overflowing at the minimum size,
// then restoring overflow:visible so descenders aren't clipped.
const FIT_TITLES_SCRIPT = `
function fitTitles(root) {
  root.querySelectorAll('.page-title').forEach(function (el) {
    var max = 34, min = 20;
    el.style.overflow = 'hidden';
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = max + 'pt';

    var size = max;
    while (el.scrollWidth > el.offsetWidth && size > min) {
      size -= 0.5;
      el.style.fontSize = size + 'pt';
    }

    if (el.scrollWidth > el.offsetWidth) {
      el.style.whiteSpace = 'normal';
    }

    el.style.overflow = 'visible';
  });
}
document.fonts.ready.then(function () {
  fitTitles(document.body);
  window.__READY = true;
});
`.trim();

function renderPageHtml(flyer, palette, logoFileName) {
  const metaLine = [flyer.fm.org, flyer.fm.year].filter(Boolean).map(escapeHtml).join(" · ");

  const pagesHtml = flyer.sections
    .map((section, i) => {
      const bodyHtml = marked.parse(section.trim(), { gfm: true });
      const titleBlock =
        i === 0
          ? `
    <div class="page-title-block">
      <div class="page-title-area">
        <div class="page-title">${escapeHtml(flyer.fm.title)}</div>
        <div class="page-meta">${metaLine}</div>
      </div>
      ${flyer.fm.logo && logoFileName ? `<img class="page-logo" src="${logoFileName}" alt="">` : ""}
    </div>`
          : "";
      return `
  <div class="page" data-palette="${palette}" style="--base: ${flyer.fm.fontSize}pt">${titleBlock}
    <div class="page-content">${bodyHtml}</div>
    <div class="page-footer">
      <span>${escapeHtml(flyer.fm.org)}</span>
      <span>${flyer.fm.web ? `${escapeHtml(flyer.fm.web)} · ` : ""}CC BY-SA 4.0</span>
    </div>
  </div>`;
    })
    .join("\n");

  const fontLinks = FONT_CSS_FILES.map((p) => `<link rel="stylesheet" href="${fileHref(p)}">`).join("\n");

  return `<!doctype html>
<html><head><meta charset="utf-8">
${fontLinks}
<link rel="stylesheet" href="${fileHref(PAGE_CSS_FILE)}">
</head><body>
${pagesHtml}
<script>
${FIT_TITLES_SCRIPT}
</script>
</body></html>
`;
}

const VIEWPORT = { width: 900, height: 1400, deviceScaleFactor: 2 };

async function renderFromHtmlFile(browser, htmlPath) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.goto(fileHref(htmlPath), { waitUntil: "networkidle0" });
  await page.waitForFunction(() => window.__READY);
  return page;
}

async function renderFlyer(browser, flyer, logger) {
  mkdirSync(RENDER_DIR, { recursive: true });
  const out = outputPaths(flyer.slug);
  mkdirSync(out.dir, { recursive: true });

  let logoFileName = null;
  if (flyer.fm.logo && flyer.logoBuffer) {
    logoFileName = `${flyer.slug}-${flyer.fm.logo}`;
    writeFileSync(path.join(RENDER_DIR, logoFileName), flyer.logoBuffer);
  }

  const htmlPathFor = (palette) => path.join(RENDER_DIR, `${flyer.slug}-${palette}.html`);
  for (const palette of ["color", "bw"]) {
    writeFileSync(htmlPathFor(palette), renderPageHtml(flyer, palette, logoFileName));
  }

  // PDFs for both palettes.
  for (const [palette, pdfPath] of [
    ["color", out.pdfColor],
    ["bw", out.pdfBw],
  ]) {
    const page = await renderFromHtmlFile(browser, htmlPathFor(palette));
    try {
      await page.pdf({ path: pdfPath, preferCSSPageSize: true, printBackground: true });
    } finally {
      await page.close();
    }
  }

  // PNG previews from the published palette's HTML only.
  const previewPage = await renderFromHtmlFile(browser, htmlPathFor(flyer.fm.palette));
  try {
    const pageEls = await previewPage.$$(".page");
    for (let i = 0; i < pageEls.length; i++) {
      await pageEls[i].screenshot({ path: path.join(out.dir, `nahled-${i + 1}.png`) });
    }
  } finally {
    await previewPage.close();
  }

  writeFileSync(out.md, flyer.raw);

  logger?.info(`letaky: rendered ${flyer.slug} (v${flyer.version})`);
}

// ─── Manifest ────────────────────────────────────────────────────────────

function buildManifest(flyers) {
  const flyerEntries = flyers.map((flyer) => {
    const publicDir = `/letaky/soubory/${flyer.slug}`;
    return {
      slug: flyer.slug,
      title: flyer.fm.title,
      version: flyer.version,
      palette: flyer.fm.palette,
      publishedAt: flyer.fm.publishedAt,
      org: flyer.fm.org,
      year: flyer.fm.year,
      web: flyer.fm.web,
      fontSize: flyer.fm.fontSize,
      pages: flyer.sections.length,
      body: flyer.body,
      files: {
        pdfColor: `${publicDir}/${flyer.slug}-barevny.pdf`,
        pdfBw: `${publicDir}/${flyer.slug}-cernobily.pdf`,
        md: `${publicDir}/${flyer.slug}.md`,
        previews: flyer.sections.map((_, i) => `${publicDir}/nahled-${i + 1}.png`),
      },
    };
  });

  flyerEntries.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));

  return { fetchedAt: new Date().toISOString(), flyers: flyerEntries };
}

// ─── Orchestration ───────────────────────────────────────────────────────

async function run(logger) {
  let flyers;
  try {
    flyers = await fetchAll();
  } catch (err) {
    if (existsSync(MANIFEST_FILE)) {
      logger?.warn(
        `letaky: fetch failed (${err instanceof Error ? err.message : err}); keeping existing manifest + files`,
      );
      return;
    }
    throw err;
  }

  const cache = readCache();
  const toRender = flyers.filter((flyer) => needsRender(flyer, cache));

  if (toRender.length > 0) {
    let browser;
    try {
      browser = await puppeteer.launch();
    } catch (err) {
      throw new Error(
        `letaky: Puppeteer failed to launch (${err instanceof Error ? err.message : err})`,
      );
    }
    try {
      for (const flyer of toRender) {
        await renderFlyer(browser, flyer, logger);
      }
    } finally {
      await browser.close();
    }
  }

  const newCache = {};
  for (const flyer of flyers) {
    newCache[flyer.slug] = {
      version: flyer.version,
      publishedAt: flyer.fm.publishedAt,
      rendererVersion: RENDERER_VERSION,
    };
  }
  writeCache(newCache);

  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(MANIFEST_FILE, JSON.stringify(buildManifest(flyers), null, 2) + "\n");

  logger?.info(
    `letaky: fetched ${flyers.length}, rendered ${toRender.length}, cached ${flyers.length - toRender.length}`,
  );
}

/** @returns {import('astro').AstroIntegration} */
export default function letaky() {
  return {
    name: "letaky",
    hooks: {
      "astro:config:setup": async ({ logger }) => run(logger),
    },
  };
}
