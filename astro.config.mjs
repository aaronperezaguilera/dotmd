import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import db from '@astrojs/db'
import remarkToc from 'remark-toc'
import remarkSmartypants from 'remark-smartypants'
import { remarkReadingTime } from './plugins/remark-reading-time.mjs'
import { rehypeAutolink } from './plugins/rehype-autolink'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeSlug from 'rehype-slug'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap(), mdx(), db()],
  site: 'https://dotmdx.com',
  output: 'hybrid',
  adapter: cloudflare(),
  vite: {
    define: {
      'process.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY)
    }
  },
  markdown: {
    smartypants: false,
    // Applied to .md and .mdx files
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: 'Tabla de contenidos'
        }
      ],
      remarkReadingTime,
      [
        remarkSmartypants,
        {
          dashes: false
        }
      ]
    ],
    rehypePlugins: [rehypeSlug, ...rehypeAutolink(), rehypeAccessibleEmojis]
  }
})
