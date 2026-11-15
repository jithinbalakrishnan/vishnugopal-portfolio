import { defineField, defineType } from "sanity";

/** One row in the Experience or Education timeline on the About page. */
export const entry = defineType({
  name: "entry",
  title: "Timeline entry",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Experience", value: "experience" },
          { title: "Education", value: "education" },
        ],
        layout: "radio",
      },
      initialValue: "experience",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      description: "Job or course title.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "place", type: "string" }),
    defineField({
      name: "from",
      type: "string",
      description: "e.g. 04-2025 or 2017.",
    }),
    defineField({
      name: "to",
      type: "string",
      description: "e.g. 03-2026, or 'Present'.",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers come first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", company: "company", from: "from", to: "to" },
    prepare: ({ title, company, from, to }) => ({
      title,
      subtitle: [company, [from, to].filter(Boolean).join(" — ")]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
