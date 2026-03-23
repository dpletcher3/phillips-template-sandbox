import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seoBlock',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle',       title: 'Meta Title (60 chars)',       type: 'string',  validation: r => r.max(60) }),
    defineField({ name: 'metaDescription', title: 'Meta Description (160 chars)',type: 'text',    validation: r => r.max(160) }),
    defineField({ name: 'ogImage',         title: 'OG Image (1200×630)',         type: 'image'    }),
    defineField({ name: 'noIndex',         title: 'No Index',                    type: 'boolean', initialValue: false }),
  ],
})
