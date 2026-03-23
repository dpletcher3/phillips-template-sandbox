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
    defineField({ name: 'seo',         title: 'SEO',         type: 'seoBlock' }),
  ],
})
