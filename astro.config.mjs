import { defineConfig } from 'astro/config'
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
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap(), mdx(), db()],
  site: 'https://dotmd.io',
  output: 'static',
  adapter: cloudflare(),
  vite: {
    define: {
      'process.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY)
    },
    plugins: [tailwindcss()]
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
