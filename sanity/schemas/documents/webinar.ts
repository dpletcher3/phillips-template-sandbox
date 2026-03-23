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
    defineField({ name: 'statusLabel',      title: 'Status Label',      type: 'string', description: 'e.g. Upcoming, On-Demand' }),
    defineField({ name: 'speakers',         title: 'Speakers',          type: 'array', of: [{ type: 'object', fields: [{ name: 'initials', type: 'string', title: 'Initials' }, { name: 'name', type: 'string', title: 'Name' }, { name: 'role', type: 'string', title: 'Role' }] }] }),
    defineField({ name: 'agenda',           title: 'Agenda',            type: 'array', of: [{ type: 'object', fields: [{ name: 'time', type: 'string', title: 'Time' }, { name: 'item', type: 'string', title: 'Item' }] }] }),
    defineField({ name: 'formTitle',        title: 'Form Title',        type: 'string' }),
    defineField({ name: 'seo',              title: 'SEO',               type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
