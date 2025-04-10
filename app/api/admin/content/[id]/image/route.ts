import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile } from 'fs/promises'
import { join } from 'path'

// POST /api/admin/content/[id]/image - загрузить изображение для контента
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    // Проверяем, что пользователь модератор или админ
    if (!session?.user || !['moderator', 'admin'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Доступ запрещен' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Изображение не найдено' },
        { status: 400 }
      )
    }

    // Создаем уникальное имя файла
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${Date.now()}-${file.name}`
    const path = join(process.cwd(), 'public/uploads', fileName)
    
    // Сохраняем файл
    await writeFile(path, buffer)
    
    // Обновляем URL изображения в базе данных
    const imageUrl = `/uploads/${fileName}`
    const { rows } = await pool.query(
      `UPDATE content 
       SET image_url = $1 
       WHERE id = $2 
       RETURNING id, title, image_url`,
      [imageUrl, params.id]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Контент не найден' },
        { status: 404 }
      )
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
} 