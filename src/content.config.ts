import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.object({
  en: z.string().min(1),
  zh: z.string().min(1),
});

const image = z.object({
  src: z.string(),
  alt: localizedText,
});

const talents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talents' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: localizedText,
    summary: localizedText,
    body: localizedText,
    portrait: image,
    previews: z.array(image).min(2),
    showreel: z.object({ poster: z.string(), src: z.string().optional() }),
    timeline: z.array(z.object({ year: z.string(), title: localizedText, body: localizedText, image: image.optional() })).default([]),
    projectSlugs: z.array(z.string()).default([]),
    order: z.number().int(),
    published: z.boolean().default(false),
    placeholder: z.boolean().default(true),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: localizedText,
    slug: z.string(),
    year: z.string(),
    client: localizedText,
    discipline: localizedText,
    body: localizedText,
    cover: image,
    gallery: z.array(image),
    previewVideo: z.object({ src: z.string(), poster: z.string() }).optional(),
    talentSlugs: z.array(z.string()).default([]),
    order: z.number().int(),
    published: z.boolean().default(false),
    placeholder: z.boolean().default(true),
  }),
});

const homeFilms = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home-films' }),
  schema: z.object({
    title: localizedText,
    label: localizedText,
    poster: image,
    videoSrc: z.string().optional(),
    projectSlug: z.string().optional(),
    order: z.number().int(),
    placeholder: z.boolean().default(true),
  }),
});

export const collections = { talents, projects, 'home-films': homeFilms };
