import { defineField, defineType } from 'sanity'

/**
 * Branded family home page singleton.
 *
 * Lives in Sanity as a regular document type — by convention only one
 * instance is created (matching how `personaPage` and `siteSettings` are
 * authored today). The GROQ query at `src/lib/queries.ts` → `homePageQuery`
 * picks the first match: `*[_type == "homePage"][0]`.
 *
 * Field naming follows the section IDs from `phillips-home.html` so the
 * mapping between schema, GROQ result, and rendered section is 1:1.
 */
export default defineType({
  name: 'homePage',
  title: 'Branded Home Page',
  type: 'document',
  fields: [
    /* ---------- HERO ---------- */
    defineField({ name: 'heroImage',           title: 'Hero Image (full-bleed band below header)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'progressBarsAccent',  title: 'Show Skewed-Bars Accent Above Headline',    type: 'boolean', initialValue: true }),
    defineField({ name: 'headline',            title: 'Hero Headline',         type: 'string' }),
    defineField({ name: 'bodyText',            title: 'Hero Body',             type: 'blockContent', description: 'Main paragraph under the headline. Bold words inherit the body-emphasis treatment.' }),
    defineField({ name: 'ctaText',             title: 'Hero CTA Line',         type: 'string', description: 'Short line shown after the body, e.g. "Make your move. We\'re ready."' }),

    /* ---------- INSPIRED BY YOUR INGENUITY ---------- */
    defineField({ name: 'inspiredHeading',     title: 'Inspired Heading',      type: 'string' }),
    defineField({ name: 'inspiredBody',        title: 'Inspired Body',         type: 'blockContent' }),
    defineField({ name: 'inspiredImage',       title: 'Inspired Image',        type: 'image', options: { hotspot: true } }),

    /* ---------- ADDITIVE HYBRID ---------- */
    defineField({ name: 'hybridHeading',       title: 'Hybrid Heading',        type: 'string', description: 'e.g. "ADDITIVE HYBRID"' }),
    defineField({ name: 'hybridSubheading',    title: 'Hybrid Subheading',     type: 'string', description: 'e.g. "POWERED BY HAAS"' }),
    defineField({
      name: 'partnerPills',
      title: 'Partner Pills',
      type: 'array',
      description: 'Small uppercase pills shown above the body, e.g. MELTIO / FRONIUS / LASERLINE.',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }] }],
    }),
    defineField({ name: 'hybridBody',          title: 'Hybrid Body',           type: 'blockContent' }),
    defineField({ name: 'hybridImage',         title: 'Hybrid Image',          type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'hybridCta',
      title: 'Hybrid CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href',  type: 'string', title: 'Href'  },
      ],
    }),

    /* ---------- OPERATIONALIZE ---------- */
    defineField({ name: 'opEyebrow',           title: 'Operationalize Eyebrow',    type: 'string' }),
    defineField({ name: 'opHeading',           title: 'Operationalize Heading',    type: 'string' }),
    defineField({ name: 'opSubheading',        title: 'Operationalize Subheading', type: 'string' }),
    defineField({ name: 'opBody',              title: 'Operationalize Body',       type: 'blockContent' }),
    defineField({
      name: 'opTileImages',
      title: 'Operationalize Tile Images',
      type: 'array',
      description: 'Two images: the first gets a red gradient overlay, the second a blue overlay.',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: r => r.max(2),
    }),
    defineField({
      name: 'opCta',
      title: 'Operationalize CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href',  type: 'string', title: 'Href'  },
      ],
    }),

    /* ---------- HAAS ---------- */
    defineField({ name: 'haasEyebrow',         title: 'Haas Eyebrow', type: 'string' }),
    defineField({ name: 'haasHeading',         title: 'Haas Heading', type: 'string' }),
    defineField({ name: 'haasBody',            title: 'Haas Body',    type: 'blockContent' }),
    defineField({ name: 'haasImage',           title: 'Haas Image',   type: 'image', options: { hotspot: true } }),

    /* ---------- INNOVATIVE SOLUTIONS (dark 4-card grid) ---------- */
    defineField({ name: 'innovHeading',        title: 'Innovative Solutions Heading', type: 'string' }),
    defineField({
      name: 'innovCards',
      title: 'Innovative Solutions Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Selects one of the inline-SVG icons from the reference design.',
            options: { list: ['machining', 'additive', 'optimization', 'workforce'] },
          },
          { name: 'title',     type: 'string', title: 'Title' },
          { name: 'body',      type: 'text',   title: 'Body'  },
          { name: 'ctaLabel',  type: 'string', title: 'CTA Label' },
          { name: 'ctaHref',   type: 'string', title: 'CTA Href' },
        ],
      }],
    }),

    /* ---------- LOCAL & GLOBAL ---------- */
    defineField({ name: 'lgHeading',           title: 'Local & Global Heading', type: 'string' }),
    defineField({
      name: 'lgRegions',
      title: 'Local & Global Regions (rendered as columns)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'regionName', type: 'string', title: 'Region Name (red heading)' },
          {
            name: 'subLabels',
            title: 'Sub-Sections',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'label',     type: 'string', title: 'Sub-Label (omit for plain list)' },
                { name: 'locations', type: 'array',  title: 'Locations', of: [{ type: 'string' }] },
              ],
            }],
          },
        ],
      }],
    }),
    defineField({
      name: 'lgRegionButtons',
      title: 'Local & Global Region Buttons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'href',  type: 'string', title: 'Href'  },
        ],
      }],
    }),

    /* ---------- IMPACT ---------- */
    defineField({ name: 'impactEyebrow',       title: 'Impact Eyebrow', type: 'string' }),
    defineField({ name: 'impactHeading',       title: 'Impact Heading', type: 'string' }),
    defineField({
      name: 'impactCards',
      title: 'Impact Cards',
      description: 'References to existing case study documents — title and hero image are pulled from the ref.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),

    /* ---------- MACHINIST APP ---------- */
    defineField({ name: 'machinistHeading',    title: 'Machinist App Heading',   type: 'string', description: 'Lockup label, e.g. "THE PHILLIPS MACHINIST"' }),
    defineField({ name: 'machinistBody',       title: 'Machinist App Body',      type: 'blockContent' }),
    defineField({ name: 'machinistHighlight',  title: 'Machinist App Highlight', type: 'text', description: 'Bold call-to-action sentence.' }),
    defineField({ name: 'qrImage',             title: 'QR Code Image',           type: 'image', description: 'Optional. If omitted, a placeholder SVG renders.' }),

    /* ---------- WORK TOGETHER ---------- */
    defineField({ name: 'wtEyebrow',           title: 'Work Together Eyebrow', type: 'string' }),
    defineField({ name: 'wtHeading',           title: 'Work Together Heading', type: 'string' }),
    defineField({ name: 'wtBody',              title: 'Work Together Body',    type: 'blockContent' }),
    defineField({
      name: 'wtCtas',
      title: 'Work Together CTAs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label',   type: 'string', title: 'Label' },
          { name: 'href',    type: 'string', title: 'Href'  },
          {
            name: 'variant',
            type: 'string',
            title: 'Variant',
            options: { list: ['primary', 'ghost'] },
            initialValue: 'primary',
          },
        ],
      }],
    }),
    defineField({ name: 'wtImage',             title: 'Work Together Image', type: 'image', options: { hotspot: true } }),

    /* ---------- COMMUNITY ---------- */
    defineField({ name: 'communityTagline',    title: 'Community Tagline', type: 'text', description: 'Italic uppercase line above the photo strip.' }),
    defineField({
      name: 'communityPhotos',
      title: 'Community Photo Strip',
      description: 'Up to 8 photos rendered as a grayscale band. Cycles if fewer than 8 are supplied.',
      type: 'array',
      of: [{ type: 'image' }],
      validation: r => r.max(8),
    }),

    /* ---------- SEO ---------- */
    defineField({ name: 'seo', title: 'SEO', type: 'seoBlock' }),
  ],
})
