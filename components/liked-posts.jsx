"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, Search, Trash2, ExternalLink, FileText, Car, Home, DollarSign, BookOpen } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Иконки для разных типов контента
const contentTypeIcons = {
  guide: <BookOpen className="h-5 w-5" />,
  vehicle: <Car className="h-5 w-5" />,
  realty: <Home className="h-5 w-5" />,
  business: <DollarSign className="h-5 w-5" />,
  post: <FileText className="h-5 w-5" />,
  // Добавьте другие типы по мере необходимости
}

// Удаляю демо-данные и заменяю их пустым массивом
const demoLikedPosts = [];

export function LikedPosts() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [likedPosts, setLikedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState(null)
  const [isTableMissing, setIsTableMissing] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setLikedPosts([])
          setLoading(false)
          return
        }

        try {
          // Пробуем получить лайки пользователя
          const { data: votesData, error: votesError } = await supabase
            .from("votes")
            .select("*")
            .eq("user_id", session.user.id)
            .eq("vote_type", "like")
            .order("created_at", { ascending: false })

          // Если ошибка связана с отсутствием таблицы
          if (votesError && votesError.message.includes("does not exist")) {
            console.log("Таблица votes не существует, используем демо-данные")
            setIsTableMissing(true)
            setLikedPosts(demoLikedPosts)
            return
          }

          if (votesError) throw votesError

          // Для каждого лайка получаем информацию о контенте
          // В реальном приложении здесь был бы запрос к API или базе данных
          // Для демонстрации создадим фиктивные данные

          const postsWithDetails = votesData.map((vote) => {
            // Разбираем content_id для получения типа и ID
            const [contentType, contentId] = vote.content_id.split("-")

            // Генерируем фиктивные данные на основе типа контента
            let title, description, image, url

            switch (contentType) {
              case "guide":
                title = `Гайд #${contentId}`
                description = "Подробное руководство по игре"
                image = "/placeholder.svg?height=100&width=200"
                url = `/guides/${contentId}`
                break
              case "vehicle":
                title = `Транспорт #${contentId}`
                description = "Информация о транспортном средстве"
                image = "/placeholder.svg?height=100&width=200"
                url = `/projects/majestic-rp/vehicles/${contentId}`
                break
              case "realty":
                title = `Недвижимость #${contentId}`
                description = "Информация о недвижимости"
                image = "/placeholder.svg?height=100&width=200"
                url = `/projects/majestic-rp/realty/${contentId}`
                break
              case "business":
                title = `Бизнес #${contentId}`
                description = "Информация о бизнесе"
                image = "/placeholder.svg?height=100&width=200"
                url = `/projects/majestic-rp/biz/${contentId}`
                break
              default:
                title = `Пост #${contentId}`
                description = "Информация о посте"
                image = "/placeholder.svg?height=100&width=200"
                url = `/post/${contentId}`
            }

            return {
              id: vote.id,
              contentId: vote.content_id,
              contentType,
              title,
              description,
              image,
              url,
              createdAt: vote.created_at,
            }
          })

          setLikedPosts(postsWithDetails)
        } catch (error) {
          console.error("Ошибка при загрузке лайкнутых постов:", error)
          // Если произошла ошибка, используем демо-данные
          setIsTableMissing(true)
          setLikedPosts(demoLikedPosts)
        }
      } catch (error) {
        console.error("Ошибка при проверке сессии:", error)
        setLikedPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchLikedPosts()
  }, [supabase])

  const handleRemoveLike = async (id, contentId) => {
    try {
      setRemovingId(id)

      // Если таблица отсутствует, просто удаляем из локального состояния
      if (isTableMissing) {
        setLikedPosts((prev) => prev.filter((post) => post.id !== id))
        toast({
          title: "Успешно",
          description: "Лайк успешно удален (демо-режим)",
        })
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast({
          title: "Ошибка",
          description: "Вы не авторизованы",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("votes").delete().eq("id", id)

      if (error) throw error

      // Обновляем список лайкнутых постов
      setLikedPosts((prev) => prev.filter((post) => post.id !== id))

      toast({
        title: "Успешно",
        description: "Лайк успешно удален",
      })
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить лайк",
        variant: "destructive",
      })
    } finally {
      setRemovingId(null)
    }
  }

  // Фильтрация постов по типу и поисковому запросу
  const filteredPosts = likedPosts.filter((post) => {
    const matchesTab = activeTab === "all" || post.contentType === activeTab
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-bold">Понравившиеся посты</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isTableMissing && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 p-4 rounded-md mb-4">
          <p className="text-sm font-medium">Демо-режим: Таблица голосов не найдена в базе данных</p>
          <p className="text-xs mt-1">
            Отображаются демонстрационные данные. Для полной функциональности необходимо создать таблицу votes.
          </p>
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row gap-2">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="guide">Гайды</TabsTrigger>
          <TabsTrigger value="vehicle">Транспорт</TabsTrigger>
          <TabsTrigger value="realty">Недвижимость</TabsTrigger>
          <TabsTrigger value="business">Бизнесы</TabsTrigger>
          <TabsTrigger value="post">Посты</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {contentTypeIcons[post.contentType] || <FileText className="h-5 w-5" />}
                  <span>{post.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-32 mb-3">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                  />
                </div>
                <p className="text-sm text-muted-foreground">{post.description}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Добавлено: {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveLike(post.id, post.contentId)}
                  disabled={removingId === post.id}
                >
                  {removingId === post.id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Удалить
                </Button>
                <Button asChild size="sm">
                  <Link href={post.url}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Перейти
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <ThumbsUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Нет понравившихся постов</h3>
          <p className="text-muted-foreground mb-4">
            Вы еще не поставили лайк ни одному посту. Найдите интересный контент и отметьте его!
          </p>
          <Button asChild>
            <Link href="/">Перейти на главную</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

