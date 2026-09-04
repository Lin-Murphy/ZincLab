import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? 'lhlost58',
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2026-03-01',
  useCdn: false,
});

export interface SanityDemoProject {
  title?: { en?: string; zh?: string };
  intro?: { en?: string; zh?: string };
  coverUrl?: string;
  coverAlt?: { en?: string; zh?: string };
  modules?: Array<{ en?: string; zh?: string }>;
}

export async function getSanityDemoProject() {
  try {
    return await sanityClient.fetch<SanityDemoProject | null>(
      `*[_type == "project" && slug.current == $slug && published == true][0]{title, intro, coverUrl, coverAlt, modules}`,
      { slug: 'sanity-demo' },
    );
  } catch {
    return null;
  }
}
