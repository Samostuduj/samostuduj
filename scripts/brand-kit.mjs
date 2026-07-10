import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import AdmZip from "adm-zip";

// Generates the downloadable brand kit (public/brand/samostuduj-brand-kit.zip)
// from the individual logo/icon assets sitting next to it. Runs on
// `astro:config:setup`, which fires for both `astro dev` and `astro build`, so
// the zip exists locally and in the deploy without ever being committed — it
// always reflects whatever asset files are currently in public/brand/.
const BRAND_DIR = new URL("../public/brand/", import.meta.url);
const ZIP_NAME = "samostuduj-brand-kit.zip";

function buildBrandKit(logger) {
  const dir = fileURLToPath(BRAND_DIR);
  const assets = readdirSync(dir)
    .filter((f) => /\.(svg|png)$/i.test(f))
    .sort();

  const zip = new AdmZip();
  for (const file of assets) {
    zip.addFile(file, readFileSync(new URL(file, BRAND_DIR)));
  }
  writeFileSync(new URL(ZIP_NAME, BRAND_DIR), zip.toBuffer());
  logger?.info(`brand kit: bundled ${assets.length} asset(s) → ${ZIP_NAME}`);
}

/** @returns {import('astro').AstroIntegration} */
export default function brandKit() {
  return {
    name: "brand-kit",
    hooks: {
      "astro:config:setup": ({ logger }) => buildBrandKit(logger),
    },
  };
}
