import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' },{ title: 'H2', value: 'h2' },{ title: 'H3', value: 'h3' },{ title: 'Quote', value: 'blockquote' }], marks: { decorators: [{ title: 'Bold', value: 'strong' },{ title: 'Italic', value: 'em' }] } }),
    defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' },{ name: 'caption', type: 'string', title: 'Caption' }] }),
  ],
})
