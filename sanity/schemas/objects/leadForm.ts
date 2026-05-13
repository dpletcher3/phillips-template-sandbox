import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'leadForm',
  title: 'Lead Form',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'leadFormField',
          title: 'Field',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: r => r.required(),
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Select', value: 'select' },
                  { title: 'Textarea', value: 'textarea' },
                ],
              },
              validation: r => r.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [{ type: 'string' }],
              description: "For type='select' only.",
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'type' } },
        },
      ],
    }),
    defineField({
      name: 'submitLabel',
      title: 'Submit Label',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'destinationId',
      title: 'Destination ID',
      type: 'string',
      description: 'Routing key for form-handler / webhook.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'regionScope',
      title: 'Region Scope',
      type: 'string',
      description: "e.g. 'india', 'global'.",
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'destinationId' },
  },
})
