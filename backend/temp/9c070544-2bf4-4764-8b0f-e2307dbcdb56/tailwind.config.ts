import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        penguin: {
          50: '#f0f8ff',
          100: '#e0f2fe',
          200: '#b2ebf2',
          300: '#80deea',
          400: '#4dd0e1',
          500: '#00bcd4',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;