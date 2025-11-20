import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'lvl-black': '#050505',
        'lvl-900': '#0f0f11',
        'lvl-800': '#18181b',
        'lvl-700': '#27272a',
        'neon-physical': '#00ff9d',
        'neon-work': '#00f0ff',
        'neon-discipline': '#bd00ff',
        'neon-social': '#ff9100',
        'neon-negative': '#ff003c',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(0, 255, 157, 0.3)',
        'neon-blue': '0 0 10px rgba(0, 240, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(189, 0, 255, 0.3)',
        'neon-red': '0 0 10px rgba(255, 0, 60, 0.3)',
      },
    },
  },
  plugins: [animate],
};

export default config;
