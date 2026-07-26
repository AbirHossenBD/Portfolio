// --- Path: src/sanity/schemaTypes/skillCategory.ts ---

import { defineField, defineType } from "sanity";

export const skillCategory = defineType({
  name: "skillCategory",
  title: "Skill Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      description: 'e.g., "ENGINEERING", "CREATIVE WORKFLOW".',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryId",
      title: "Category ID (For Ordering/Filtering)",
      description: "Unique slug-like ID for internal sorting (e.g., 'engineering').",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Category Description",
      description: "Appears on the right side. e.g., 'Core technologies I use...'.",
      type: "string",
    }),
    defineField({
      name: "themeColor",
      title: "Theme Color (Hex Code)",
      description: "Enter a 6-character hex code to color the category badge (e.g., #3B82F6 for blue, #A855F7 for purple).",
      type: "string",
      initialValue: "#A855F7",
    }),
    defineField({
      name: "customBadgeIcon",
      title: "Custom Badge Icon (Image)",
      description: "Upload an SVG or PNG to use as the category icon. This overrides the icon picker below.",
      type: "image",
    }),
    defineField({
      name: "badgeIcon",
      title: "Category Badge Icon (Fallback)",
      type: "iconPicker",
      options: {
        providers: ["lu", "fa", "si"],
        outputFormat: "react-icons",
      },
    }),
    defineField({
      name: "order",
      title: "Category Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "categoryId.current",
      icon: "badgeIcon.name",
    },
  },
});