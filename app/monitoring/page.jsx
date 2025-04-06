"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search } from "@/components/search"
import { AdBanner } from "@/components/ad-banner"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Users, Server, Activity, ArrowRight, Clock } from "lucide-react"

export default function MonitoringPage() {
  const [projects, setProjects] = useState([])
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [totalOnline, setTotalOnline] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // В реальном приложении здесь был бы запрос к API или Supabase
        // Для демонстрации используем моковые данные
        const { data: projectsData, error: projectsError } = await supabase.from("projects").select("*").order("name")

        if (projectsError) throw projectsError

        const { data: serversData, error: serversError } = await supabase
          .from("servers")
          .select("*")
          .order("online", { ascending: false })

        if (serversError) throw serversError

        // Если данных нет в базе, используем демо-данные
        const projectsList =
          projectsData?.length > 0
            ? projectsData
            : [
                {
                  id: "majestic-rp",
                  name: "Majestic RP",
                  description: "Популярный ролевой проект в GTA 5",
                  logo: "/placeholder.svg?height=100&width=100",
                  categories: ["Транспорт", "Недвижимость", "Бизнесы", "Работы", "Фракции"],
                  servers: 4,
                  totalPlayers: 2500,
                  online: 1200,
                },
                {
                  id: "diamond-rp",
                  name: "Diamond RP",
                  description: "Классический ролевой проект в GTA San Andreas",
                  logo: "/placeholder.svg?height=100&width=100",
                  categories: ["Транспорт", "Недвижимость", "Бизнесы", "Работы", "Фракции"],
                  servers: 6,
                  totalPlayers: 5000,
                  online: 2300,
                },
                {
                  id: "advance-rp",
                  name: "Advance RP",
                  description: "Продвинутый ролевой проект в GTA San Andreas",
                  logo: "/placeholder.svg?height=100&width=100",
                  categories: ["Транспорт", "Недвижимость", "Бизнесы", "Работы", "Фракции"],
                  servers: 3,
                  totalPlayers: 1800,
                  online: 950,
                },
                {
                  id: "eclipse-rp",
                  name: "Eclipse RP",
                  description: "Современный ролевой проект в GTA 5",
                  logo: "/placeholder.svg?height=100&width=100",
                  categories: ["Транспорт", "Недвижимость", "Бизнесы", "Работы", "Фракции"],
                  servers: 2,
                  totalPlayers: 1200,
                  online: 750,
                },
              ]

        setProjects(projectsList)

        // Подсчет общего онлайна
        const total = serversData?.reduce((sum, server) => sum + server.online, 0) || 0
        setTotalOnline(total)
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Обновление данных каждые 5 минут
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [supabase])

  useEffect(() => {
    // Удаляю демо-данные серверов и заменяю их пустым массивом
    setServers([])
    setLoading(false)
  }, [])

  // Фильтрация серверов
  const filteredServers = servers.filter((server) => {
    if (activeTab !== "all" && server.projectId !== activeTab) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        server.name.toLowerCase().includes(query) ||
        server.project.toLowerCase().includes(query) ||
        server.ip.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Форматирование времени последнего обновления
  const formatLastUpdated = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffMinutes < 1) return "только что"
    if (diffMinutes < 60) return `${diffMinutes} мин. назад`

    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours} ч. назад`

    return date.toLocaleDateString()
  }

  const PopularProjects = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Популярные проекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <img
                  src={project.logo || "/placeholder.svg"}
                  alt={`${project.name} лого`}
                  className="w-12 h-12 rounded-md"
                />
                <div>
                  <CardTitle>{project.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{project.servers} серверов</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground">Всего игроков:</p>
                  <p className="font-medium">{project.totalPlayers}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Онлайн:</p>
                  <p className="font-medium text-primary">{project.online}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/projects/${project.id}`}>
                  Подробнее
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )

  const ServerList = ({ servers }) => (
    <div className="my-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все проекты</TabsTrigger>
            {projects.map((project) => (
              <TabsTrigger key={project.id} value={project.id}>
                {project.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="w-full md:w-64 relative">
          <Search
            placeholder="Поиск серверов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server) => (
            <Card key={server.id} className="overflow-hidden">
              <div className="flex flex-col">
                <div className="p-4 flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">{server.name}</h3>
                      <Badge
                        variant={server.status === "online" ? "success" : "destructive"}
                        className={
                          server.status === "online" ? "bg-green-500/20 text-green-700 hover:bg-green-500/30" : ""
                        }
                      >
                        {server.status === "online" ? "Онлайн" : "Оффлайн"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">Проект: {server.project}</p>
                    <p className="text-sm text-muted-foreground">IP: {server.ip}</p>
                    <p className="text-sm text-muted-foreground">Игроки: {server.online} / {server.maxPlayers}</p>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-muted/30">
                  <Button className="w-full" asChild>
                    <Link href={`/servers/${server.id}`}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {servers.length === 0 && (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Серверы не найдены</h3>
              <p className="text-muted-foreground mb-4">
                По вашему запросу не найдено серверов. Попробуйте изменить параметры поиска.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Мониторинг серверов</h1>
          <p className="text-muted-foreground">Актуальная информация о серверах популярных RP проектов</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card p-2 rounded-md">
            <Server className="h-5 w-5 text-primary" />
            <span className="font-medium">{servers.length} серверов</span>
          </div>
          <div className="flex items-center gap-2 bg-card p-2 rounded-md">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium">{totalOnline} игроков онлайн</span>
          </div>
        </div>
      </div>

      <AdBanner
        id="monitoring-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-monitoring"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      <PopularProjects />
      <ServerList servers={filteredServers} />
    </div>
  )
}

