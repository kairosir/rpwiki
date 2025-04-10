import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/admin/content - получить весь контент
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь модератор или админ
    if (!session?.user || !['moderator', 'admin'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    const { rows } = await pool.query(`
      SELECT 
        c.id,
        c.title,
        c.type,
        c.status,
        c.created_at,
        c.updated_at,
        c.image_url
      FROM content c
      ORDER BY c.created_at DESC
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Ошибка при получении контента:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

// POST /api/admin/content - создать новый контент
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь модератор или админ
    if (!session?.user || !['moderator', 'admin'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    const { title, type, content, status = 'draft' } = await request.json()

    const { rows } = await pool.query(
      `INSERT INTO content (title, type, content, status, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, type, status, created_at`,
      [title, type, content, status, session.user.id]
    )

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Ошибка при создании контента:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 