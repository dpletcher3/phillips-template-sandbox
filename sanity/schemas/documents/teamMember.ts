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
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
