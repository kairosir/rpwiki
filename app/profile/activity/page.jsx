"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Clock, Car, Home, DollarSign, BookOpen, FileText, Eye, ThumbsUp } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function ActivityPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setLoading(false)
          return
        }

        // В реальном приложении здесь был бы запрос к API
        // Для демонстрации создадим фиктивные данные
        const demoActivities = [
          {
            id: 1,
            type: "view",
            contentType: "vehicle",
            title: "Adder",
            description: "Просмотр информации о транспорте",
            image: "/placeholder.svg?height=100&width=200",
            url: "/projects/majestic-rp/vehicles/1",
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 минут назад
          },
          {
            id: 2,
            type: "like",
            contentType: "guide",
            title: "Что такое RP и как начать?",
            description: "Вы поставили лайк гайду",
            image: "/placeholder.svg?height=100&width=200",
            url: "/guides/what-is-rp",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 часа назад
          },
          {
            id: 3,
            type: "view",
            contentType: "realty",
            title: "Квартира в Винвуде",
            description: "Просмотр информации о недвижимости",
            image: "/placeholder.svg?height=100&width=200",
            url: "/projects/majestic-rp/realty/1",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 часов назад
          },
          {
            id: 4,
            type: "view",
            contentType: "news",
            title: "Крупное обновление Majestic RP",
            description: "Просмотр новости",
            image: "/placeholder.svg?height=100&width=200",
            url: "/news/1",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 день назад
          },
          {
            id: 5,
            type: "like",
            contentType: "business",
            title: "Автомойка",
            description: "Вы поставили лайк бизнесу",
            image: "/placeholder.svg?height=100&width=200",
            url: "/projects/majestic-rp/biz/1",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 дня назад
          },
          {
            id: 6,
            type: "view",
            contentType: "guide",
            title: "Способы заработка для новичков",
            description: "Просмотр гайда",
            image: "/placeholder.svg?height=100&width=200",
            url: "/guides/beginner-jobs",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 дня назад
          },
        ]

        setActivities(demoActivities)
      } catch (error) {
        console.error("Ошибка при загрузке активности:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [supabase])

  // Получение иконки в зависимости от типа контента
  const getContentIcon = (contentType) => {
    switch (contentType) {
      case "vehicle":
        return <Car className="h-5 w-5" />
      case "realty":
        return <Home className="h-5 w-5" />
      case "business":
        return <DollarSign className="h-5 w-5" />
      case "guide":
        return <BookOpen className="h-5 w-5" />
      case "news":
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Фильтрация активности
  const filteredActivities = activities.filter((activity) => {
    const matchesTab = activeTab === "all" || activity.type === activeTab
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) {
      return "только что"
    } else if (diffMin < 60) {
      return `${diffMin} ${getDeclension(diffMin, ["минуту", "минуты", "минут"])} назад`
    } else if (diffHour < 24) {
      return `${diffHour} ${getDeclension(diffHour, ["час", "часа", "часов"])} назад`
    } else if (diffDay < 7) {
      return `${diffDay} ${getDeclension(diffDay, ["день", "дня", "дней"])} назад`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Функция для правильного склонения слов
  const getDeclension = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Назад в личный кабинет</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Активность</h1>
          <p className="text-muted-foreground">История ваших действий на сайте</p>
        </div>
        <div className="w-full md:w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по активности..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все действия</TabsTrigger>
            <TabsTrigger value="view">Просмотры</TabsTrigger>
            <TabsTrigger value="like">Лайки</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredActivities.length > 0 ? (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <Link key={activity.id} href={activity.url}>
              <Card className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded-full bg-primary/10">
                          {activity.type === "view" ? (
                            <Eye className="h-4 w-4 text-primary" />
                          ) : (
                            <ThumbsUp className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{activity.description}</span>
                      </div>
                      <h3 className="font-bold">{activity.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="p-1 rounded-full bg-primary/10">{getContentIcon(activity.contentType)}</div>
                        <span className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Нет активности</h3>
          <p className="text-muted-foreground mb-4">У вас пока нет записей об активности на сайте</p>
          <Button asChild>
            <Link href="/">Перейти на главную</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

