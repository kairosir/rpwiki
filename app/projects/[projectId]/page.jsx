"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ProjectCategoryGrid } from "@/components/project-category-grid"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, Server, Calendar } from "lucide-react"
import projects from "@/data/projects"

export default function ProjectPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => {
    if (!projectId) {
      console.error("❌ Ошибка: projectId отсутствует.")
      return
    }

    // Получаем данные проекта из импортированного файла
    const projectData = projects[projectId] || null
    setProject(projectData)
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
          <div className="flex flex-wrap gap-2 mt-4">
            <Button asChild size="sm" variant="outline">
              <a href={project.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Сайт
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={project.discord} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Discord
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Описание проекта */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">О проекте</h2>
        <p className="text-muted-foreground">{project.description}</p>

        {/* Особенности */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Особенности проекта</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Категории */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Разделы вики по проекту</h2>
        <ProjectCategoryGrid categories={project.categories} />
      </div>
    </div>
  );
}

