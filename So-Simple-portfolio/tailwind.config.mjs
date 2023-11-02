/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      mono: ['"IBM Plex Mono"', "Zen Kaku Gothic Antique"],
      sansbold: ["Seed-bold"],
      sans: ["Seed-regular"],
      sansthin: ["Seed-thin"],
      sansex: ["Seed-extrabold"],
    },
  },
  plugins: [require("daisyui")],
};
