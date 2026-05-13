import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Name',         type: 'string',  validation: r => r.required() }),
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
