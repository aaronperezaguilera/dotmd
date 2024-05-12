import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export async function GET(context) {
  const posts = await getCollection('blog')
  return rss({
    title: 'Aaron - Desarrollador frontend',
    site: context.site,
    description: 'Mi viaje a través del desarrollo web y el eCommerce.',
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
      atom: 'http://www.w3.org/2005/Atom'
    },
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: `aaronperezaguilera@gmail.com (${post.data.author})`,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      customData: `<media:content
          type="image/webp"
          width="1920"
          height="1080"
          medium="image"
          url="https://dotmd.io${post.data.image.url}" />
      `
    })),
    customData:
      `<language>es-es</language>` +
      `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />` +
      `<image><title>Aaron - Desarrollador frondend</title><url>${context.site}rss.png</url><link>${context.site}</link></image>`
  })
}
