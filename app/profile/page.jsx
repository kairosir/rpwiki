"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "@/components/ui/use-toast"
import {
  Edit,
  Save,
  User,
  Calendar,
  GamepadIcon as GameController,
  Clock,
  Server,
  Trash,
  Image,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import Messages from "./messages"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [showAvatarEditor, setShowAvatarEditor] = useState(false)
  const [userId, setUserId] = useState(null)
  const fileInputRef = useRef(null)
  const supabaseClient = createClientComponentClient()

  // Демо-данные пользователя
  const [userData, setUserData] = useState({
    id: "1", // Присваиваем числовой ID
    username: "MaxPlayer",
    avatar: "/placeholder.svg?height=200&width=200",
    age: 25,
    project: "Majestic RP",
    playingOn: "Сервер 1",
    discord: "MaxPlayer#1234",
    bio: "Опытный игрок Majestic RP. Люблю гонки и бизнесы. Всегда готов помочь новичкам.",
    registeredAt: "2022-05-15",
    lastLogin: "2023-03-28",
  })

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API для получения данных пользователя
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
        } = await supabaseClient.auth.getSession()

        if (session) {
          const { data, error } = await supabaseClient.from("users").select("*").eq("id", session.user.id).single()

          if (data) {
            setUserData({
              id: data.id.substring(0, 8), // Сокращаем ID для отображения
              username: data.username,
              avatar: data.avatar_url || "/placeholder.svg?height=200&width=200",
              age: data.age || 25,
              project: data.project || "Не указано",
              playingOn: data.playing_on || "Не указано",
              discord: data.discord || "Не указано",
              bio: data.bio || "Информация о пользователе отсутствует.",
              registeredAt: data.created_at,
              lastLogin: data.last_login || data.created_at,
            })
            setAvatarUrl(data.avatar_url)
            setUserId(session.user.id)
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [supabaseClient])

  useEffect(() => {
    // Пример изменения ID пользователя
    setUserData((prev) => ({
      ...prev,
      id: parseInt(prev.id, 10) - 1, // ID начинается с 0
    }))
  }, [])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession()

      if (session) {
        const { error } = await supabaseClient
          .from("users")
          .update({
            username: userData.username,
            age: userData.age,
            project: userData.project,
            playing_on: userData.playingOn,
            discord: userData.discord,
            bio: userData.bio,
          })
          .eq("id", session.user.id)

        if (error) {
          throw error
        }

        toast({
          title: "Профиль обновлен",
          description: "Ваши данные успешно сохранены",
        })
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные профиля",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsEditing(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setShowAvatarEditor(true)
      // Создаем временный URL для предпросмотра
      const objectUrl = URL.createObjectURL(file)
      setAvatarUrl(objectUrl)
    }
  }

  const handleAvatarUpload = async () => {
    if (!avatarFile) return

    setIsUploading(true)
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession()

      if (!session) {
        throw new Error("Не авторизован")
      }

      // Загружаем файл в хранилище
      const fileExt = avatarFile.name.split(".").pop()
      const fileName = `${session.user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabaseClient.storage.from("avatars").upload(filePath, avatarFile)

      if (uploadError) {
        throw uploadError
      }

      // Получаем публичный URL
      const { data: urlData } = supabaseClient.storage.from("avatars").getPublicUrl(filePath)

      // Обновляем профиль пользователя
      const { error: updateError } = await supabaseClient
        .from("users")
        .update({
          avatar_url: urlData.publicUrl,
        })
        .eq("id", session.user.id)

      if (updateError) {
        throw updateError
      }

      // Обновляем локальное состояние
      setUserData((prev) => ({
        ...prev,
        avatar: urlData.publicUrl,
      }))

      toast({
        title: "Аватар обновлен",
        description: "Ваш аватар успешно загружен",
      })

      setShowAvatarEditor(false)
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

  const handleAvatarCancel = () => {
    setShowAvatarEditor(false)
    setAvatarFile(null)
    // Восстанавливаем предыдущий URL аватара
    setAvatarUrl(userData.avatar)
  }

  const handleAvatarDelete = async () => {
    setIsUploading(true)
    try {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession()

      if (!session) {
        throw new Error("Не авторизован")
      }

      // Обновляем профиль пользователя, устанавливая null для аватара
      const { error: updateError } = await supabaseClient
        .from("users")
        .update({
          avatar_url: null,
        })
        .eq("id", session.user.id)

      if (updateError) {
        throw updateError
      }

      // Обновляем локальное состояние
      setUserData((prev) => ({
        ...prev,
        avatar: "/placeholder.svg?height=200&width=200",
      }))
      setAvatarUrl(null)

      toast({
        title: "Аватар удален",
        description: "Ваш аватар успешно удален",
      })

      setShowAvatarEditor(false)
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Личный кабинет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Боковая панель */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Профиль</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={userData.avatar} alt={userData.username} />
                  <AvatarFallback>{userData.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-xl font-bold">{userData.username}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Зарегистрирован: {new Date(userData.registeredAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <Button className="w-full" onClick={handleEditToggle}>
                  {isEditing ? "Отменить редактирование" : "Редактировать профиль"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Навигация</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <Link
                  href="/profile/settings"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Edit className="h-4 w-4 text-primary" />
                  <span>Настройки</span>
                </Link>
                <Link
                  href="/profile/liked"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Понравившиеся</span>
                </Link>
                <Link
                  href="/profile/activity"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Активность</span>
                </Link>
                <Link
                  href="/messages"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Сообщения</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Основной контент */}
        <div className="lg:col-span-3">
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Информация о пользователе</h2>
            <p><strong>Имя пользователя:</strong> {userData.username}</p>
            <p><strong>Возраст:</strong> {userData.age}</p>
            <p><strong>Проект:</strong> {userData.project}</p>
            <p><strong>Discord:</strong> {userData.discord}</p>
            <p><strong>Биография:</strong> {userData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

