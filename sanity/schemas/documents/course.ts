import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'title',         title: 'Title',          type: 'string',  validation: r => r.required() }),
    defineField({ name: 'slug',          title: 'Slug',           type: 'slug',    options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'track',         title: 'Track',          type: 'string',  options: { list: ['CNC', 'AM', 'Software', 'Automation'] } }),
    defineField({ name: 'audience',      title: 'Audience',       type: 'string',  options: { list: ['Professional', 'Workforce', 'Federal'] } }),
    defineField({ name: 'duration',      title: 'Duration',       type: 'string'   }),
    defineField({ name: 'description',   title: 'Description',    type: 'text'     }),
    defineField({ name: 'relatedBrands', title: 'Related Brands', type: 'array', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
    defineField({ name: 'seo',           title: 'SEO',            type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'track' },
  },
})
