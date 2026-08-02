import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Software Engineering', value: 'Software' },
          { title: 'Creative & Cinematic', value: 'Creative' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Front Image (Thumbnail)',
      description: 'This image appears on the project card in the main grid before it is clicked.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    // --- UPDATED COLOR FIELD ---
    defineField({
      name: 'color',
      title: 'Theme Color (Hex Code)',
      description: 'Enter a 6-character hex code to color the project card (e.g., #3B82F6 for blue, #A855F7 for purple).',
      type: 'string',
      initialValue: '#A855F7',
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      description: 'The short text that appears on the front project card.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'sections',
      title: 'Project Details & Images (Modal Content)',
      description: 'Add multiple images and descriptions. These will appear when the project is clicked.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'text',
              title: 'Section Description',
              type: 'text',
              rows: 4,
            }
          ],
          preview: {
            select: {
              title: 'text',
              media: 'image'
            }
          }
        }
      ]
    }),
  ],
})