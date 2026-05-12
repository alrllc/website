import { defineArrayMember, defineField, defineType } from "sanity";

const stringArray = defineField({
  name: "items",
  title: "Items",
  type: "array",
  of: [defineArrayMember({ type: "string" })],
});

const serviceItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website Content",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "shortName", title: "Short Name", type: "string" }),
        defineField({ name: "footer", title: "Footer Text", type: "string" }),
        defineField({ name: "logoUrl", title: "Logo URL", type: "url" }),
        defineField({ name: "logoAlt", title: "Logo Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "siteUrl", title: "Site URL", type: "url" }),
        defineField({ name: "title", title: "SEO Title", type: "string" }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image URL",
          type: "url",
        }),
        defineField({ name: "locale", title: "Locale", type: "string" }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 2,
        }),
        defineField({ name: "audience", title: "Audience", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "string" }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "string",
        }),
        defineField({ name: "image", title: "Image URL", type: "url" }),
      ],
    }),
    defineField({
      name: "heroPanel",
      title: "Hero Panel",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 3 }),
        defineField({
          name: "chips",
          title: "Chips",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "servicesIntro",
      title: "Services Intro",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "CTA", type: "string" }),
      ],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [serviceItem],
    }),
    defineField({
      name: "servicePaths",
      title: "Service Paths",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [serviceItem],
        }),
      ],
    }),
    defineField({
      name: "journey",
      title: "Journey",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "expectations",
      title: "What to Expect",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        stringArray,
      ],
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "words",
          title: "Words",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "word", title: "Word", type: "string" }),
                defineField({ name: "lead", title: "Lead", type: "text", rows: 2 }),
                defineField({
                  name: "bullets",
                  title: "Bullets",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({
          name: "statements",
          title: "Statements",
          type: "array",
          of: [serviceItem],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "button", title: "Button", type: "string" }),
        defineField({ name: "image", title: "Image URL", type: "url" }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "bookingUrl", title: "Booking URL", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "brand.name",
      subtitle: "hero.headline",
    },
  },
});
