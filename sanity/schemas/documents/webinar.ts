import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webinar',
  title: 'Webinar',
  type: 'document',
  fields: [
    defineField({ name: 'title',           title: 'Title',            type: 'string',   validation: r => r.required() }),
    defineField({ name: 'slug',            title: 'Slug',             type: 'slug',     options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'scheduledAt',     title: 'Scheduled At',     type: 'datetime'  }),
    defineField({ name: 'status',          title: 'Status',           type: 'string',   options: { list: ['upcoming', 'on-demand'] } }),
    defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'url'       }),
    defineField({ name: 'recordingUrl',    title: 'Recording URL',    type: 'url'       }),
    defineField({ name: 'description',     title: 'Description',      type: 'text'      }),
    defineField({ name: 'relatedBrands',   title: 'Related Brands',   type: 'array', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
