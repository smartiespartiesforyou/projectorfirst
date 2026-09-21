import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1f2937',
        mist: '#f7f6f2',
        stone: '#9ca3af',
        accent: '#5f6f65'
      }
    }
  },
  plugins: []
};

export default config;
