import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"

export default function ProjectLayout({ children, params }) {
  const { projectId } = params

  // Получаем название проекта на основе ID
  const getProjectName = (id) => {
    const projectNames = {
      "majestic-rp": "Majestic RP",
      "diamond-rp": "Diamond RP",
      "advance-rp": "Advance RP",
      "eclipse-rp": "Eclipse RP",
    }
    return projectNames[id] || id
  }

  const projectName = getProjectName(projectId)

  return (
    <div>
      {/* Навигационная цепочка */}
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <Link href="/projects" className="text-muted-foreground hover:text-foreground">
              Проекты
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <span>{projectName}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-3">{children}</div>

          {/* Боковая панель с рекламой */}
          <div className="space-y-6">
            <AdBanner
              id="project-sidebar-banner-1"
              position="sidebar"
              imageUrl="/placeholder.svg?height=600&width=300"
              targetUrl="https://example.com/ad1"
              altText="Реклама игрового сервера"
            />

            <AdBanner
              id="project-sidebar-banner-2"
              position="sidebar"
              imageUrl="/placeholder.svg?height=250&width=300"
              targetUrl="https://example.com/ad2"
              altText="Реклама игровых товаров"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

