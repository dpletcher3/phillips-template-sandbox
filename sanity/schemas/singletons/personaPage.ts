import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'personaPage',
  title: 'Persona Page',
  type: 'document',
  fields: [
    defineField({ name: 'persona',     title: 'Persona', type: 'string', options: { list: ['Manufacturer','Federal/DoD','Machinist','Researcher','Partner/Distributor'] }, validation: r => r.required() }),
    defineField({ name: 'headline',    title: 'Headline',    type: 'string'   }),
    defineField({ name: 'heroImage',   title: 'Hero Image',  type: 'image'    }),
    defineField({ name: 'description', title: 'Description', type: 'text'     }),
    defineField({ name: 'featuredSolutions', title: 'Featured Solutions', type: 'array', of: [{ type: 'reference', to: [{ type: 'solution' }] }] }),
    defineField({ name: 'featuredBrands',    title: 'Featured Brands',    type: 'array', of: [{ type: 'reference', to: [{ type: 'brand'    }] }] }),
    defineField({ name: 'ctaLabel',    title: 'CTA Label',   type: 'string'   }),
    defineField({ name: 'ctaUrl',      title: 'CTA URL',     type: 'string'   }),
    defineField({ name: 'forLabel',   title: 'For Label',   type: 'string', description: 'e.g. "For Manufacturers"' }),
    defineField({ name: 'stats',      title: 'Stats',       type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string', title: 'Value' }, { name: 'label', type: 'string', title: 'Label' }] }], validation: r => r.max(3) }),
    defineField({ name: 'filterTabs', title: 'Filter Tabs', type: 'array', of: [{ type: 'object', fields: [
      { name: 'id', type: 'string', title: 'Tab ID' },
      { name: 'label', type: 'string', title: 'Label' },
      { name: 'solutions', type: 'array', title: 'Solutions', of: [{ type: 'reference', to: [{ type: 'solution' }] }] },
      { name: 'brands', type: 'array', title: 'Brands', of: [{ type: 'reference', to: [{ type: 'brand' }] }] },
    ] }] }),
    defineField({ name: 'seo',         title: 'SEO',         type: 'seoBlock' }),
  ],
})
