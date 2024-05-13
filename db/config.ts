import { defineDb, defineTable, column } from 'astro:db'

const Posts = defineTable({
  columns: {
    slug: column.text({ primaryKey: true, unique: true }),
    views: column.number({ default: 0 })
  },
  indexes: {
    slug_idx: { on: ['slug'], unique: true }
  }
})

export default defineDb({
  tables: { Posts }
})
