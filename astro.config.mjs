import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { readFileSync } from 'fs';
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

//import sitemap from "@astrojs/sitemap";
import sitemap from '@inox-tools/sitemap-ext';


// https://astro.build/config
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
    }
  },
  // Enable React to support React JSX components.
  experimental: {
    contentCollectionCache: true
  },
  site: 'https://mlbdemo.com',
  trailingSlash: 'always',
  compressHTML: false,
  redirects: {},
  output: 'server',
  integrations: [preact(), tailwind({
    config: {
      path: "./tailwind.config.js"
    }
  }), sitemap({
    includeByDefault: true,
    lastmod: new Date()
  })],
  adapter: cloudflare()
});
