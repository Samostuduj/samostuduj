// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import brandKit from './scripts/brand-kit.mjs';

// Keystatic is a local-mode admin at /keystatic. Gate its integrations (plus
// React, which only powers that admin UI) to `astro dev` so the production
// build stays fully static — no adapter, and zero React shipped to visitors.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://samostuduj.cz',

  vite: {
    plugins: [tailwindcss()],
  },

  // brandKit regenerates the downloadable zip from public/brand/ assets on
  // every dev + build, so it's never committed and can't drift from source.
  integrations: [brandKit(), sitemap(), ...(isDev ? [react(), keystatic()] : [])],
});