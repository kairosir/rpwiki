import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: "majestic-rp",
    name: "Majestic RP",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Популярный ролевой проект в GTA 5 с реалистичной экономикой и уникальными механиками",
    game: "GTA 5",
    players: 15937,
    tags: ["Реалистичный", "Экономика", "PVP"],
  },
  {
    id: "diamond-rp",
    name: "Diamond RP",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Классический ролевой проект в GTA San Andreas с многолетней историей и стабильным комьюнити",
    game: "GTA SA:MP",
    players: 8245,
    tags: ["Классика", "Криминал", "Фракции"],
  },
  {
    id: "advance-rp",
    name: "Advance RP",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Продвинутый ролевой проект в GTA San Andreas с глубокой проработкой ролевых механик",
    game: "GTA SA:MP",
    players: 7632,
    tags: ["Хардкор", "Экономика", "Roleplay"],
  },
  {
    id: "eclipse-rp",
    name: "Eclipse RP",
    logo: "/placeholder.svg?height=80&width=80",
    description: "Современный ролевой проект в GTA 5 с упором на социальное взаимодействие и бизнес",
    game: "GTA 5",
    players: 12458,
    tags: ["Бизнес", "Социальный", "Новичкам"],
  },
]

export function ProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={project.logo || "/placeholder.svg"}
                alt={`${project.name} лого`}
                className="w-12 h-12 rounded-md"
              />
              <div>
                <h3 className="font-bold">{project.name}</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{project.game}</span>
                  <span className="mx-2">•</span>
                  <span>{project.players.toLocaleString()} игроков</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 flex-grow">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <Link href={`/projects/${project.id}`}>
              <Button className="w-full">Подробнее</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

