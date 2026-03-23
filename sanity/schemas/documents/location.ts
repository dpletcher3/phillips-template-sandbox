import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Name',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',     title: 'Slug',     type: 'slug',   options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'region',   title: 'Region',   type: 'string', options: { list: ['Northeast', 'Mid-Atlantic', 'Southeast', 'Midwest', 'Southwest', 'Federal'] } }),
    defineField({ name: 'address',  title: 'Address',  type: 'text'    }),
    defineField({ name: 'phone',    title: 'Phone',    type: 'string'  }),
    defineField({ name: 'photo',    title: 'Photo',    type: 'image'   }),
    defineField({ name: 'services', title: 'Services', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'region' },
  },
})
