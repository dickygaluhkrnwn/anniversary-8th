import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Warna Utama: Lilac (Romantis & Lembut)
        lilac: {
          50: '#fbf7fe',
          100: '#f5ecfc',
          200: '#eaddf7',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Aksen Mewah: Gold (Untuk Anniversary ke-8)
        gold: {
          100: '#fff9c4',
          300: '#fff176',
          500: '#ffd700', // Emas standar
          700: '#fbc02d',
          900: '#f57f17',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'], // Untuk Judul Elegan
        sans: ['var(--font-inter)', 'sans-serif'], // Untuk Teks Bacaan
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite', // Untuk efek infinity nanti
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;