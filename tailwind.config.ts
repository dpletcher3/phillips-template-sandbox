import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'p-red':    '#F9423A',
        'p-blue':   '#00AEEF',
        'p-gold':   '#F68B33',
        'p-maroon': '#3F0017',
        'p-grey':   '#647883',
        'p-light':  '#D7DFE3',
        'p-bg':     '#F2F4F6',
      },
      fontFamily: {
        bc:      ['var(--font-barlow-condensed)', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        body:    ['Montserrat', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
