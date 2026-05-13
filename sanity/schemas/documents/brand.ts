import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({ name: 'name',            title: 'Brand Name',    type: 'string',    validation: r => r.required() }),
    defineField({ name: 'slug',            title: 'Slug',          type: 'slug',      options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'intent',
      title: 'Intent',
      type: 'string',
      options: {
        list: [
          { title: 'Awareness', value: 'awareness' },
          { title: 'Consideration', value: 'consideration' },
          { title: 'Conversion', value: 'conversion' },
        ],
      },
      description: 'Authoring intent for india-family templates. Unset = awareness. Controls lead-form placement density. See india design system §10 item 5.',
    }),
    defineField({ name: 'logo',            title: 'Logo',          type: 'image'      }),
    defineField({ name: 'heroImage',       title: 'Hero Image',    type: 'image'      }),
    defineField({ name: 'category',        title: 'Category',      type: 'array', of: [{ type: 'string' }], options: { list: ['CNC Machining','Additive Manufacturing','Hybrid Manufacturing','Automation','Tooling','Metrology'] } }),
    defineField({ name: 'tagline',         title: 'Tagline',       type: 'string'     }),
    defineField({ name: 'description',     title: 'Description',   type: 'text'       }),
    defineField({ name: 'productLines',    title: 'Product Lines', type: 'array', of: [{ type: 'productLine' }] }),
    defineField({ name: 'stats',           title: 'Hero Stats',    type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string', title: 'Value' }, { name: 'label', type: 'string', title: 'Label' }] }], validation: r => r.max(3) }),
    defineField({ name: 'taglineBarText',  title: 'Tagline Bar Text', type: 'string' }),
    defineField({ name: 'aboutTitle',      title: 'About Title',   type: 'string' }),
    defineField({ name: 'aboutBody',       title: 'About Body',    type: 'text' }),
    defineField({ name: 'aboutStats',      title: 'About Stats',   type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string', title: 'Value' }, { name: 'label', type: 'string', title: 'Label' }] }] }),
    defineField({ name: 'marqueeItems',    title: 'Marquee Items', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'caseStudiesIntro', title: 'Case Studies Intro', type: 'text' }),
    defineField({
      name: 'callouts',
      title: 'Callouts',
      type: 'array',
      of: [{ type: 'callout' }],
      description: 'Optional editorial callouts (notes, tips, warnings). See india design system §5.4.',
    }),
    defineField({ name: 'seo',             title: 'SEO',           type: 'seoBlock'   }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'logo' },
  },
})
