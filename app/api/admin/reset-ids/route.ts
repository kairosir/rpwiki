import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь админ
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Сбрасываем последовательность
    await pool.query('SELECT setval(\'users_id_seq\', 1, false)')

    // Обновляем существующие ID
    await pool.query(`
      WITH RECURSIVE cte AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as new_id
        FROM users
      )
      UPDATE users
      SET id = cte.new_id
      FROM cte
      WHERE users.id = cte.id
    `)

    // Устанавливаем последовательность на следующее значение
    await pool.query('SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM users))')

    return NextResponse.json({ message: 'User IDs reset successfully' })
  } catch (error) {
    console.error('Error resetting user IDs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 