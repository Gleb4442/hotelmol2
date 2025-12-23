import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(207, 83%, 32%)',
          foreground: 'hsl(207, 83%, 98%)',
        },
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(0, 0%, 7%)',
        muted: {
          DEFAULT: 'hsl(0, 2%, 94%)',
          foreground: 'hsl(0, 0%, 42%)',
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 98%)',
          foreground: 'hsl(0, 0%, 7%)',
        },
        border: 'hsl(0, 0%, 89%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
