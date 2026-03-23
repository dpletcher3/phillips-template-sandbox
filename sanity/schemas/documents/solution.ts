import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({ name: 'name',            title: 'Name',              type: 'string',  validation: r => r.required() }),
    defineField({ name: 'slug',            title: 'Slug',              type: 'slug',    options: { source: 'name' } }),
    defineField({ name: 'offering',        title: 'Offering Category', type: 'string',  options: { list: ['CNC Machining','Additive Manufacturing','Hybrid Manufacturing','Automation & Smart Manufacturing'] } }),
    defineField({ name: 'heroImage',       title: 'Hero Image',        type: 'image'    }),
    defineField({ name: 'shortDesc',       title: 'Short Description', type: 'string'   }),
    defineField({ name: 'description',     title: 'Description',       type: 'blockContent' }),
    defineField({ name: 'relatedBrands',   title: 'Related Brands',    type: 'array', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
    defineField({ name: 'seo',             title: 'SEO',               type: 'seoBlock' }),
  ],
})
