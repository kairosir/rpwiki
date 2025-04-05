"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Trash, Save, Upload, Image } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function AvatarUpload({ userId, avatarUrl, onAvatarChange }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)
  const fileInputRef = useRef(null)
  const supabase = createClientComponentClient()

  const handleAvatarClick = () => {
    if (!isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setIsEditing(true)
      // Создаем временный URL для предпросмотра
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleSave = async () => {
    if (!avatarFile) return

    setIsUploading(true)
    try {
      // Загружаем файл в хранилище
      const fileExt = avatarFile.name.split(".").pop()
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, avatarFile)

      if (uploadError) {
        throw uploadError
      }

      // Получаем публичный URL
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Обновляем профиль пользователя
      const { error: updateError } = await supabase
        .from("users")
        .update({
          avatar_url: urlData.publicUrl,
        })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }

      // Вызываем колбэк для обновления родительского компонента
      if (onAvatarChange) {
        onAvatarChange(urlData.publicUrl)
      }

      toast({
        title: "Аватар обновлен",
        description: "Ваш аватар успешно загружен",
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить аватар",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setAvatarFile(null)
    setPreviewUrl(avatarUrl)
  }

  const handleDelete = async () => {
    setIsUploading(true)
    try {
      // Обновляем профиль пользователя, устанавливая null для аватара
      const { error: updateError } = await supabase
        .from("users")
        .update({
          avatar_url: null,
        })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }

      // Вызываем колбэк для обновления родительского компонента
      if (onAvatarChange) {
        onAvatarChange(null)
      }

      toast({
        title: "Аватар удален",
        description: "Ваш аватар успешно удален",
      })

      setIsEditing(false)
      setPreviewUrl(null)
    } catch (error) {
      console.error("Ошибка при удалении аватара:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить аватар",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div>
          <div className="relative w-32 h-32 mx-auto mb-4 border-2 border-dashed border-primary rounded-full overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl || "/placeholder.svg"} alt="Аватар" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUploading}>
              Отмена
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isUploading}>
              <Trash className="h-4 w-4 mr-1" />
              Удалить
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isUploading}>
              {isUploading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
              ) : (
                <Save className="h-4 w-4 mr-1" />
              )}
              Сохранить
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Avatar className="w-32 h-32 cursor-pointer" onClick={handleAvatarClick}>
            <AvatarImage src={previewUrl} />
            <AvatarFallback>
              <Upload className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <button
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2"
            onClick={handleAvatarClick}
          >
            <Edit className="h-4 w-4" />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
      )}
    </div>
  )
}

