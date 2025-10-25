import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://inneranimal.github.io/Adelyn_Cook_Consulting',
  base: '/Adelyn_Cook_Consulting',
  integrations: [tailwind(), sitemap()],
  output: 'static',
  build: {
    assets: '_astro'
  }
});
