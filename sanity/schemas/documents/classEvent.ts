import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'classEvent',
  title: 'Class Event',
  type: 'document',
  fields: [
    defineField({ name: 'course',          title: 'Course',           type: 'reference', to: [{ type: 'course' }], validation: r => r.required() }),
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
    defineField({ name: 'location',        title: 'Location',         type: 'string'   }),
    defineField({ name: 'startDate',       title: 'Start Date',       type: 'date'     }),
    defineField({ name: 'endDate',         title: 'End Date',         type: 'date'     }),
    defineField({ name: 'seats',           title: 'Seats',            type: 'number'   }),
    defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'url'      }),
    defineField({ name: 'isFederal',       title: 'Federal / DoD',    type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'course.title', subtitle: 'startDate' },
  },
})
