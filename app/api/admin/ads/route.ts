import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/admin/ads - получить все рекламные объявления
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь админ
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    const { rows } = await pool.query(`
      SELECT 
        id,
        title,
        description,
        url,
        status,
        views,
        clicks,
        image_url,
        created_at,
        updated_at
      FROM ads
      ORDER BY created_at DESC
    `)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Ошибка при получении рекламы:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

// POST /api/admin/ads - создать новое рекламное объявление
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь админ
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    const { title, description, url, status = 'inactive' } = await request.json()

    const { rows } = await pool.query(
      `INSERT INTO ads (title, description, url, status, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, url, status, created_at`,
      [title, description, url, status, session.user.id]
    )

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Ошибка при создании рекламы:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 