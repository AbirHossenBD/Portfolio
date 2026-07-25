import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      description:
        'Shown on the right side of the hero section. If left empty, the site falls back to the monogram placeholder.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'portraitAlt',
      title: 'Portrait Alt Text',
      description: 'Describe the photo for accessibility, e.g. "Portrait of Abir Hossen".',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as { portrait?: unknown } | undefined
          if (doc?.portrait && !value) {
            return 'Add alt text when a portrait image is set'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: { media: 'portrait' },
    prepare({ media }) {
      return { title: 'Hero Section', media }
    },
  },
})