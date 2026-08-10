import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff5f7',
          100: '#ffe6ed',
          200: '#fcccdb',
          300: '#f999b7',
          400: '#f4598a',
          500: '#ea2a68',
          600: '#d51551',
          700: '#b30c3d',
          800: '#940e36',
          900: '#7d1132',
          950: '#460318',
        },
        gold: {
          50: '#faf8f5',
          100: '#f3eeea',
          200: '#e5d9ce',
          300: '#d4bfae',
          400: '#c19f87',
          500: '#b08468',
          600: '#9c6f56',
          700: '#7f5644',
          800: '#67473a',
          900: '#543b31',
        },
        emerald: {
           luxury: '#0f2c23',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(229, 217, 206, 0.5)',
        'glow': '0 0 25px rgba(244, 89, 138, 0.25)',
      }
    },
  },
  plugins: [],
};

export default config;
