import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bone:  { DEFAULT: '#F5F2ED', 100: '#FAF8F5' },
        stone: { DEFAULT: '#C8C1B4', 600: '#6B6660', 900: '#1A1A1A' },
        vela:  { DEFAULT: '#0A0A0A', accent: '#8A9E8A' },
      },
      letterSpacing: { widest: '0.25em', wider: '0.15em' },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
export default config;
