import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '22a5c58r',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

export async function getServices() {
  const query = `*[_type == "service"]{ _id, title, description, icon }`;
  return await sanityClient.fetch(query);
}
