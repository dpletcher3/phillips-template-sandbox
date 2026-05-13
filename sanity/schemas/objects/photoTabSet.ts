import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photoTabSet',
  title: 'Photo Tab Set',
  type: 'object',
  fields: [
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'photoTab',
          title: 'Photo Tab',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: r => r.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'blockContent',
            }),
            defineField({
              name: 'ctaUrl',
              title: 'CTA URL',
              type: 'url',
            }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        },
      ],
    }),
  ],
})
