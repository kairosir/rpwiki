"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarIcon, ArrowRight, Search, Filter, Grid3X3, List } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LikeDislikeButtons } from "@/components/like-dislike-buttons"
import { DetailButton } from "@/components/detail-button"

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid или list

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      const newsData = []

      const projectsData = [
        {
          id: "majestic-rp",
          name: "Majestic RP",
          logo: "/placeholder.svg?height=80&width=80",
          newsCount: 12,
        },
        {
          id: "diamond-rp",
          name: "Diamond RP",
          logo: "/placeholder.svg?height=80&width=80",
          newsCount: 8,
        },
        {
          id: "advance-rp",
          name: "Advance RP",
          logo: "/placeholder.svg?height=80&width=80",
          newsCount: 5,
        },
        {
          id: "eclipse-rp",
          name: "Eclipse RP",
          logo: "/placeholder.svg?height=80&width=80",
          newsCount: 7,
        },
      ]

      setNews(newsData)
      setProjects(projectsData)
      setLoading(false)
    }, 500)
  }, [])

  // Фильтрация новостей
  const filteredNews = news.filter((item) => {
    const matchesProject = activeTab === "all" || item.project.toLowerCase().includes(activeTab.toLowerCase())
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.project.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesProject && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Новости</h1>
          <p className="text-muted-foreground">Актуальные новости и обновления популярных ролевых проектов</p>
        </div>
        <div className="w-full md:w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по новостям..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <AdBanner
        id="news-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-news"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все проекты</TabsTrigger>
            <TabsTrigger value="majestic">Majestic RP</TabsTrigger>
            <TabsTrigger value="diamond">Diamond RP</TabsTrigger>
            <TabsTrigger value="advance">Advance RP</TabsTrigger>
            <TabsTrigger value="eclipse">Eclipse RP</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredNews.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.project}</Badge>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{item.excerpt}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <LikeDislikeButtons id={`news-${item.id}`} type="news" />
                  <DetailButton href={`/news/${item.id}`} />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 bg-card rounded-lg overflow-hidden shadow-sm"
              >
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.project}</Badge>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <LikeDislikeButtons id={`news-${item.id}`} type="news" />
                      <DetailButton href={`/news/${item.id}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-xl font-medium mb-2">Новости не найдены</p>
          <p className="text-muted-foreground mb-4">Попробуйте изменить параметры поиска или фильтры</p>
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

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <img src={project.logo || "/placeholder.svg"} alt={project.name} className="w-10 h-10 rounded-md" />
              <div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{project.newsCount} новостей</p>
              </div>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/projects/${project.id}`}>
                  Перейти к проекту
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

