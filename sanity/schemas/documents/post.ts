import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Title',        type: 'string',   validation: r => r.required() }),
    defineField({ name: 'slug',        title: 'Slug',         type: 'slug',     options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime'  }),
    defineField({ name: 'author',      title: 'Author',       type: 'reference', to: [{ type: 'teamMember' }] }),
    defineField({ name: 'categories',  title: 'Categories',   type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'mainImage',   title: 'Main Image',   type: 'image'     }),
    defineField({ name: 'excerpt',     title: 'Excerpt',      type: 'text'      }),
    defineField({ name: 'body',        title: 'Body',         type: 'blockContent' }),
    defineField({ name: 'seo',         title: 'SEO',          type: 'seoBlock'  }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' },
  },
})
