"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ProjectCategoryGrid } from "@/components/project-category-grid"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, Server, Calendar } from "lucide-react"

export default function ProjectPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => {
    if (!projectId) {
      console.error("❌ Ошибка: projectId отсутствует.")
      return
    }

    // В реальном приложении здесь был бы запрос к API
    const projectData = {
      "majestic-rp": {
        name: "Majestic RP",
        logo: "/placeholder.svg?height=120&width=120",
        banner: "/placeholder.svg?height=300&width=1200",
        description:
          "Популярный ролевой проект в GTA 5 с реалистичной экономикой и уникальными механиками. Проект предлагает глубокий ролевой опыт с проработанной экономикой, разнообразными профессиями и возможностями для бизнеса.",
        game: "GTA 5",
        players: 15937,
        servers: 14,
        founded: "2018",
        website: "https://example.com",
        discord: "https://discord.gg/example",
        categories: [
          { title: "Карта", icon: "Map", href: `/projects/${projectId}/map` },
          { title: "Транспорт", icon: "Car", href: `/projects/${projectId}/vehicles` },
          { title: "Недвижимость", icon: "Home", href: `/projects/${projectId}/realty` },
          { title: "Бизнесы", icon: "DollarSign", href: `/projects/${projectId}/biz` },
          { title: "Одежда", icon: "Shirt", href: `/projects/${projectId}/clothes` },
          { title: "Скины", icon: "Sparkles", href: `/projects/${projectId}/skins` },
          { title: "Предметы", icon: "Package", href: `/projects/${projectId}/items` },
          { title: "Работы", icon: "Briefcase", href: `/projects/${projectId}/jobs` },
          { title: "Фракции", icon: "Users", href: `/projects/${projectId}/factions` },
          { title: "Гайды", icon: "BookOpen", href: `/projects/${projectId}/guides` },
          { title: "Донат", icon: "Heart", href: `/projects/${projectId}/donate` },
        ],
        features: [
          "Реалистичная экономика",
          "Уникальные механики",
          "Проработанные фракции",
          "Разнообразные бизнесы",
          "Активное сообщество",
          "Регулярные обновления",
        ],
      },
      "diamond-rp": {
        name: "Diamond RP",
        logo: "/placeholder.svg?height=120&width=120",
        banner: "/placeholder.svg?height=300&width=1200",
        description:
          "Классический ролевой проект в GTA San Andreas с многолетней историей и стабильным комьюнити. Один из старейших и наиболее уважаемых проектов в СНГ с богатой историей и традициями.",
        game: "GTA SA:MP",
        players: 8245,
        servers: 8,
        founded: "2011",
        website: "https://example.com",
        discord: "https://discord.gg/example",
        categories: [
          { title: "Карта", icon: "Map", href: `/projects/${projectId}/map` },
          { title: "Транспорт", icon: "Car", href: `/projects/${projectId}/vehicles` },
          { title: "Недвижимость", icon: "Home", href: `/projects/${projectId}/realty` },
          { title: "Бизнесы", icon: "DollarSign", href: `/projects/${projectId}/biz` },
          { title: "Скины", icon: "Sparkles", href: `/projects/${projectId}/skins` },
          { title: "Предметы", icon: "Package", href: `/projects/${projectId}/items` },
          { title: "Работы", icon: "Briefcase", href: `/projects/${projectId}/jobs` },
          { title: "Фракции", icon: "Users", href: `/projects/${projectId}/factions` },
          { title: "Гайды", icon: "BookOpen", href: `/projects/${projectId}/guides` },
          { title: "Донат", icon: "Heart", href: `/projects/${projectId}/donate` },
        ],
        features: [
          "Проверенная временем стабильность",
          "Классический геймплей",
          "Сильное комьюнити",
          "Разнообразные сервера",
          "Проработанная система фракций",
          "Богатая история",
        ],
      },
      "advance-rp": {
        name: "Advance RP",
        logo: "/placeholder.svg?height=120&width=120",
        banner: "/placeholder.svg?height=300&width=1200",
        description:
          "Продвинутый ролевой проект в GTA San Andreas с глубокой проработкой ролевых механик. Проект известен своим хардкорным подходом к ролевой игре и уникальными игровыми механиками.",
        game: "GTA SA:MP",
        players: 7632,
        servers: 6,
        founded: "2012",
        website: "https://example.com",
        discord: "https://discord.gg/example",
        categories: [
          { title: "Карта", icon: "Map", href: `/projects/${projectId}/map` },
          { title: "Транспорт", icon: "Car", href: `/projects/${projectId}/vehicles` },
          { title: "Недвижимость", icon: "Home", href: `/projects/${projectId}/realty` },
          { title: "Бизнесы", icon: "DollarSign", href: `/projects/${projectId}/biz` },
          { title: "Скины", icon: "Sparkles", href: `/projects/${projectId}/skins` },
          { title: "Предметы", icon: "Package", href: `/projects/${projectId}/items` },
          { title: "Работы", icon: "Briefcase", href: `/projects/${projectId}/jobs` },
          { title: "Фракции", icon: "Users", href: `/projects/${projectId}/factions` },
          { title: "Гайды", icon: "BookOpen", href: `/projects/${projectId}/guides` },
          { title: "Донат", icon: "Heart", href: `/projects/${projectId}/donate` },
        ],
        features: [
          "Хардкорный ролевой геймплей",
          "Сложная экономика",
          "Детализированные механики",
          "Строгие правила RP",
          "Уникальные игровые системы",
          "Активная администрация",
        ],
      },
      "eclipse-rp": {
        name: "Eclipse RP",
        logo: "/placeholder.svg?height=120&width=120",
        banner: "/placeholder.svg?height=300&width=1200",
        description:
          "Современный ролевой проект в GTA 5 с упором на социальное взаимодействие и бизнес. Проект создан для комфортной игры как новичков, так и опытных игроков с акцентом на социальные механики.",
        game: "GTA 5",
        players: 12458,
        servers: 10,
        founded: "2019",
        website: "https://example.com",
        discord: "https://discord.gg/example",
        categories: [
          { title: "Карта", icon: "Map", href: `/projects/${projectId}/map` },
          { title: "Транспорт", icon: "Car", href: `/projects/${projectId}/vehicles` },
          { title: "Недвижимость", icon: "Home", href: `/projects/${projectId}/realty` },
          { title: "Бизнесы", icon: "DollarSign", href: `/projects/${projectId}/biz` },
          { title: "Одежда", icon: "Shirt", href: `/projects/${projectId}/clothes` },
          { title: "Скины", icon: "Sparkles", href: `/projects/${projectId}/skins` },
          { title: "Предметы", icon: "Package", href: `/projects/${projectId}/items` },
          { title: "Работы", icon: "Briefcase", href: `/projects/${projectId}/jobs` },
          { title: "Фракции", icon: "Users", href: `/projects/${projectId}/factions` },
          { title: "Гайды", icon: "BookOpen", href: `/projects/${projectId}/guides` },
          { title: "Донат", icon: "Heart", href: `/projects/${projectId}/donate` },
        ],
        features: [
          "Дружелюбное сообщество",
          "Упрощенный вход для новичков",
          "Развитая бизнес-система",
          "Социальные механики",
          "Современный интерфейс",
          "Частые мероприятия",
        ],
      },
    }

    setProject(projectData[projectId] || null)
  }, [projectId])

  if (!projectId) {
    return <div>Ошибка: projectId отсутствует.</div>
  }

  if (!project) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Проект не найден</h1>
      </div>
    )
  }

  return (
    <div>
      {/* Баннер проекта */}
      <div className="relative h-48 md:h-64 overflow-hidden rounded-lg mb-8">
        <img
          src={project.banner || "/placeholder.svg"}
          alt={`${project.name} баннер`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Шапка проекта */}
      <div className="flex flex-col md:flex-row gap-6 -mt-20 mb-8 relative">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-background bg-card">
          <img
            src={project.logo || "/placeholder.svg"}
            alt={`${project.name} лого`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1 text-sm">
              <Server className="h-4 w-4 text-primary" />
              <span>{project.game}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>{project.players.toLocaleString()} игроков</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Server className="h-4 w-4 text-primary" />
              <span>{project.servers} серверов</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Основан в {project.founded}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href={project.website} target="_blank">
                Официальный сайт
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={project.discord} target="_blank">
                Discord
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Описание проекта */}
      <div className="mb-8">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">О проекте</h2>
          <p className="text-muted-foreground mb-6">{project.description}</p>

          <h3 className="font-bold mb-3">Особенности проекта</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Категории проекта */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Разделы проекта</h2>
        <ProjectCategoryGrid categories={project.categories} />
      </div>
    </div>
  )
}

