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
import { Carousel } from "@/components/ui/carousel"

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
        const { data: projectsData, error: projectsError } = await supabase.from("projects").select("*").order("name")

        if (projectsError) throw projectsError

        const { data: serversData, error: serversError } = await supabase
          .from("servers")
          .select("*")
          .order("online", { ascending: false })

        if (serversError) throw serversError

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
                // ...другие проекты...
              ]

        setProjects(projectsList)

        const total = serversData?.reduce((sum, server) => sum + server.online, 0) || 0
        setTotalOnline(total)
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [supabase])

  useEffect(() => {
    setServers([])
    setLoading(false)
  }, [])

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

  const ActiveServers = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Активные сервера</h2>
      <Carousel itemsToShow={4} itemsToScroll={1} autoplay autoplaySpeed={5000} className="flex gap-4">
        {[
          { id: 1, name: "Majestic RP - New York", online: 3200, logo: "/placeholder.svg" },
          { id: 2, name: "Majestic RP - Los Angeles", online: 3100, logo: "/placeholder.svg" },
          { id: 3, name: "GTA5RP - Downtown", online: 3000, logo: "/placeholder.svg" },
          { id: 4, name: "GTA5RP - Uptown", online: 2900, logo: "/placeholder.svg" },
          { id: 5, name: "Grand RP - Miami", online: 2800, logo: "/placeholder.svg" },
          { id: 6, name: "Grand RP - Chicago", online: 2700, logo: "/placeholder.svg" },
        ].map((server) => (
          <div key={server.id} className="bg-card rounded-lg p-4 shadow-md flex flex-col items-center text-center w-48">
            <img
              src={server.logo}
              alt={`${server.name} лого`}
              className="w-16 h-16 rounded-md mb-3"
            />
            <h3 className="text-lg font-bold">{server.name}</h3>
            <p className="text-sm text-muted-foreground">{server.online} игроков онлайн</p>
          </div>
        ))}
      </Carousel>
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
          {[
            { id: 1, name: "Majestic RP - New York", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "28 декабря 2018" },
            { id: 2, name: "Majestic RP - Detroit", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "9 декабря 2023" },
            { id: 3, name: "Majestic RP - Chicago", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "11 июня 2024" },
            { id: 4, name: "Majestic RP - San Francisco", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "16 августа 2024" },
            { id: 5, name: "Majestic RP - Atlanta", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "13 декабря 2024" },
            { id: 1, name: "Majestic RP - San Diego", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "28 декабря 2018" },
            { id: 2, name: "Majestic RP - Los Angeles", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "9 декабря 2023" },
            { id: 3, name: "Majestic RP - Miami", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "11 июня 2024" },
            { id: 4, name: "Majestic RP - Las Vegas", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "16 августа 2024" },
            { id: 5, name: "Majestic RP - Washington", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "13 декабря 2024" },
            { id: 1, name: "Majestic RP - Dallas", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "28 декабря 2018" },
            { id: 2, name: "Majestic RP - Boston", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "9 декабря 2023" },
            { id: 3, name: "Majestic RP - Houston", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "11 июня 2024" },
            { id: 4, name: "Majestic RP - Seattle", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "16 августа 2024" },
            { id: 5, name: "Majestic RP - 13 сервер Houston", project: "Majestic RP", online: "неизвестно", maxPlayers: "неизвестно", ip: "неизвестно", status: "online", openDate: "13 декабря 2024" },
            { id: 3, name: "GTA5RP - Downtown", project: "GTA5RP", online: 3000, maxPlayers: 3500, ip: "192.168.2.1", status: "online" },
            { id: 4, name: "GTA5RP - Uptown", project: "GTA5RP", online: 2900, maxPlayers: 3500, ip: "192.168.2.2", status: "online" },
            { id: 5, name: "Grand RP - Miami", project: "Grand RP", online: 2800, maxPlayers: 3000, ip: "192.168.3.1", status: "online" },
            { id: 6, name: "Grand RP - Chicago", project: "Grand RP", online: 2700, maxPlayers: 3000, ip: "192.168.3.2", status: "online" },
          ].map((server) => (
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

      <ActiveServers />
      <ServerList servers={filteredServers} />
    </div>
  )
}

