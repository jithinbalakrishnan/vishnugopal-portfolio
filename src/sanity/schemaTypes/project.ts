import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      description: "One line under the title, e.g. 'Semi-automatic washing machine'.",
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "Home Appliances",
          "Lighting",
          "Consumer Electronics",
          "CMF",
          "Sanitaryware",
          "UI / UX",
        ],
      },
    }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "client", type: "string" }),
    defineField({
      name: "role",
      type: "string",
      description: "What you did, comma separated.",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show this project on the home page.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first.",
      initialValue: 0,
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "tone",
      type: "string",
      description:
        "Hex colour used behind the cover while the image loads, e.g. #ededed.",
      initialValue: "#ededed",
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "The large paragraph at the top of the case study.",
    }),
    defineField({ name: "challenge", type: "text", rows: 4 }),
    defineField({ name: "approach", type: "text", rows: 4 }),
    defineField({ name: "outcome", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      title: "Process sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", type: "string", title: "Alternative text" }),
              ],
            }),
            defineField({
              name: "tone",
              type: "string",
              initialValue: "#f1f1f1",
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "body", media: "image" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
