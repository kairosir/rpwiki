import pool from '@/lib/db'

export interface Ad {
  id: number
  name: string
  type: 'banner' | 'text'
  position: string
  image_url?: string
  image_path?: string
  target_url: string
  title?: string
  description?: string
  is_active: boolean
  background_color?: string
  text_color?: string
  start_date: Date
  end_date: Date
  views: number
  clicks: number
  created_at: Date
  updated_at: Date
}

export const adService = {
  async getAll(): Promise<Ad[]> {
    const { rows } = await pool.query('SELECT * FROM ads ORDER BY created_at DESC')
    return rows
  },

  async getById(id: number): Promise<Ad | null> {
    const { rows } = await pool.query('SELECT * FROM ads WHERE id = $1', [id])
    return rows[0] || null
  },

  async create(data: Omit<Ad, 'id' | 'views' | 'clicks' | 'created_at' | 'updated_at'>): Promise<Ad> {
    const { rows } = await pool.query(`
      INSERT INTO ads (
        name, type, position, image_url, image_path, target_url,
        title, description, is_active, background_color, text_color,
        start_date, end_date, views, clicks
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 0, 0)
      RETURNING *
    `, [
      data.name,
      data.type,
      data.position,
      data.image_url,
      data.image_path,
      data.target_url,
      data.title,
      data.description,
      data.is_active,
      data.background_color,
      data.text_color,
      data.start_date,
      data.end_date
    ])
    return rows[0]
  },

  async update(id: number, data: Partial<Omit<Ad, 'id' | 'created_at' | 'updated_at'>>): Promise<Ad | null> {
    const sets: string[] = []
    const values: any[] = []
    let paramCount = 1

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        sets.push(`${key} = $${paramCount}`)
        values.push(value)
        paramCount++
      }
    })

    if (sets.length === 0) return null

    values.push(id)
    const { rows } = await pool.query(
      `UPDATE ads SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
      values
    )
    return rows[0] || null
  },

  async delete(id: number): Promise<Ad | null> {
    const { rows } = await pool.query('DELETE FROM ads WHERE id = $1 RETURNING *', [id])
    return rows[0] || null
  },

  async incrementViews(id: number): Promise<void> {
    await pool.query('UPDATE ads SET views = views + 1 WHERE id = $1', [id])
  },

  async incrementClicks(id: number): Promise<void> {
    await pool.query('UPDATE ads SET clicks = clicks + 1 WHERE id = $1', [id])
  },

  async getActive(): Promise<Ad[]> {
    const { rows } = await pool.query(`
      SELECT * FROM ads 
      WHERE is_active = true 
      AND start_date <= NOW() 
      AND end_date >= NOW()
      ORDER BY created_at DESC
    `)
    return rows
  }
} 