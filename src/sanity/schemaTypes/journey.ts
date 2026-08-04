import { defineField, defineType } from 'sanity'

export const journey = defineType({
  name: 'journey',
  title: 'Journey Milestone',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Milestone Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '💼 Work', value: 'work' },
          { title: '🎓 Education', value: 'education' },
          { title: '🚀 Projects', value: 'projects' },
          { title: '🏆 Achievements', value: 'achievements' },
          { title: '🌱 Personal', value: 'personal' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'e.g., "graduation", "briefcase", "monitor", "gamepad", "book", "baby"',
    }),
    defineField({
      name: 'year',
      title: 'Year or Period (e.g., "2026 - Present")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderDate',
      title: 'Sorting Date (Used for exact chronological ordering)',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Organization / Institution',
      type: 'string',
    }),
    defineField({
      name: 'shortSummary',
      title: 'Short Summary (Shown on Card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlights',
      title: 'Tags / Tech Stack (e.g., OOP, Photoshop, Python)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isCurrent',
      title: 'Is this your current activity? (Pulsing node effect)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'orderDateDesc',
      by: [{ field: 'orderDate', direction: 'desc' }],
    },
  ],
})