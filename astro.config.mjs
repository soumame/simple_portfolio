import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import nodejs from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  adapter: nodejs({
    mode: "middleware", // または'standalone'
  }),
  output: "hybrid",
  integrations: [tailwind(), react()],
  experimental: {
    i18n: {
      defaultLocale: "ja",
      locales: ["en", "ja"],
      routing: {
        prefixDefaultLocale: true,
      },
    },
  },
});
