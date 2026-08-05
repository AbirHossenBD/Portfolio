// Path: src/sanity/schemaTypes/contact.ts
import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact & Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Contact & Footer Settings",
      readOnly: true,
    }),

    // --- CONTACT SECTION FIELDS ---
    defineField({
      name: "badgeTagline",
      title: "Badge Tagline",
      type: "string",
      initialValue: "CONTACT",
    }),
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      initialValue: "Let's connect.",
    }),
    defineField({
      name: "subheading",
      title: "Subheading / Pitch",
      type: "text",
      rows: 2,
      initialValue:
        "Open to collaborations, freelance creative work, and engineering opportunities.",
    }),
    defineField({
      name: "email",
      title: "Primary Direct Email",
      type: "string",
      initialValue: "abir.hossen@example.com",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status Badge",
      type: "string",
      initialValue: "Available for new projects & roles",
    }),
    defineField({
      name: "locationText",
      title: "Location Text",
      type: "string",
      initialValue: "Dhaka, Bangladesh",
    }),

    // --- SOCIAL & CONTACT LINKS ---
    defineField({
      name: "socialLinks",
      title: "Social & Contact Cards",
      type: "array",
      of: [
        {
          type: "object",
          title: "Social Link",
          fields: [
            defineField({
              name: "label",
              title: "Platform / Label Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "detail",
              title: "Display Detail / Username / Email",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Target URL / Link (e.g. mailto:... or https://...)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "iconImage",
              title: "Custom Icon Logo (SVG/PNG)",
              description: "Upload a custom SVG or PNG logo for this link.",
              type: "image",
              options: {
                accept: "image/svg+xml, image/png, image/jpeg",
              }
            }),
            defineField({
              name: "accentColor",
              title: "Hover Accent Color (Hex)",
              type: "string",
              initialValue: "#A855F7",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "detail",
            },
          },
        },
      ],
    }),

    // --- FOOTER SPECIFIC FIELDS ---
    defineField({
      name: "footerText",
      title: "Footer Credit Text",
      type: "string",
      initialValue: "Designed & Developed by Abir Hossen",
    }),
    defineField({
      name: "copyrightYear",
      title: "Copyright Year",
      type: "string",
      initialValue: "2026",
    }),
  ],
});