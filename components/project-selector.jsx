"use client"

import { useState } from "react"
import Link from "next/link"
import { Database, Gamepad2, Gamepad } from "lucide-react"

const projects = [
  {
    id: "majestic-rp",
    name: "Majestic RP",
    icon: <Database className="h-5 w-5 text-emerald-500" />,
    description: "GTA 5 RP",
  },
  {
    id: "diamond-rp",
    name: "Diamond RP",
    icon: <Gamepad2 className="h-5 w-5 text-purple-500" />,
    description: "GTA SA:MP",
  },
  {
    id: "advance-rp",
    name: "Advance RP",
    icon: <Gamepad className="h-5 w-5 text-red-500" />,
    description: "GTA SA:MP",
  },
]

export function ProjectSelector() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Выбор проекта</h2>
      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="flex-shrink-0 bg-background rounded-full p-2">{project.icon}</div>
            <div>
              <div className="font-medium">{project.name}</div>
              <div className="text-xs text-muted-foreground">{project.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

