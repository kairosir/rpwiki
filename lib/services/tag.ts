import { pool } from '@/lib/db'

export interface Tag {
  id: number
  name: string
  slug: string
  description?: string
  created_at: Date
  updated_at: Date
}

export const tagService = {
  async getAllTags() {
    const { rows } = await pool.query('SELECT * FROM tags ORDER BY name')
    return rows
  },

  async getTagBySlug(slug: string) {
    const { rows } = await pool.query('SELECT * FROM tags WHERE slug = $1', [slug])
    return rows[0]
  },

  async createTag(name: string, slug: string) {
    const { rows } = await pool.query(
      'INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
    )
    return rows[0]
  },

  async updateTag(slug: string, name: string, newSlug: string) {
    const { rows } = await pool.query(
      'UPDATE tags SET name = $1, slug = $2 WHERE slug = $3 RETURNING *',
      [name, newSlug, slug]
    )
    return rows[0]
  },

  async deleteTag(slug: string) {
    const { rows } = await pool.query(
      'DELETE FROM tags WHERE slug = $1 RETURNING *',
      [slug]
    )
    return rows[0]
  }
} 