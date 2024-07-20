import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-entangled': 'linear-gradient(to bottom, #3b82f6 0%, #ef4444 100%)',
        'gradient-superposition': 'linear-gradient(to bottom, #3b82f6 0%, #ef4444 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
