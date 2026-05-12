import { defineArrayMember, defineField, defineType } from "sanity";

const stringArray = defineField({
  name: "items",
  title: "Bullet Points",
  description: "Add one short point per line item. Drag to reorder.",
  type: "array",
  of: [defineArrayMember({ type: "string" })],
});

const serviceItem = defineArrayMember({
  type: "object",
  title: "Card",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "body",
      title: "Description",
      description: "Keep this focused and easy to scan.",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "body",
    },
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website Editor",
  type: "document",
  groups: [
    {
      name: "brand",
      title: "Brand & Logo",
      default: true,
    },
    {
      name: "home",
      title: "Home Page",
    },
    {
      name: "services",
      title: "Services",
    },
    {
      name: "vision",
      title: "Vision",
    },
    {
      name: "about",
      title: "About",
    },
    {
      name: "contact",
      title: "Contact",
    },
    {
      name: "seo",
      title: "SEO & Analytics",
    },
  ],
  fields: [
    defineField({
      name: "brand",
      title: "Brand, Logo, and Footer",
      description: "Edit the business name, footer copyright text, and website logo.",
      type: "object",
      group: "brand",
      fields: [
        defineField({
          name: "name",
          title: "Business Name",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "shortName",
          title: "Short Name",
          description: "Used in compact places if needed.",
          type: "string",
        }),
        defineField({
          name: "footer",
          title: "Footer Copyright Text",
          type: "string",
        }),
        defineField({
          name: "logo",
          title: "Upload Logo",
          description: "Recommended: PNG or SVG with a transparent background.",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "logoUrl",
          title: "Logo URL Fallback",
          description: "Only use this if you prefer linking to an image instead of uploading one.",
          type: "url",
        }),
        defineField({
          name: "logoAlt",
          title: "Logo Alt Text",
          description: "Describe the logo for screen readers.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO, Sharing, and Analytics",
      description: "Edit search result text, social sharing image, and Google Analytics.",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "siteUrl",
          title: "Live Website URL",
          description: "Use the final public domain once it is connected.",
          type: "url",
        }),
        defineField({
          name: "title",
          title: "Search Result Title",
          description: "Appears in Google results and browser tabs.",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Search Result Description",
          description: "A short summary of the business for search engines.",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          title: "Social Sharing Image URL",
          description: "Optional image used when the site is shared on social platforms.",
          type: "url",
        }),
        defineField({
          name: "locale",
          title: "Locale",
          description: "Usually en_US.",
          type: "string",
        }),
        defineField({
          name: "gaMeasurementId",
          title: "Google Analytics Measurement ID",
          description: "Example: G-XXXXXXXXXX",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Top Hero Section",
      description: "The first section visitors see on the homepage.",
      type: "object",
      group: "home",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Small Label",
          type: "string",
        }),
        defineField({
          name: "headline",
          title: "Main Headline",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "audience",
          title: "Audience Description",
          description: "Short text explaining who this service is for.",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "primaryCta",
          title: "Primary Button Text",
          type: "string",
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary Button Text",
          type: "string",
        }),
        defineField({
          name: "image",
          title: "Hero Image URL",
          description: "Large background image near the top of the page.",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "heroPanel",
      title: "Hero Highlight Panel",
      description: "The small summary panel near the hero section.",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Panel Text", type: "text", rows: 3 }),
        defineField({
          name: "chips",
          title: "Quick Tags",
          description: "Short phrases shown as small tags.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "servicesIntro",
      title: "Services Intro",
      description: "Headline and button text above the services cards.",
      type: "object",
      group: "services",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "Button Text", type: "string" }),
      ],
    }),
    defineField({
      name: "services",
      title: "Main Service Cards",
      description: "Cards shown near the top of the site. Drag to reorder.",
      type: "array",
      group: "services",
      of: [serviceItem],
    }),
    defineField({
      name: "servicePaths",
      title: "Service Path Cards",
      description: "More specific service options shown further down the page.",
      type: "object",
      group: "services",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "items",
          title: "Service Path Cards",
          description: "Drag to reorder.",
          type: "array",
          of: [serviceItem],
        }),
      ],
    }),
    defineField({
      name: "journey",
      title: "Journey Steps",
      description: "The short step-by-step career process section.",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        defineField({
          name: "steps",
          title: "Step Labels",
          description: "Short phrases such as Clarify your goal.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "expectations",
      title: "What to Expect",
      description: "Bullet list explaining the client experience.",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
        stringArray,
      ],
    }),
    defineField({
      name: "vision",
      title: "Vision Words Section",
      description: "Edit the Vision Words heading and each Ask, Seek, Knock card.",
      type: "object",
      group: "vision",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({
          name: "words",
          title: "Vision Word Cards",
          description: "Each card has a word, a lead sentence, and bullets.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              title: "Vision Word",
              fields: [
                defineField({ name: "word", title: "Word", type: "string" }),
                defineField({
                  name: "lead",
                  title: "Lead Sentence",
                  type: "text",
                  rows: 2,
                }),
                defineField({
                  name: "bullets",
                  title: "Bullets",
                  description: "Drag to reorder.",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
              preview: {
                select: {
                  title: "word",
                  subtitle: "lead",
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About Section",
      description: "Business description plus mission, vision, and goals cards.",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({
          name: "statements",
          title: "Mission, Vision, and Goals Cards",
          description: "Cards shown in the about area. Drag to reorder.",
          type: "array",
          of: [serviceItem],
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call-to-Action Banner",
      description: "The large booking prompt above the contact form.",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "button", title: "Button Text", type: "string" }),
        defineField({ name: "image", title: "Background Image URL", type: "url" }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact and Booking",
      description: "Contact text, phone, email, and Calendly settings.",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "string" }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({
          name: "bookingUrl",
          title: "Booking Button URL",
          description: "Where the booking buttons should send visitors.",
          type: "url",
        }),
        defineField({
          name: "bookingLabel",
          title: "Booking Button Label",
          type: "string",
        }),
        defineField({
          name: "calendlyUrl",
          title: "Calendly Embed URL",
          description:
            "Paste your Calendly event link, for example https://calendly.com/your-name/free-call",
          type: "url",
        }),
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
