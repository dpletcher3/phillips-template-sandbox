import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'productLine',
  title: 'Product Line',
  type: 'object',
  fields: [
    defineField({ name: 'name',        title: 'Series Name',   type: 'string'  }),
    defineField({ name: 'seriesLabel', title: 'Series Label',  type: 'string'  }),
    defineField({ name: 'models',      title: 'Models',        type: 'string', description: 'e.g. VF-1 · VF-2 · VF-3' }),
    defineField({ name: 'description', title: 'Description',   type: 'text'    }),
    defineField({ name: 'image',       title: 'Image',         type: 'image'   }),
    defineField({ name: 'brochureUrl', title: 'Brochure URL',  type: 'url'     }),
    defineField({ name: 'xTravel',     title: 'X Travel',      type: 'string'  }),
    defineField({ name: 'spindleSpeed',title: 'Spindle Speed', type: 'string'  }),
    defineField({ name: 'tableLoad',   title: 'Table Load',    type: 'string'  }),
    defineField({ name: 'axes',        title: 'Axes',          type: 'string'  }),
    defineField({ name: 'bestFor',     title: 'Best For',      type: 'string'  }),
    defineField({ name: 'tagline',    title: 'Tagline',       type: 'string'  }),
    defineField({ name: 'type',       title: 'Machine Type',  type: 'string'  }),
    defineField({ name: 'keySpecs',   title: 'Key Specs',     type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string', title: 'Value' }, { name: 'label', type: 'string', title: 'Label' }] }] }),
    defineField({ name: 'modelDetails', title: 'Model Details', type: 'array', of: [{ type: 'object', fields: [{ name: 'name', type: 'string', title: 'Name' }, { name: 'travel', type: 'string', title: 'Travel' }, { name: 'spindle', type: 'string', title: 'Spindle' }] }] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'models' },
  },
})
