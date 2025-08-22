
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(0 0% 3.9%)",
        muted: { DEFAULT: "hsl(0 0% 96%)", foreground: "hsl(0 0% 45%)" },
        border: "hsl(0 0% 89.8%)",
      }
    },
  },
  plugins: [],
}
