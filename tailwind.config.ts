import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#010112',
        'brand-accent': '#5ccfa2',
        'brand-accent-hover': '#6ee0b3',
        'brand-text': '#f5f5f5',
        'brand-text-muted': '#a0a0a0',
        'brand-error': '#ff6b6b',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'monospace'],
        'inter-tight': ['var(--font-inter-tight)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
