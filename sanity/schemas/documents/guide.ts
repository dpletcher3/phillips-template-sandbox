import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({ name: 'title',     title: 'Title',      type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',      title: 'Slug',       type: 'slug',   options: { source: 'title' }, validation: r => r.required() }),
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
    defineField({ name: 'topic',     title: 'Topic',      type: 'string'  }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image'   }),
    defineField({ name: 'intro',     title: 'Intro',      type: 'text'    }),
    defineField({ name: 'body',      title: 'Body',       type: 'blockContent' }),
    defineField({ name: 'docNumber', title: 'Doc Number', type: 'string', description: 'e.g. PG-2025-003' }),
    defineField({ name: 'readTime',  title: 'Read Time',  type: 'string' }),
    defineField({ name: 'level',     title: 'Level',      type: 'string', options: { list: ['Foundational', 'Intermediate', 'Advanced'] } }),
    defineField({ name: 'tableOfContents', title: 'Table of Contents', type: 'array', of: [{ type: 'object', fields: [{ name: 'sectionNumber', type: 'string', title: 'Section Number' }, { name: 'title', type: 'string', title: 'Title' }, { name: 'subsections', type: 'array', title: 'Subsections', of: [{ type: 'string' }] }] }] }),
    defineField({
      name: 'callouts',
      title: 'Callouts',
      type: 'array',
      of: [{ type: 'callout' }],
      description: 'Editorial callouts (notes, tips, warnings). Migrated from the previous inline { label, body: text } shape. See india design system §5.4.',
      validation: Rule => Rule.custom(callouts => {
        if (!callouts || (Array.isArray(callouts) && callouts.length === 0)) return true
        return 'Callouts authored here render correctly in the india family Guide template. Other families (Simple, EC, Appealing, Branded) still read the legacy shape and will not render these correctly until their Guide Clients are adapted. See docs/india-cleanup-queue.md §7.'
      }).warning(),
    }),
    defineField({ name: 'seo',       title: 'SEO',        type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'topic' },
  },
})
