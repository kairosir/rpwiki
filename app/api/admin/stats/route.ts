import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    // Получаем статистику пользователей
    const { rows: userStats } = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN last_login > NOW() - INTERVAL '30 days' THEN 1 END) as active,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as new
      FROM users
    `)

    // Получаем статистику контента
    const { rows: contentStats } = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN published = true THEN 1 END) as published,
        COUNT(CASE WHEN published = false THEN 1 END) as draft
      FROM content
    `)

    // Получаем статистику рекламы
    const { rows: adStats } = await pool.query(`
      SELECT 
        COUNT(CASE WHEN is_active = true 
          AND start_date <= NOW() 
          AND end_date >= NOW() 
        THEN 1 END) as active,
        COALESCE(SUM(views), 0) as views,
        COALESCE(SUM(clicks), 0) as clicks
      FROM ads
    `)

    return NextResponse.json({
      users: {
        total: parseInt(userStats[0].total),
        active: parseInt(userStats[0].active),
        new: parseInt(userStats[0].new)
      },
      content: {
        total: parseInt(contentStats[0].total),
        published: parseInt(contentStats[0].published),
        draft: parseInt(contentStats[0].draft)
      },
      ads: {
        active: parseInt(adStats[0].active),
        views: parseInt(adStats[0].views),
        clicks: parseInt(adStats[0].clicks)
      }
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 