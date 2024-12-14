/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      boxShadow: {
        md: "5px 5px 6px rgb(0 0 0 / 0.05), -5px -5px 6px rgb(255 255 255 / 0.2);",
        lg: "12px 12px 10px rgb(0 0 0 / 0.05), -12px -12px 10px rgb(255 255 255 / 0.2);",
        inner:
          "inset 5px 5px 6px rgb(50 50 50 / 0.0), inset -5px -5px 6px rgb(255 255 255 / 0.1);",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
    fontFamily: {
      mono: [
        '"IBM Plex Mono"',
        "Zen Kaku Gothic Antique",
        "Noto Sans Japanese",
      ],
      serif: ['"IBM Plex Serif"', "Noto Serif JP"],
      noto: ["Noto Sans Japanese 200"],
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("tailwind-scrollbar"),
    // ...
  ],
};
