"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, Database, Gamepad2, Gamepad } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const projects = [
  {
    id: "majestic-rp",
    name: "Majestic RP",
    icon: <Database className="h-4 w-4 text-emerald-500" />,
    description: "GTA 5 RP",
  },
  {
    id: "diamond-rp",
    name: "Diamond RP",
    icon: <Gamepad2 className="h-4 w-4 text-purple-500" />,
    description: "GTA SA:MP",
  },
  {
    id: "advance-rp",
    name: "Advance RP",
    icon: <Gamepad className="h-4 w-4 text-red-500" />,
    description: "GTA SA:MP",
  },
  {
    id: "eclipse-rp",
    name: "Eclipse RP",
    icon: <Database className="h-4 w-4 text-blue-500" />,
    description: "GTA 5 RP",
  },
]

export function ProjectSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
          <span>Выбрать проект</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Выберите проект</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem key={project.id} asChild>
            <Link href={`/projects/${project.id}`} className="flex items-center gap-2 cursor-pointer">
              {project.icon}
              <div>
                <span>{project.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{project.description}</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/projects" className="cursor-pointer">
            Все проекты
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

