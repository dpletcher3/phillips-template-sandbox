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

        /* ---------------------------------------------------------------
           Branded template family (5th variant). Self-contained namespace
           so existing `p-*` classes are untouched. Class form examples:
             bg-branded-gray-50, text-branded-red-deep, border-branded-gray-200
           Mirrored as CSS vars in src/app/globals.css for inline styles.
           --------------------------------------------------------------- */
        branded: {
          red:        '#F9423A',
          'red-deep': '#D6362F',
          maroon:     '#3F0017',
          gold:       '#F68B33',
          blue:       '#00AEEF',
          black:      '#000000',
          white:      '#FFFFFF',
          'gray-50':  '#F7F9FB',
          'gray-100': '#EDF1F4',
          'gray-200': '#D7DFE3',
          'gray-300': '#BFC8D0',
          'gray-400': '#8A949E',
          'gray-500': '#647883',
          'gray-600': '#4A5260',
          'gray-700': '#2A2F36',
        },
      },
      fontFamily: {
        bc:      ['var(--font-barlow-condensed)', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        body:    ['Montserrat', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],

        /* Branded family: Montserrat is the dominant display face;
           Barlow Condensed italic is reserved for eyebrows/accents.
           Use `font-branded-display` for headlines and `font-branded-accent`
           for eyebrow text, the Phillips lockup wordmark, and small labels. */
        'branded-display': ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        'branded-accent':  ['var(--font-barlow-condensed)', 'Arial Narrow', 'sans-serif'],
      },
      borderRadius: {
        /* Branded family radii. Class form: rounded-branded-{sm|md|lg|xl} */
        'branded-sm': '6px',
        'branded-md': '12px',
        'branded-lg': '20px',
        'branded-xl': '28px',
      },
      boxShadow: {
        /* Branded family elevation. `branded-red` is the red-tinted CTA shadow.
           Class form: shadow-branded-{sm|md|lg|red} */
        'branded-sm':  '0 1px 2px rgba(15, 23, 42, 0.04)',
        'branded-md':  '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.08)',
        'branded-lg':  '0 1px 3px rgba(15, 23, 42, 0.05), 0 18px 40px -16px rgba(15, 23, 42, 0.12)',
        'branded-red': '0 1px 2px rgba(249, 66, 58, 0.10), 0 12px 28px -8px rgba(249, 66, 58, 0.18)',
      },
    },
  },
  plugins: [],
}

export default config
