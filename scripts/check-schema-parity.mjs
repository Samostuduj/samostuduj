// Schema-parity guard — keeps the two places that declare content fields in
// sync: the Astro/Zod collections in src/content.config.ts and the Keystatic
// CMS fields in keystatic.config.ts. They're authored independently and drift
// silently — a field added to one but not the other builds fine yet makes
// Keystatic reject the item at edit time. This runs as npm's `prebuild` hook,
// so `npm run build` (locally and on Netlify) aborts loudly on any divergence.
//
// It compares only the *set of frontmatter field keys* per shared collection,
// not their types — Zod and Keystatic model types differently on purpose, and
// a missing/extra key is the drift that actually breaks. Keystatic's body
// field (`contentField`, always `content` here) has no Zod counterpart and is
// excluded.
//
// The configs import virtual modules (`astro:content`) that only resolve inside
// Astro's build, so we can't import and introspect them from plain Node —
// hence a small textual scan of the source instead.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_BODY_FIELD = "content"; // Keystatic-only markdoc body field.

/**
 * Extract the top-level property keys of the object literal whose opening `{`
 * is at `openBraceIndex` in `src`. Handles nested brackets, strings, template
 * literals, and comments; captures both `key: value` and shorthand `key`.
 */
function objectKeys(src, openBraceIndex) {
  const keys = [];
  let i = openBraceIndex + 1;
  let depth = 0; // nesting relative to the object body
  let expectKey = true; // at a position where a property key may start
  const isIdentStart = (c) => /[A-Za-z_$]/.test(c);
  const isIdentChar = (c) => /[A-Za-z0-9_$]/.test(c);

  while (i < src.length) {
    const c = src[i];

    // Comments.
    if (c === "/" && src[i + 1] === "/") {
      i = src.indexOf("\n", i);
      if (i === -1) break;
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      continue;
    }

    // Strings / template literals — skipped wholesale.
    if (c === '"' || c === "'" || c === "`") {
      i++;
      while (i < src.length) {
        if (src[i] === "\\") { i += 2; continue; }
        if (src[i] === c) { i++; break; }
        i++;
      }
      continue;
    }

    // Whitespace.
    if (/\s/.test(c)) { i++; continue; }

    // A property key can only begin at depth 0 in key position.
    if (depth === 0 && expectKey && isIdentStart(c)) {
      let j = i + 1;
      while (j < src.length && isIdentChar(src[j])) j++;
      keys.push(src.slice(i, j));
      expectKey = false; // consume until the next top-level comma
      i = j;
      continue;
    }

    // Bracket bookkeeping.
    if (c === "{" || c === "(" || c === "[") { depth++; i++; continue; }
    if (c === "}" || c === ")" || c === "]") {
      if (depth === 0) break; // end of this object literal
      depth--;
      i++;
      continue;
    }
    if (c === "," && depth === 0) { expectKey = true; i++; continue; }

    i++;
  }
  return keys;
}

/** Find the object literal opening `{` at/after `from`, returning its index. */
function nextBrace(src, from) {
  return src.indexOf("{", from);
}

/** content.config.ts: `const NAME = defineCollection({ ... schema: z.object({ */
function parseContentConfig(src) {
  const out = {};
  const re = /const\s+(\w+)\s*=\s*defineCollection\(/g;
  let m;
  while ((m = re.exec(src))) {
    const name = m[1];
    const schemaIdx = src.indexOf("schema:", m.index);
    if (schemaIdx === -1) continue;
    // schema: z.object({  →  jump to the `{` after `z.object(`.
    const objIdx = src.indexOf("z.object(", schemaIdx);
    const brace = nextBrace(src, objIdx === -1 ? schemaIdx : objIdx);
    out[name] = new Set(objectKeys(src, brace));
  }
  return out;
}

/** keystatic.config.ts: `NAME: collection({ ... schema: { ... } })` */
function parseKeystaticConfig(src) {
  const out = {};
  const re = /(\w+):\s*collection\(/g;
  let m;
  while ((m = re.exec(src))) {
    const name = m[1];
    const schemaIdx = src.indexOf("schema:", m.index);
    if (schemaIdx === -1) continue;
    const brace = nextBrace(src, schemaIdx);
    const keys = new Set(objectKeys(src, brace));
    keys.delete(CONTENT_BODY_FIELD); // markdoc body has no Zod counterpart
    out[name] = keys;
  }
  return out;
}

const content = parseContentConfig(
  readFileSync(join(root, "src/content.config.ts"), "utf8"),
);
const keystatic = parseKeystaticConfig(
  readFileSync(join(root, "keystatic.config.ts"), "utf8"),
);

const problems = [];
for (const name of Object.keys(content)) {
  if (!(name in keystatic)) continue; // only collections defined in both
  const c = content[name];
  const k = keystatic[name];
  const onlyContent = [...c].filter((f) => !k.has(f));
  const onlyKeystatic = [...k].filter((f) => !c.has(f));
  for (const f of onlyContent) {
    problems.push(
      `  ${name}: "${f}" is in content.config.ts but missing from keystatic.config.ts`,
    );
  }
  for (const f of onlyKeystatic) {
    problems.push(
      `  ${name}: "${f}" is in keystatic.config.ts but missing from content.config.ts`,
    );
  }
}

if (problems.length) {
  console.error(
    "\n✗ Schema parity check failed — content.config.ts and keystatic.config.ts have drifted:\n",
  );
  console.error(problems.join("\n"));
  console.error(
    "\nAdd the missing field to both configs (Keystatic rejects unknown frontmatter keys).\n",
  );
  process.exit(1);
}

console.log("✓ Schema parity: content.config.ts ↔ keystatic.config.ts in sync");
