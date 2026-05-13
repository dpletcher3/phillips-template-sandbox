import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Name',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',     title: 'Slug',     type: 'slug',   options: { source: 'name' }, validation: r => r.required() }),
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
    defineField({ name: 'region',   title: 'Region',   type: 'string', options: { list: ['Northeast', 'Mid-Atlantic', 'Southeast', 'Midwest', 'Southwest', 'Federal'] } }),
    defineField({ name: 'address',  title: 'Address',  type: 'text'    }),
    defineField({ name: 'phone',    title: 'Phone',    type: 'string'  }),
    defineField({ name: 'photo',    title: 'Photo',    type: 'image'   }),
    defineField({ name: 'services', title: 'Services', type: 'array', of: [{ type: 'object', fields: [{ name: 'number', type: 'string', title: 'Number' }, { name: 'name', type: 'string', title: 'Name' }, { name: 'description', type: 'string', title: 'Description' }] }] }),
    defineField({ name: 'eyebrow',      title: 'Eyebrow',       type: 'string' }),
    defineField({ name: 'hours',         title: 'Hours',          type: 'array', of: [{ type: 'object', fields: [{ name: 'days', type: 'string', title: 'Days' }, { name: 'time', type: 'string', title: 'Time' }] }] }),
    defineField({ name: 'marqueeItems', title: 'Marquee Items', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'directionsUrl', title: 'Directions URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'region' },
  },
})
