import { Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function ServersByGameType({ title, servers, showTitle = true }) {
  // Группировка серверов по проектам
  const serversByProject = servers.reduce((acc, server) => {
    if (!acc[server.project]) {
      acc[server.project] = []
    }
    acc[server.project].push(server)
    return acc
  }, {})

  if (servers.length === 0) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground">Серверы не найдены</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      {showTitle && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      <div className="space-y-6">
        {Object.entries(serversByProject).map(([project, projectServers]) => (
          <div key={project} className="border-b pb-4 last:border-0 last:pb-0">
            <h3 className="font-bold text-lg mb-3">{project}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {projectServers.map((server) => (
                <div key={server.id} className="bg-background rounded-lg p-3 hover:bg-accent/50 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{server.name}</h4>
                    <span className="text-sm text-muted-foreground">{server.gameType.toUpperCase()}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div className="flex-grow">
                      <Progress value={(server.online / server.capacity) * 100} className="h-2" />
                    </div>
                    <span className="text-sm whitespace-nowrap">
                      {server.online}/{server.capacity}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      {server.ip}:{server.port}
                    </Button>
                    <Button size="sm" className="flex-1 text-xs">
                      Подключиться
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

