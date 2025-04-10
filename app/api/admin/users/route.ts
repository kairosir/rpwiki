import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/admin/users - получить список всех пользователей
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь админ
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    const { rows } = await pool.query(`
      SELECT id, email, username, role, created_at, last_login
      FROM users
      ORDER BY created_at DESC
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 