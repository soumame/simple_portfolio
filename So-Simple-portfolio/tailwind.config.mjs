/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      mono: [
        '"IBM Plex Mono"',
        "Zen Kaku Gothic Antique",
        "Noto Sans Japanese",
      ],
      noto: ["Noto Sans Japanese 200"],
      mame: ["Mamefont"],
    },
  },
  plugins: [],
};
