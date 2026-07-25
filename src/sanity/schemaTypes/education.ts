import { defineField, defineType } from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year (or Present)',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Additional Details',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})