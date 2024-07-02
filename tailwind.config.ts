import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      width: {
        innerWidth: '67.71vw',
      },
      colors: {
        primary: '#FB1C49',
        concrete: '#F2F2F2',
        alto: '#D3D3D3',
        dovegray: '#6D6D6D',
        codgray: '#171717',
        mineshaft: '#222222',
        pastelpink: '#FED2D9',
        scienceblue: '#016DD6',
        Selago: '#F2F8FD',
      },
    },
  },
};
export default config;
