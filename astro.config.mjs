import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://tokumaru.work",
  i18n: {
    defaultLocale: "ja",
    locales: ["en", "ja"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  experimental: {},
});
