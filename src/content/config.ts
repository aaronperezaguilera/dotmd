import { z, defineCollection } from 'astro:content'
// Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			contentType: z.string(),
			pubDate: z.date(),
			author: z.string(),
			image: z.object({
				url: image(),
				alt: z.string()
			}),
			tags: z.array(z.string())
		})
})
// Export a single `collections` object to register your collection(s)
export const collections = {
	blog: blogCollection
}
