import { defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Company / Organization',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (Leave blank if present)',
      type: 'date',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights / Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})