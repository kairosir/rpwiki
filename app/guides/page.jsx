"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  BookOpen,
  Gamepad2,
  DollarSign,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LikeDislikeButtons } from "@/components/like-dislike-buttons"
import { DetailButton } from "@/components/detail-button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [expandedGuide, setExpandedGuide] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    difficulty: {
      beginner: true,
      intermediate: true,
      advanced: true,
    },
    projects: {
      "majestic-rp": true,
      "diamond-rp": true,
      "advance-rp": true,
      "eclipse-rp": true,
    },
    date: "all",
  })

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      setProjects([
        {
          id: "majestic-rp",
          name: "Majestic RP",
          logo: "/placeholder.svg?height=80&width=80",
          description: "Популярный ролевой проект в GTA 5",
          helpers: 12,
          products: 45,
        },
        {
          id: "diamond-rp",
          name: "Diamond RP",
          logo: "/placeholder.svg?height=80&width=80",
          description: "Классический ролевой проект в GTA San Andreas",
          helpers: 8,
          products: 32,
        },
        {
          id: "advance-rp",
          name: "Advance RP",
          logo: "/placeholder.svg?height=80&width=80",
          description: "Продвинутый ролевой проект в GTA San Andreas",
          helpers: 6,
          products: 28,
        },
        {
          id: "eclipse-rp",
          name: "Eclipse RP",
          logo: "/placeholder.svg?height=80&width=80",
          description: "Современный ролевой проект в GTA 5",
          helpers: 10,
          products: 38,
        },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const guides = [
    {
      id: 1,
      title: "Что такое RP и как начать?",
      icon: <HelpCircle className="h-4 w-4" />,
      href: "/guides/what-is-rp",
      category: "basic",
      difficulty: "beginner",
      project: "majestic-rp",
      date: "2023-03-15",
      shortDescription:
        "Ролевая игра (RP) - это особый жанр игры, где вы отыгрываете роль персонажа в виртуальном мире. Узнайте основы и как начать свой путь в RP.",
      fullDescription:
        "Ролевая игра (RP) - это особый жанр игры, где вы отыгрываете роль персонажа в виртуальном мире, следуя определенным правилам и взаимодействуя с другими игроками. В этом гайде вы узнаете, как создать персонажа, понять основные правила RP и начать свое приключение в мире ролевых серверов.",
    },
    {
      id: 2,
      title: "Основные термины и сленг",
      icon: <BookOpen className="h-4 w-4" />,
      href: "/guides/rp-terms",
      category: "basic",
      difficulty: "beginner",
      project: "diamond-rp",
      date: "2023-03-20",
      shortDescription:
        "Изучите основные термины и сленг, используемые в RP сообществе, чтобы лучше понимать других игроков и правила серверов.",
      fullDescription:
        "В мире RP существует множество специфических терминов и сленговых выражений, которые могут сбить с толку новичка. Этот гайд поможет вам разобраться в основных понятиях, таких как IC/OOC, PowerGaming, MetaGaming, RDM, VDM и многих других, чтобы вы могли комфортно общаться с другими игроками и следовать правилам серверов.",
    },
    {
      id: 4,
      title: "Способы заработка для новичков",
      icon: <DollarSign className="h-4 w-4" />,
      href: "/guides/beginner-jobs",
      category: "economy",
      difficulty: "beginner",
      project: "advance-rp",
      date: "2023-04-05",
      shortDescription:
        "Обзор доступных работ и способов заработка для новых игроков, которые помогут быстро встать на ноги в игровом мире.",
      fullDescription:
        "Начало игры на RP сервере может быть сложным, особенно когда дело касается заработка. В этом гайде мы рассмотрим наиболее выгодные работы для новичков, такие как таксист, курьер, дальнобойщик и другие. Вы узнаете, сколько можно заработать, какие навыки нужны и как быстро продвигаться по карьерной лестнице.",
    },
    {
      id: 5,
      title: "Как найти RP-сообщество",
      icon: <Users className="h-4 w-4" />,
      href: "/guides/find-community",
      category: "community",
      difficulty: "intermediate",
      project: "eclipse-rp",
      date: "2023-04-10",
      shortDescription:
        "Советы по поиску подходящего RP сообщества, которое соответствует вашим интересам и стилю игры.",
      fullDescription:
        "Найти подходящее RP сообщество - важный шаг для комфортной игры. В этом гайде мы расскажем, как выбрать сервер, который соответствует вашим предпочтениям, как вступить в игровые организации и фракции, а также как найти друзей и единомышленников для совместной игры.",
    },
    {
      id: 7,
      title: "Как открыть бизнес",
      icon: <DollarSign className="h-4 w-4" />,
      href: "/guides/business-guide",
      category: "economy",
      difficulty: "advanced",
      project: "majestic-rp",
      date: "2023-04-15",
      shortDescription:
        "Руководство по открытию и управлению собственным бизнесом на RP серверах, от выбора ниши до найма сотрудников.",
      fullDescription:
        "Собственный бизнес - мечта многих игроков на RP серверах. В этом подробном руководстве мы расскажем о всех этапах создания бизнеса: от выбора ниши и поиска стартового капитала до покупки помещения, найма сотрудников и развития компании. Также вы узнаете о налогах, конкуренции и взаимодействии с государственными структурами.",
    },
    {
      id: 8,
      title: "Покупка и обслуживание транспорта",
      icon: <Gamepad2 className="h-4 w-4" />,
      href: "/guides/vehicle-guide",
      category: "gameplay",
      difficulty: "intermediate",
      project: "diamond-rp",
      date: "2023-04-20",
      shortDescription: "Все, что нужно знать о покупке, обслуживании и тюнинге транспортных средств в игровом мире.",
      fullDescription:
        "Транспорт - важная часть игрового процесса на RP серверах. В этом гайде мы расскажем о различных типах транспортных средств, как получить водительские права, где и как купить автомобиль, как его обслуживать и тюнинговать. Также вы узнаете о правилах дорожного движения и штрафах за их нарушение.",
    },
    {
      id: 9,
      title: "Продвинутый криминал",
      icon: <HelpCircle className="h-4 w-4" />,
      href: "/guides/advanced-crime",
      category: "gameplay",
      difficulty: "advanced",
      project: "advance-rp",
      date: "2023-04-25",
      shortDescription: "Руководство по криминальной деятельности для опытных игроков.",
      fullDescription:
        "Этот гайд предназначен для опытных игроков, которые хотят погрузиться в криминальный мир RP. Вы узнаете о различных видах нелегальной деятельности, создании и управлении преступной организацией, взаимодействии с другими криминальными группировками и многое другое.",
    },
    {
      id: 10,
      title: "Государственная служба",
      icon: <Users className="h-4 w-4" />,
      href: "/guides/government-service",
      category: "community",
      difficulty: "intermediate",
      project: "eclipse-rp",
      date: "2023-05-01",
      shortDescription: "Все о работе в государственных структурах: полиция, медики, мэрия и другие.",
      fullDescription:
        "Работа в государственных структурах - отличный способ влиять на жизнь города и помогать другим игрокам. В этом гайде мы расскажем о различных государственных организациях, требованиях для вступления, карьерном росте и особенностях работы в каждой из них.",
    },
  ]

  const toggleGuide = (guideId) => {
    if (expandedGuide === guideId) {
      setExpandedGuide(null)
    } else {
      setExpandedGuide(guideId)
    }
  }

  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: checked,
      },
    }))
  }

  const handleDateFilterChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      date: value,
    }))
  }

  const resetFilters = () => {
    setFilters({
      difficulty: {
        beginner: true,
        intermediate: true,
        advanced: true,
      },
      projects: {
        "majestic-rp": true,
        "diamond-rp": true,
        "advance-rp": true,
        "eclipse-rp": true,
      },
      date: "all",
    })
    setSearchQuery("")
  }

  // Фильтрация гайдов
  const filteredGuides = guides.filter((guide) => {
    // Фильтр по категории
    if (activeTab !== "all" && guide.category !== activeTab) return false

    // Фильтр по сложности
    if (!filters.difficulty[guide.difficulty]) return false

    // Фильтр по проекту
    if (!filters.projects[guide.project]) return false

    // Фильтр по дате
    if (filters.date !== "all") {
      const guideDate = new Date(guide.date)
      const now = new Date()

      if (filters.date === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        if (guideDate < weekAgo) return false
      } else if (filters.date === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        if (guideDate < monthAgo) return false
      } else if (filters.date === "year") {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        if (guideDate < yearAgo) return false
      }
    }

    // Фильтр по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        guide.title.toLowerCase().includes(query) ||
        guide.shortDescription.toLowerCase().includes(query) ||
        guide.fullDescription.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Получение количества активных фильтров
  const getActiveFiltersCount = () => {
    let count = 0

    // Считаем неактивные фильтры сложности
    Object.values(filters.difficulty).forEach((value) => {
      if (!value) count++
    })

    // Считаем неактивные фильтры проектов
    Object.values(filters.projects).forEach((value) => {
      if (!value) count++
    })

    // Учитываем фильтр даты
    if (filters.date !== "all") count++

    return count
  }

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
            Новичок
          </Badge>
        )
      case "intermediate":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
            Средний
          </Badge>
        )
      case "advanced":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">
            Продвинутый
          </Badge>
        )
      default:
        return null
    }
  }

  const getProjectName = (projectId) => {
    const project = projects.find((p) => p.id === projectId)
    return project ? project.name : projectId
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Гайды и руководства</h1>
        <p className="text-muted-foreground text-center mb-6">
          Полезные руководства и советы для новичков и опытных игроков RP-проектов
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по гайдам..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Фильтры</span>
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                  <SheetDescription>Настройте параметры поиска гайдов</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Сложность</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="difficulty-beginner"
                          checked={filters.difficulty.beginner}
                          onCheckedChange={(checked) => handleFilterChange("difficulty", "beginner", checked)}
                        />
                        <Label htmlFor="difficulty-beginner">Для новичков</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="difficulty-intermediate"
                          checked={filters.difficulty.intermediate}
                          onCheckedChange={(checked) => handleFilterChange("difficulty", "intermediate", checked)}
                        />
                        <Label htmlFor="difficulty-intermediate">Средний уровень</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="difficulty-advanced"
                          checked={filters.difficulty.advanced}
                          onCheckedChange={(checked) => handleFilterChange("difficulty", "advanced", checked)}
                        />
                        <Label htmlFor="difficulty-advanced">Продвинутый уровень</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Проекты</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {projects.map((project) => (
                        <div key={project.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`project-${project.id}`}
                            checked={filters.projects[project.id]}
                            onCheckedChange={(checked) => handleFilterChange("projects", project.id, checked)}
                          />
                          <Label htmlFor={`project-${project.id}`}>{project.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Дата публикации</h3>
                    <RadioGroup value={filters.date} onValueChange={handleDateFilterChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="date-all" />
                        <Label htmlFor="date-all">Все время</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="week" id="date-week" />
                        <Label htmlFor="date-week">За последнюю неделю</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="month" id="date-month" />
                        <Label htmlFor="date-month">За последний месяц</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="year" id="date-year" />
                        <Label htmlFor="date-year">За последний год</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <SheetFooter>
                  <Button variant="outline" onClick={resetFilters}>
                    Сбросить фильтры
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Рекламный баннер */}
      <AdBanner
        id="guides-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-guides"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      {/* Табы для фильтрации */}
      <div className="my-6">
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row gap-2">
            <TabsTrigger value="all">Все гайды</TabsTrigger>
            <TabsTrigger value="basic">Основное</TabsTrigger>
            <TabsTrigger value="economy">Экономика</TabsTrigger>
            <TabsTrigger value="gameplay">Геймплей</TabsTrigger>
            <TabsTrigger value="community">Сообщество</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Список гайдов */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredGuides.length > 0 ? (
        <div className="space-y-4 mb-12">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleGuide(guide.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full">{guide.icon}</div>
                  <div>
                    <span className="font-medium">{guide.title}</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {getDifficultyBadge(guide.difficulty)}
                      <Badge variant="secondary">{getProjectName(guide.project)}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {expandedGuide === guide.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              {expandedGuide === guide.id && (
                <div className="p-4 pt-0 border-t">
                  <p className="text-muted-foreground mb-4">{guide.shortDescription}</p>
                  <div className="flex justify-between items-center">
                    <LikeDislikeButtons id={`guide-${guide.id}`} type="guide" />
                    <DetailButton href={guide.href} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Гайды не найдены</h3>
          <p className="text-muted-foreground mb-4">
            По вашему запросу не найдено гайдов. Попробуйте изменить параметры поиска или фильтры.
          </p>
          <Button onClick={resetFilters}>Сбросить фильтры</Button>
        </div>
      )}

      {/* Секция помощников */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Помощники</h2>
        <p className="text-muted-foreground mb-8">
          Выберите проект, чтобы найти опытных игроков, которые помогут вам освоиться на сервере
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/guides/helpers/${project.id}`}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={project.logo || "/placeholder.svg"}
                      alt={`${project.name} лого`}
                      className="w-12 h-12 rounded-md"
                    />
                    <div>
                      <h3 className="font-bold">{project.name}</h3>
                      <div className="text-xs text-muted-foreground">{project.helpers} помощников</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 flex-grow">{project.description}</p>

                  <Button className="w-full flex items-center justify-center gap-1">
                    <span>Перейти к помощникам</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

