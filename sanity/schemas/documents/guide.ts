import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({ name: 'title',     title: 'Title',      type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',      title: 'Slug',       type: 'slug',   options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'topic',     title: 'Topic',      type: 'string'  }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image'   }),
    defineField({ name: 'intro',     title: 'Intro',      type: 'text'    }),
    defineField({ name: 'body',      title: 'Body',       type: 'blockContent' }),
    defineField({ name: 'seo',       title: 'SEO',        type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'topic' },
  },
})
