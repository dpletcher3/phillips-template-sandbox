import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  description: "Editorial callout block. Renders in india family Brand, Solution, and Guide templates. Other template families (Simple, EC, Appealing, Branded) read legacy shapes and will not render new callouts until adapted — see docs/india-cleanup-queue.md §7.",
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Note', value: 'note' },
          { title: 'Tip', value: 'tip' },
          { title: 'Pro Tips', value: 'protips' },
          { title: 'Warning', value: 'warning' },
          { title: 'Callout', value: 'callout' },
        ],
      },
      initialValue: 'note',
      validation: r => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'For pro-tip callouts (type=protips), compose body as a Portable Text bulleted list (not paragraphs with line breaks) so the india family\'s red-tick list-item treatment renders correctly. See india design system §5.4.',
    }),
    defineField({
      name: 'chipLabel',
      title: 'Chip Label Override',
      type: 'string',
      description: 'Overrides the default type → label mapping. See india design system §5.4.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
})
