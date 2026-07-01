import { getCollection, type CollectionEntry } from "astro:content";

export type Aktualita = CollectionEntry<"aktuality">;

// Shared type metadata: label (lowercase, matches the site's voice) + icon key.
export const TYPE_META = {
  "novy-obsah": { label: "nový obsah", icon: "sparkles" },
  hledame: { label: "hledáme", icon: "users" },
  novinka: { label: "novinka", icon: "megaphone" },
  udalost: { label: "událost", icon: "calendar" },
} as const;

// Build-time "now". Runs during `astro build`; expiry takes effect on the next
// deploy, which is fine for a static site that rebuilds on push.
const now = new Date();

function isLive(e: Aktualita): boolean {
  if (e.data.draft) return false;
  if (e.data.expires && e.data.expires < now) return false;
  return true;
}

// All live announcements, newest first.
export async function getLiveAktuality(): Promise<Aktualita[]> {
  const all = await getCollection("aktuality");
  return all
    .filter(isLive)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// The single strip item: an explicit pin wins, else the newest strip-eligible.
// `items` must already be sorted newest-first.
export function pickStrip(items: Aktualita[]): Aktualita | undefined {
  const eligible = items.filter((e) => e.data.placement === "strip");
  return eligible.find((e) => e.data.pinned) ?? eligible[0];
}

// Homepage band: newest strip/hero items, capped.
export function pickHero(items: Aktualita[], limit = 3): Aktualita[] {
  return items
    .filter((e) => e.data.placement === "strip" || e.data.placement === "hero")
    .slice(0, limit);
}
