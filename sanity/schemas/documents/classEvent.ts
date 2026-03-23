import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'classEvent',
  title: 'Class Event',
  type: 'document',
  fields: [
    defineField({ name: 'course',          title: 'Course',           type: 'reference', to: [{ type: 'course' }], validation: r => r.required() }),
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
