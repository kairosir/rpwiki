'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Content {
  id: number
  title: string
  type: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
  image_url?: string
}

export default function ContentPage() {
  const [content, setContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadingId, setUploadingId] = useState<number | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Ошибка при загрузке контента:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить список контента",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const uploadImage = async (contentId: number) => {
    if (!selectedFile) return

    setUploadingId(contentId)
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const response = await fetch(`/api/admin/content/${contentId}/image`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Ошибка загрузки изображения')

      toast({
        title: "Успешно",
        description: "Изображение загружено",
      })

      // Обновляем список контента
      fetchContent()
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive"
      })
    } finally {
      setUploadingId(null)
      setSelectedFile(null)
    }
  }

  const updateContentStatus = async (contentId: number, newStatus: 'draft' | 'published') => {
    try {
      const response = await fetch(`/api/admin/content/${contentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Ошибка обновления статуса')

      toast({
        title: "Успешно",
        description: "Статус контента обновлен",
      })

      fetchContent()
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div className="p-4">Загрузка...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Управление контентом</h1>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="transport">Транспорт</TabsTrigger>
          <TabsTrigger value="property">Недвижимость</TabsTrigger>
          <TabsTrigger value="guides">Гайды</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Изображение</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <Button
                      variant={item.status === 'published' ? "default" : "secondary"}
                      size="sm"
                      onClick={() => updateContentStatus(
                        item.id,
                        item.status === 'published' ? 'draft' : 'published'
                      )}
                    >
                      {item.status === 'published' ? 'Опубликовано' : 'Черновик'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="max-w-[200px]"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => uploadImage(item.id)}
                          disabled={!selectedFile || uploadingId === item.id}
                        >
                          {uploadingId === item.id ? 'Загрузка...' : 'Загрузить'}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {/* TODO: Добавить редактирование */}}
                    >
                      Редактировать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Остальные вкладки будут иметь аналогичную структуру с фильтрацией по типу */}
        <TabsContent value="transport">
          {/* Контент отфильтрованный по типу "transport" */}
        </TabsContent>
        <TabsContent value="property">
          {/* Контент отфильтрованный по типу "property" */}
        </TabsContent>
        <TabsContent value="guides">
          {/* Контент отфильтрованный по типу "guides" */}
        </TabsContent>
      </Tabs>
    </div>
  )
} 