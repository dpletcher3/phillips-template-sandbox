import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Name',         type: 'string',  validation: r => r.required() }),
    defineField({ name: 'title',        title: 'Title',        type: 'string'   }),
    defineField({ name: 'photo',        title: 'Photo',        type: 'image'    }),
    defineField({ name: 'bio',          title: 'Bio',          type: 'text'     }),
    defineField({ name: 'isLeadership', title: 'Leadership',   type: 'boolean', initialValue: false }),
    defineField({ name: 'linkedinUrl',  title: 'LinkedIn URL', type: 'url'      }),
    defineField({ name: 'slug',         title: 'Slug',         type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'issueLabel',   title: 'Issue Label',  type: 'string', description: 'e.g. Phillips People · Issue 042' }),
    defineField({ name: 'facts',        title: 'Facts',        type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'value', type: 'string', title: 'Value' }] }] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
