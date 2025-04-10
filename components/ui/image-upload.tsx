import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { uploadImage } from '@/lib/supabase-storage'

interface ImageUploadProps {
  onUpload: (url: string, path: string) => void
  defaultImage?: string
  className?: string
}

export function ImageUpload({ onUpload, defaultImage, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(defaultImage || null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setUploading(true)
      const file = acceptedFiles[0]
      
      // Создаем превью
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // Загружаем файл
      const { url, path } = await uploadImage(file)
      onUpload(url, path)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file')
    } finally {
      setUploading(false)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    multiple: false
  })

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
      } ${className}`}
    >
      <input {...getInputProps()} />
      
      {preview ? (
        <div className="relative aspect-video w-full">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="py-8">
          {uploading ? (
            <p>Загрузка...</p>
          ) : (
            <div>
              <p>Перетащите изображение сюда или кликните для выбора</p>
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, GIF до 10MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 