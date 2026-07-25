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
    defineField({
      name: 'icon',
      title: 'Icon',
      description:
        "Pick the icon that matches this skill. If nothing fits yet, use 'Generic / Other' — a developer can add a new icon option in code later.",
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'HTML / CSS', value: 'html-css' },
          { title: 'React', value: 'react' },
          { title: 'Next.js', value: 'nextjs' },
          { title: 'Git', value: 'git' },
          { title: 'VS Code', value: 'vscode' },
          { title: 'Figma', value: 'figma' },
          { title: 'Tailwind CSS', value: 'tailwind' },
          { title: 'Sanity', value: 'sanity' },
          { title: 'Vercel', value: 'vercel' },
          { title: 'Blender', value: 'blender' },
          { title: 'AI Tooling', value: 'ai' },
          { title: 'System Design', value: 'system-design' },
          { title: 'Motion Design', value: 'motion-design' },
          { title: 'Backend APIs', value: 'backend' },
          { title: 'Video Editing', value: 'video-editing' },
          { title: 'Photo Editing', value: 'photo-editing' },
          { title: 'Video Creation', value: 'video-creation' },
          { title: 'Script Writing', value: 'script-writing' },
          { title: 'Generic / Other', value: 'generic' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      description: 'Lower numbers show first within the category. Leave blank to sort by name.',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
})