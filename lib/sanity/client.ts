import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '9bo8jibp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
