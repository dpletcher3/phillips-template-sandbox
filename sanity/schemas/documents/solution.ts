import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({ name: 'name',            title: 'Name',              type: 'string',  validation: r => r.required() }),
    defineField({ name: 'slug',            title: 'Slug',              type: 'slug',    options: { source: 'name' } }),
    defineField({ name: 'offering',        title: 'Offering Category', type: 'string',  options: { list: [
      { title: 'CNC Machining', value: 'cnc machining' },
      { title: 'Additive Manufacturing', value: 'additive manufacturing' },
      { title: 'Hybrid Manufacturing', value: 'hybrid manufacturing' },
      { title: 'Automation & Smart Manufacturing', value: 'automation & smart manufacturing' },
    ] } }),
    defineField({ name: 'heroImage',       title: 'Hero Image',        type: 'image'    }),
    defineField({ name: 'shortDesc',       title: 'Short Description', type: 'string'   }),
    defineField({ name: 'description',     title: 'Description',       type: 'blockContent' }),
    defineField({ name: 'relatedBrands',   title: 'Related Brands',    type: 'array', of: [{ type: 'reference', to: [{ type: 'brand' }] }] }),
    defineField({ name: 'bgNumber',        title: 'Background Number', type: 'string', description: 'e.g. 01' }),
    defineField({ name: 'typePills',       title: 'Type Pills',        type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'specStripe',      title: 'Spec Stripe',       type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'value', type: 'string', title: 'Value' }] }] }),
    defineField({ name: 'specBars',        title: 'Spec Bars',         type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string', title: 'Label' }, { name: 'value', type: 'number', title: 'Value' }, { name: 'max', type: 'number', title: 'Max' }, { name: 'unit', type: 'string', title: 'Unit' }, { name: 'note', type: 'string', title: 'Note' }] }] }),
    defineField({ name: 'specSectionTitle', title: 'Spec Section Title', type: 'string' }),
    defineField({ name: 'specSectionBody',  title: 'Spec Section Body',  type: 'text' }),
    defineField({ name: 'ctaTitle',         title: 'CTA Title',          type: 'string' }),
    defineField({ name: 'ctaSubtitle',      title: 'CTA Subtitle',       type: 'string' }),
    defineField({ name: 'ctaDescription',   title: 'CTA Description',    type: 'text' }),
    defineField({ name: 'ctaPrimaryLabel',  title: 'CTA Primary Label',  type: 'string' }),
    defineField({ name: 'ctaSecondaryLabel', title: 'CTA Secondary Label', type: 'string' }),
    defineField({ name: 'seo',             title: 'SEO',               type: 'seoBlock' }),
  ],
})
