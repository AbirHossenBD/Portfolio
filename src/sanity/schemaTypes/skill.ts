import { defineField, defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Programming Languages', value: 'Programming' },
          { title: 'Frameworks & Tools', value: 'Tools' },
          { title: 'Creative & Media', value: 'Creative' },
          { title: 'Currently Learning', value: 'Currently Learning' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})