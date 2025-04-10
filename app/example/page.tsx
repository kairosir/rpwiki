'use client'

import { ImageUpload } from '@/components/ui/image-upload'

export default function ExamplePage() {
  const handleImageUpload = (url: string, path: string) => {
    console.log('Uploaded image URL:', url)
    console.log('Image path in storage:', path)
    // Здесь вы можете сохранить url и path в базу данных
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Загрузка изображения</h1>
      <div className="max-w-xl">
        <ImageUpload onUpload={handleImageUpload} />
      </div>
    </div>
  )
} 