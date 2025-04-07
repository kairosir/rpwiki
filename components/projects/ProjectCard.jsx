import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"

export function ProjectCard({ project }) {
  return (
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
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/projects/${project.id}`}>Подробнее</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
