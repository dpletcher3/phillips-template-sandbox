import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title',         title: 'Title',          type: 'string',  validation: r => r.required() }),
    defineField({ name: 'slug',          title: 'Slug',           type: 'slug',    options: { source: 'title' }, validation: r => r.required() }),
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
    defineField({ name: 'customer',      title: 'Customer',       type: 'string'   }),
    defineField({ name: 'industry',      title: 'Industry',       type: 'string'   }),
    defineField({ name: 'isFederal',     title: 'Federal / DoD',  type: 'boolean', initialValue: false }),
    defineField({ name: 'heroImage',     title: 'Hero Image',     type: 'image'    }),
    defineField({ name: 'summary',       title: 'Summary',        type: 'text'     }),
    defineField({ name: 'body',          title: 'Body',           type: 'blockContent' }),
    defineField({ name: 'relatedBrands', title: 'Related Brands', type: 'array', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
    defineField({ name: 'results',       title: 'Results',        type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'value', type: 'string', title: 'Value' }] }] }),
    defineField({ name: 'pullQuote',    title: 'Pull Quote',     type: 'text' }),
    defineField({ name: 'pullQuoteAttribution', title: 'Pull Quote Attribution', type: 'string' }),
    defineField({ name: 'kickerTags',   title: 'Kicker Tags',    type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'byline',       title: 'Byline',         type: 'string' }),
    defineField({ name: 'seo',           title: 'SEO',            type: 'seoBlock' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'customer' },
  },
})
