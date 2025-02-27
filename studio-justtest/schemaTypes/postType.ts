import { defineType, defineField } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          const existing = await context
            .getClient({apiVersion: '2025-02-20'})
            .fetch(`*[_type == "post" && slug.current == $slug]{_id}`, { slug: slug.current });

          return existing.length > 0 ? "Slug must be unique" : true;
        }),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm'  },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility & SEO',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
        { type: 'code', title: 'Code Block', options: { language: 'javascript' } },
        { 
            type: 'object', 
            name: 'embedUrl', 
            title: 'Embed URL', 
            fields: [
              { name: 'url', type: 'url', title: 'URL' }
            ]
          }
      ],
    }),
  ],
});
