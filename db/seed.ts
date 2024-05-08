import { db, Posts } from 'astro:db'

export default async function () {
	await db.insert(Posts).values([{ slug: 'futuro-del-ecommerce' }])
}
