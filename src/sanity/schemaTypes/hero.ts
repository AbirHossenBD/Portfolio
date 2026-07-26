import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section & Header",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Hero Section & Header Settings",
      readOnly: true,
    }),

    // --- NAVBAR LOGO ---
    defineField({
      name: "logoText",
      title: "Header Monogram / Logo Text",
      type: "string",
      initialValue: "AH",
    }),
    defineField({
      name: "logoImage",
      title: "Header Image Logo (Optional Override)",
      type: "image",
      options: { hotspot: true },
    }),

    // --- HERO CONTENT ---
    defineField({
      name: "topTagline",
      title: "Top Tagline / Sub-badge",
      type: "string",
      initialValue: "HI, I'M",
    }),
    defineField({
      name: "subheadingText",
      title: "Subheading Text (Under Name)",
      type: "string",
      initialValue: "I'm building my future through software.",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted / Italic Word in Subheading",
      type: "string",
      initialValue: "future",
    }),
    defineField({
      name: "description",
      title: "Main Narrative Description",
      type: "text",
      rows: 4,
      initialValue:
        "The digital world feels like home to me. I enjoy creating things people can experience. From websites to AI and someday games, I love learning how great software is created—one project at a time.",
    }),

    // --- LIVE STATUS TICKER WITH ICON PICKER ---
    defineField({
      name: "statusItems",
      title: "Status Ticker Items",
      type: "array",
      of: [
        {
          type: "object",
          title: "Status Item",
          fields: [
            {
              name: "label",
              title: "Label Text",
              type: "string",
            },
            {
              name: "icon",
              title: "Choose Icon",
              type: "iconPicker",
              options: {
                providers: ["lu", "fa", "si"],
                outputFormat: "react-icons",
              },
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "icon.name",
            },
          },
        },
      ],
    }),

    // --- CTAS ---
    defineField({
      name: "primaryCtaText",
      title: "Primary Button Text",
      type: "string",
      initialValue: "Explore My Work",
    }),
    defineField({
      name: "primaryCtaLink",
      title: "Primary Button Link",
      type: "string",
      initialValue: "#projects",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "Download Resume",
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Secondary Button Link",
      type: "string",
      initialValue: "/resume.pdf",
    }),

    // --- ATMOSPHERE & MEDIA ---
    defineField({
      name: "watermarkCode",
      title: "Background Code Snippet Watermark",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "portrait",
      title: "Portrait Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "portraitAlt",
      title: "Portrait Alt Text",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Landscape/Atmosphere Image (Behind Portrait)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "glowColor",
      title: "Ambient Background Glow Color (CSS Color String)",
      type: "string",
      initialValue: "rgba(147, 51, 234, 0.12)",
    }),
  ],
});