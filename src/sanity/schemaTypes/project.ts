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
      name: 'isFeatured',
      title: 'Featured Project (Large Card)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Software', value: 'Software' },
          { title: 'AI & Automation', value: 'AI & Automation' },
          { title: 'Creative', value: 'Creative' },
          { title: 'Game Dev', value: 'Game Dev' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Front Image (Thumbnail)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      initialValue: 'Completed',
    }),
    defineField({
      name: 'dateLabel',
      title: 'Date Label (e.g. May 2024)',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type (e.g. Personal Project, Freelance Project)',
      type: 'string',
    }),
    defineField({
      name: 'highlightsTitle',
      title: 'Highlights Title (e.g. "What I learned")',
      type: 'string',
      initialValue: 'What I learned',
    }),
    defineField({
      name: 'highlights',
      title: 'Bullet Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text (e.g. Read Case Study)',
      type: 'string',
      initialValue: 'Explore Project',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'icon',
      title: 'Compact Icon (For Small Projects)',
      type: 'string',
      description: 'e.g., "dollar", "gamepad", "puzzle", "brain"',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    }),
    defineField({
      name: 'color',
      title: 'Theme & Hover Color (Hex Code)',
      description: 'Enter a hex code for hover effects (e.g. #3B82F6 for blue, #A855F7 for purple, #10B981 for green).',
      type: 'string',
      initialValue: '#A855F7',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'sections',
      title: 'Project Details & Images (Modal Content)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } },
            { name: 'text', title: 'Section Description', type: 'text', rows: 4 }
          ],
        }
      ]
    }),
  ],
})