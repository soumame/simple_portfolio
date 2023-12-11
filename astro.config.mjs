import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import nodejs from "@astrojs/node";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  output: "hybrid",
  integrations: [tailwind(), react()],
  experimental: {
    i18n: {
      defaultLocale: "ja",
      locales: ["en", "ja"],
      routing: {
        prefixDefaultLocale: true
      }
    }
  }
});