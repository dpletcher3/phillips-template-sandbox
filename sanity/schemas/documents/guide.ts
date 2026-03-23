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
    defineField({ name: 'docNumber', title: 'Doc Number', type: 'string', description: 'e.g. PG-2025-003' }),
    defineField({ name: 'readTime',  title: 'Read Time',  type: 'string' }),
    defineField({ name: 'level',     title: 'Level',      type: 'string', options: { list: ['Foundational', 'Intermediate', 'Advanced'] } }),
    defineField({ name: 'tableOfContents', title: 'Table of Contents', type: 'array', of: [{ type: 'object', fields: [{ name: 'sectionNumber', type: 'string', title: 'Section Number' }, { name: 'title', type: 'string', title: 'Title' }, { name: 'subsections', type: 'array', title: 'Subsections', of: [{ type: 'string' }] }] }] }),
    defineField({ name: 'callouts',  title: 'Callouts',   type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'body', type: 'text', title: 'Body' }] }] }),
    defineField({ name: 'seo',       title: 'SEO',        type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'topic' },
  },
})
