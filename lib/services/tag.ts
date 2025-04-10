import pool from '@/lib/db'

export interface Tag {
  id: number
  name: string
  slug: string
  description?: string
  created_at: Date
  updated_at: Date
}

export const tagService = {
  async getAll(): Promise<Tag[]> {
    const { rows } = await pool.query('SELECT * FROM tags ORDER BY created_at DESC')
    return rows
  },

  async getBySlug(slug: string): Promise<Tag | null> {
    const { rows } = await pool.query('SELECT * FROM tags WHERE slug = $1', [slug])
    return rows[0] || null
  },

  async create(data: Omit<Tag, 'id' | 'created_at' | 'updated_at'>): Promise<Tag> {
    const { rows } = await pool.query(
      'INSERT INTO tags (name, slug, description) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.slug, data.description]
    )
    return rows[0]
  },

  async update(slug: string, data: Partial<Omit<Tag, 'id' | 'created_at' | 'updated_at'>>): Promise<Tag | null> {
    const sets: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (data.name) {
      sets.push(`name = $${paramCount}`)
      values.push(data.name)
      paramCount++
    }
    if (data.slug) {
      sets.push(`slug = $${paramCount}`)
      values.push(data.slug)
      paramCount++
    }
    if (data.description !== undefined) {
      sets.push(`description = $${paramCount}`)
      values.push(data.description)
      paramCount++
    }

    if (sets.length === 0) return null

    values.push(slug)
    const { rows } = await pool.query(
      `UPDATE tags SET ${sets.join(', ')}, updated_at = NOW() WHERE slug = $${paramCount} RETURNING *`,
      values
    )
    return rows[0] || null
  },

  async delete(slug: string): Promise<Tag | null> {
    const { rows } = await pool.query('DELETE FROM tags WHERE slug = $1 RETURNING *', [slug])
    return rows[0] || null
  }
} 