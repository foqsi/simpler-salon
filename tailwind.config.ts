import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate', 'dark', 'cupcake'], // list explicitly
    darkTheme: 'dark', // sets what "dark" means
    base: true, // include base styles
    styled: true, // enable class-based theming
    utils: true, // enable utility classes
    logs: false,
    rtl: false,
    prefix: '',
  },
} as Config & { daisyui: any };

export default config;
