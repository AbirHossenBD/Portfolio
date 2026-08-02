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
      name: 'subtitle',
      title: 'Subtitle / Details',
      description: 'Optional detail like "3+ Projects" or "UI/UX Design".',
      type: 'string',
    }),
    // --- NEW DESCRIPTION FIELD ---
    defineField({
      name: 'description',
      title: 'Skill Description',
      description: 'A brief description of your experience or workflow with this skill.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'Select which category this skill belongs to.',
      type: 'reference',
      to: [{ type: 'skillCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom Colored Icon (Image)',
      description: 'Upload an SVG or PNG to use a fully colored icon. This overrides the standard icon dropdown below.',
      type: 'image',
    }),
    defineField({
      name: 'icon',
      title: 'Standard Icon (Fallback)',
      description: "Pick a standard icon if you don't have a custom image uploaded.",
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
      description: 'Lower numbers show first within the category.',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category.title' },
  },
})