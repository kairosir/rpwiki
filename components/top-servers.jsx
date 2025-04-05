import Link from "next/link"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const servers = [
  {
    id: 1,
    name: "Majestic RP - Сиэтл",
    project: "Majestic RP",
    players: 3130,
    capacity: 3500,
    discord: "https://discord.gg/example",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Majestic RP - Хьюстон",
    project: "Majestic RP",
    players: 2231,
    capacity: 2500,
    discord: "https://discord.gg/example",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Diamond RP - Emerald",
    project: "Diamond RP",
    players: 1806,
    capacity: 2000,
    discord: "https://discord.gg/example",
    website: "https://example.com",
  },
  {
    id: 4,
    name: "Eclipse RP - Главный",
    project: "Eclipse RP",
    players: 1192,
    capacity: 1500,
    discord: "https://discord.gg/example",
    website: "https://example.com",
  },
  {
    id: 5,
    name: "Advance RP - Sapphire",
    project: "Advance RP",
    players: 1170,
    capacity: 1500,
    discord: "https://discord.gg/example",
    website: "https://example.com",
  },
]

export function TopServers() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Топ популярных серверов</h2>
        <Link href="/servers" className="text-primary hover:underline text-sm">
          Все серверы
        </Link>
      </div>

      <div className="space-y-4">
        {servers.map((server) => (
          <div key={server.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">{server.name}</h3>
              <span className="text-sm text-muted-foreground">{server.project}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <div className="flex-grow">
                <Progress value={(server.players / server.capacity) * 100} className="h-2" />
              </div>
              <span className="text-sm whitespace-nowrap">
                {server.players}/{server.capacity}
              </span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <Link href={server.discord} target="_blank">
                  Discord
                </Link>
              </Button>
              <Button size="sm" className="flex-1">
                Присоединиться
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

