import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Shown in the header and the footer.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "e.g. 'Industrial Designer'.",
    }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "heroLead",
      type: "string",
      description: "First half of the home page headline, in black.",
    }),
    defineField({
      name: "heroTrail",
      type: "string",
      description: "Second half of the home page headline, in grey.",
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 3,
      description: "The short paragraph under the hero line.",
    }),
    defineField({
      name: "aboutBody",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "The longer bio on the About page.",
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
    }),
    defineField({
      name: "portrait",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
