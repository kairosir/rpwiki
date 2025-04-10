import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь админ
    if (!session?.user || !['admin', 'moderator'].includes(session.user.role as string)) {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    // Получаем статистику пользователей
    const { rows: userStats } = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN last_login > NOW() - INTERVAL '30 days' THEN 1 END) as active_users,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as new_users
      FROM users
    `)

    // Получаем статистику контента
    const { rows: contentStats } = await pool.query(`
      SELECT 
        COUNT(*) as total_content,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_content,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_content
      FROM content
    `)

    // Получаем статистику рекламы
    const { rows: adStats } = await pool.query(`
      SELECT 
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_ads,
        SUM(views) as total_views,
        SUM(clicks) as total_clicks
      FROM ads
    `)

    return NextResponse.json({
      users: {
        total: parseInt(userStats[0].total_users),
        active: parseInt(userStats[0].active_users),
        new: parseInt(userStats[0].new_users)
      },
      content: {
        total: parseInt(contentStats[0].total_content),
        published: parseInt(contentStats[0].published_content),
        draft: parseInt(contentStats[0].draft_content)
      },
      ads: {
        active: parseInt(adStats[0].active_ads) || 0,
        views: parseInt(adStats[0].total_views) || 0,
        clicks: parseInt(adStats[0].total_clicks) || 0
      }
    })
  } catch (error) {
    console.error('Ошибка при получении статистики:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 