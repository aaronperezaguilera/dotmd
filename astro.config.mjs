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
import react from '@astrojs/react'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap(), mdx()],
  site: 'https://dotmd.io',
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
