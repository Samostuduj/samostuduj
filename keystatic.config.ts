import { config, fields, collection } from "@keystatic/core";

// Icon keys mirror the registry in src/components/Icon.astro. Kept in sync by
// hand — a select here means editors pick a valid icon instead of typing a
// string that renders blank.
const ICON_KEYS = [
  "graduation-cap",
  "clock",
  "sparkles",
  "compass",
  "moon",
  "sun",
  "brain",
  "terminal",
  "trending-up",
  "scale",
  "users",
  "sigma",
  "feather",
  "megaphone",
  "calendar",
  "x",
  "book-open",
  "file-text",
  "printer",
  "heart-handshake",
] as const;

const iconOptions = ICON_KEYS.map((k) => ({ label: k, value: k }));

// How finished a piece of content is — mirrors the shared `status` enum.
const statusField = fields.select({
  label: "Stav",
  options: [
    { label: "Hotovo", value: "hotovo" },
    { label: "Rozpracováno", value: "rozpracovano" },
    { label: "Plánováno", value: "planovano" },
  ],
  defaultValue: "planovano",
});

const tagsField = fields.array(fields.text({ label: "Tag" }), {
  label: "Tagy",
  itemLabel: (props) => props.value,
});

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Samostuduj" },
    navigation: {
      Obsah: ["blog", "obory", "plany", "aktuality"],
    },
  },
  collections: {
    // Blog — články.
    blog: collection({
      label: "Blog",
      path: "src/content/blog/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Název" } }),
        date: fields.date({
          label: "Datum",
          validation: { isRequired: true },
        }),
        author: fields.text({ label: "Autor", defaultValue: "Samostuduj" }),
        tags: tagsField,
        summary: fields.text({ label: "Shrnutí", multiline: true }),
        draft: fields.checkbox({
          label: "Koncept (nezveřejňovat)",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Obsah", extension: "md" }),
      },
    }),

    // Obory — oborové rozcestníky.
    obory: collection({
      label: "Obory",
      path: "src/content/obory/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Název" } }),
        summary: fields.text({
          label: "Shrnutí (krátký popis pro SEO/karty)",
          multiline: true,
          validation: { isRequired: true },
        }),
        icon: fields.select({
          label: "Ikona",
          options: iconOptions,
          defaultValue: "book-open",
        }),
        order: fields.integer({ label: "Pořadí", defaultValue: 99 }),
        status: statusField,
        about: fields.text({
          label: "Popis oboru (delší, vede se na /obory)",
          multiline: true,
        }),
        tags: tagsField,
        toc: fields.checkbox({
          label: "Obsah stránky (číslované nadpisy + boční navigace)",
          defaultValue: false,
        }),
        materials: fields.array(
          fields.object({
            category: fields.select({
              label: "Kategorie",
              options: [
                { label: "On-line", value: "online" },
                { label: "Literatura", value: "kniha" },
                { label: "Odborná", value: "odborna" },
              ],
              defaultValue: "online",
            }),
            title: fields.text({
              label: "Název",
              validation: { isRequired: true },
            }),
            url: fields.url({ label: "Odkaz (nepovinné)" }),
            author: fields.text({ label: "Autor / vydavatel (nepovinné)" }),
            pages: fields.integer({ label: "Počet stran (nepovinné)" }),
            lang: fields.select({
              label: "Jazyk",
              options: [
                { label: "Čeština", value: "cs" },
                { label: "Angličtina", value: "en" },
                { label: "Slovenština", value: "sk" },
                { label: "Němčina", value: "de" },
                { label: "Francouzština", value: "fr" },
                { label: "Španělština", value: "es" },
              ],
              defaultValue: "cs",
            }),
            note: fields.text({ label: "Popis (nepovinné)", multiline: true }),
          }),
          {
            label: "Doporučené materiály",
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        content: fields.markdoc({ label: "Obsah", extension: "md" }),
      },
    }),

    // Studijní plány — kurikula.
    plany: collection({
      label: "Studijní plány",
      path: "src/content/plany/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Název" } }),
        obor: fields.text({ label: "Obor (nepovinné)" }),
        level: fields.select({
          label: "Úroveň",
          options: [
            { label: "Úvod", value: "úvod" },
            { label: "Bakalář", value: "bakalář" },
            { label: "Magistr", value: "magistr" },
          ],
          defaultValue: "úvod",
        }),
        order: fields.integer({ label: "Pořadí", defaultValue: 99 }),
        summary: fields.text({ label: "Shrnutí", multiline: true }),
        status: statusField,
        draft: fields.checkbox({
          label: "Koncept (nezveřejňovat)",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Obsah", extension: "md" }),
      },
    }),

    // Aktuality — krátká, časově omezená oznámení.
    aktuality: collection({
      label: "Aktuality",
      path: "src/content/aktuality/*",
      slugField: "title",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Název" } }),
        date: fields.date({
          label: "Datum",
          validation: { isRequired: true },
        }),
        type: fields.select({
          label: "Typ",
          options: [
            { label: "Nový obsah", value: "novy-obsah" },
            { label: "Hledáme", value: "hledame" },
            { label: "Novinka", value: "novinka" },
            { label: "Událost", value: "udalost" },
          ],
          defaultValue: "novinka",
        }),
        link: fields.text({ label: "Odkaz (nepovinné, např. /plany)" }),
        placement: fields.select({
          label: "Umístění",
          options: [
            { label: "Proužek (nahoře + homepage + archiv)", value: "strip" },
            { label: "Hero (homepage + archiv)", value: "hero" },
            { label: "Archiv (jen /aktuality)", value: "archive" },
          ],
          defaultValue: "archive",
        }),
        pinned: fields.checkbox({
          label: "Připnout (vyhrává slot v proužku)",
          defaultValue: false,
        }),
        expires: fields.date({
          label: "Vyprší (po tomto datu se skryje)",
        }),
        draft: fields.checkbox({
          label: "Koncept (nezveřejňovat)",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Obsah", extension: "md" }),
      },
    }),
  },
});
