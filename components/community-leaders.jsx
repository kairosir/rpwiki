import Link from "next/link"
import { ExternalLink } from "lucide-react"

const leaders = [
  {
    id: 1,
    name: "AlexPlay",
    role: "Стример",
    avatar: "/placeholder.svg?height=50&width=50",
    platform: "Twitch",
    url: "https://twitch.tv/example",
    followers: "125K",
  },
  {
    id: 2,
    name: "RPMaster",
    role: "Ютубер",
    avatar: "/placeholder.svg?height=50&width=50",
    platform: "YouTube",
    url: "https://youtube.com/example",
    followers: "250K",
  },
  {
    id: 3,
    name: "GTA_Legend",
    role: "Блогер",
    avatar: "/placeholder.svg?height=50&width=50",
    platform: "Instagram",
    url: "https://instagram.com/example",
    followers: "80K",
  },
]

export function CommunityLeaders() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Лидеры RP-комьюнити</h2>

      <div className="space-y-3">
        {leaders.map((leader) => (
          <Link
            key={leader.id}
            href={leader.url}
            target="_blank"
            className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
          >
            <img src={leader.avatar || "/placeholder.svg"} alt={leader.name} className="w-10 h-10 rounded-full" />
            <div className="flex-grow">
              <div className="font-medium">{leader.name}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>{leader.role}</span>
                <span>
                  {leader.platform} • {leader.followers}
                </span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/community" className="text-primary hover:underline text-sm">
          Все известные личности
        </Link>
      </div>
    </div>
  )
}

