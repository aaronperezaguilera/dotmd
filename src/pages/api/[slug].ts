export const prerender = false

import { Posts, db, eq, sql } from 'astro:db'

export async function GET({ request }) {
	const slug = new URL(request.url).pathname.split('/').pop()

	if (slug) {
		const storedVisits = await db
			.select({ views: Posts.views })
			.from(Posts)
			.where(eq(Posts.slug, slug))

		if (storedVisits.length > 0 && storedVisits[0]) {
			return new Response(JSON.stringify(storedVisits[0].views), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		} else {
			return new Response(JSON.stringify(0), {
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
	}
}

export async function POST({ request }) {
	const slug = new URL(request.url).pathname.split('/').pop()

	if (slug) {
		const visits = await db
			.insert(Posts)
			.values({ slug: slug, views: 1 })
			.onConflictDoUpdate({ target: Posts.slug, set: { views: sql`${Posts.views} + 1` } })

		return new Response(JSON.stringify(visits), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
