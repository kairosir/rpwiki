import pool from '@/lib/db'

export interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'moderator' | 'user'
  created_at: Date
  updated_at: Date
}

export const userService = {
  async getAll(): Promise<User[]> {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
    return rows
  },

  async getById(id: number): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0] || null
  },

  async create(data: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { rows } = await pool.query(
      'INSERT INTO users (username, email, role) VALUES ($1, $2, $3) RETURNING *',
      [data.username, data.email, data.role]
    )
    return rows[0]
  },

  async update(id: number, data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User | null> {
    const sets: string[] = []
    const values: any[] = []
    let paramCount = 1

    if (data.username) {
      sets.push(`username = $${paramCount}`)
      values.push(data.username)
      paramCount++
    }
    if (data.email) {
      sets.push(`email = $${paramCount}`)
      values.push(data.email)
      paramCount++
    }
    if (data.role) {
      sets.push(`role = $${paramCount}`)
      values.push(data.role)
      paramCount++
    }

    if (sets.length === 0) return null

    values.push(id)
    const { rows } = await pool.query(
      `UPDATE users SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${paramCount} RETURNING *`,
      values
    )
    return rows[0] || null
  },

  async delete(id: number): Promise<User | null> {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
    return rows[0] || null
  }
} 