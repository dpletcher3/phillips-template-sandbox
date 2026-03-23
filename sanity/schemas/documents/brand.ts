import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({ name: 'name',            title: 'Brand Name',    type: 'string',    validation: r => r.required() }),
    defineField({ name: 'slug',            title: 'Slug',          type: 'slug',      options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'logo',            title: 'Logo',          type: 'image'      }),
    defineField({ name: 'heroImage',       title: 'Hero Image',    type: 'image'      }),
    defineField({ name: 'category',        title: 'Category',      type: 'array', of: [{ type: 'string' }], options: { list: ['CNC Machining','Additive Manufacturing','Hybrid Manufacturing','Automation','Tooling','Metrology'] } }),
    defineField({ name: 'tagline',         title: 'Tagline',       type: 'string'     }),
    defineField({ name: 'description',     title: 'Description',   type: 'text'       }),
    defineField({ name: 'productLines',    title: 'Product Lines', type: 'array', of: [{ type: 'productLine' }] }),
    defineField({ name: 'seo',             title: 'SEO',           type: 'seoBlock'   }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'logo' },
  },
})
