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

        const serversList =
          serversData?.length > 0
            ? serversData
            : [
                {
                  id: 1,
                  name: "Majestic RP - New York",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "play.majestic-rp.com:22005",
                  online: 450,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 2,
                  name: "Majestic RP - Detroit",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "play.majestic-rp.com:22006",
                  online: 380,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 3,
                  name: "Majestic RP - Chicago",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "emerald.diamond-rp.com:7777",
                  online: 850,
                  maxPlayers: 1000,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 4,
                  name: "Majestic RP - San Francisco",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "sapphire.diamond-rp.com:7777",
                  online: 780,
                  maxPlayers: 1000,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 5,
                  name: "Majestic RP - Atlanta",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "phoenix.advance-rp.com:7777",
                  online: 450,
                  maxPlayers: 600,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 6,
                  name: "Majestic RP - San Diego",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "moon.eclipse-rp.com:22005",
                  online: 420,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 1,
                  name: "Majestic RP - Los Angeles",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "play.majestic-rp.com:22005",
                  online: 450,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 2,
                  name: "Majestic RP - Miami",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "play.majestic-rp.com:22006",
                  online: 380,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 3,
                  name: "Majestic RP - Las Vegas",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "emerald.diamond-rp.com:7777",
                  online: 850,
                  maxPlayers: 1000,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 4,
                  name: "Majestic RP - Washington",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "sapphire.diamond-rp.com:7777",
                  online: 780,
                  maxPlayers: 1000,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 5,
                  name: "Majestic RP - Dallas",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "phoenix.advance-rp.com:7777",
                  online: 450,
                  maxPlayers: 600,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 6,
                  name: "Majestic RP - Boston",
                  project: "Majestic RP",
                  projectId: "majestic RP",
                  // ip: "moon.eclipse-rp.com:22005",
                  online: 420,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 6,
                  name: "Majestic RP - Houston",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "moon.eclipse-rp.com:22005",
                  online: 420,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 6,
                  name: "Majestic RP - Seattle",
                  project: "Majestic RP",
                  projectId: "majestic-rp",
                  // ip: "moon.eclipse-rp.com:22005",
                  online: 420,
                  maxPlayers: 500,
                  status: "online",
                  lastUpdated: "2023-03-28T15:30:00Z",
                },
                {
                  id: 1,
                  name: "Arizona RP - Phoenix",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.3:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 2,
                  name: "Arizona RP - Tucson",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.4:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 3,
                  name: "Arizona RP - Scottdale",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.43:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 4,
                  name: "Arizona RP - Chandler",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.44:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 5,
                  name: "Arizona RP - Brainburg",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.45:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 6,
                  name: "Arizona RP - Saint Rose",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.5:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 7,
                  name: "Arizona RP - Mesa",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.59:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 8,
                  name: "Arizona RP - Red Rock",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.61:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 9,
                  name: "Arizona RP - Yuma",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.107:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 10,
                  name: "Arizona RP - Surprise",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.109:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 11,
                  name: "Arizona RP - Prescott",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.166:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 12,
                  name: "Arizona RP - Glendale",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.171:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 13,
                  name: "Arizona RP - Kingman",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.172:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 14,
                  name: "Arizona RP - Winslow",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.173:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 15,
                  name: "Arizona RP - Payson",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "185.169.134.174:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 16,
                  name: "Arizona RP - Gilbert",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.191:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 17,
                  name: "Arizona RP - Show-Low",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.190:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 18,
                  name: "Arizona RP - Casa-Grande",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.188:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 19,
                  name: "Arizona RP - Page",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.168:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 20,
                  name: "Arizona RP - Sun-City",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.159:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 21,
                  name: "Arizona RP - Queen Creek",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.200:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 22,
                  name: "Arizona RP - Sedona",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.144:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 23,
                  name: "Arizona RP - Holiday",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.132:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 24,
                  name: "Arizona RP - Wednesday",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.128:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                },
                {
                  id: 25,
                  name: "Arizona RP - Yava",
                  project: "Arizona RP",
                  projectId: "arizona-rp",
                  ip: "80.66.82.113:7777",
                  online: null,
                  maxPlayers: null,
                  status: "unknown",
                  lastUpdated: "2025-04-05T20:55:26Z"
                }

                
              ]

        setProjects(projectsList)
        setServers(serversList)

        // Подсчет общего онлайна
        const total = serversList.reduce((sum, server) => sum + server.online, 0)
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
          <div className="space-y-4">
            {filteredServers.map((server) => (
              <Card key={server.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="p-4 md:p-6 flex-grow">
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Обновлено: {formatLastUpdated(server.lastUpdated)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Проект:</p>
                        <Link href={`/projects/${server.projectId}`} className="text-primary hover:underline">
                          {server.project}
                        </Link>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">IP адрес:</p>
                        <code className="bg-muted px-2 py-1 rounded text-sm">{server.ip}</code>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Игроки:</p>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {server.online} / {server.maxPlayers}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${(server.online / server.maxPlayers) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">
                      Заполненность: {Math.round((server.online / server.maxPlayers) * 100)}%
                    </p>
                  </div>

                  <div className="p-4 md:p-6 md:border-l flex flex-col justify-center items-center gap-4 bg-muted/30">
                    <Button className="w-full" asChild>
                      <Link href={`/servers/${server.id}`}>
                        Подробнее
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      Подключиться
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {filteredServers.length === 0 && (
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
    </div>
  )
}

