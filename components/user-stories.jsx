import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Quote } from "lucide-react"

const stories = [
  {
    id: 1,
    author: "MaxPlayer",
    avatar: "/placeholder.svg?height=50&width=50",
    project: "Majestic RP",
    content:
      "Начал играть на Majestic RP полгода назад. За это время открыл свой автосалон, стал депутатом и нашел много друзей. RP действительно затягивает!",
    date: "2023-03-20",
  },
  {
    id: 2,
    author: "RPGirl",
    avatar: "/placeholder.svg?height=50&width=50",
    project: "Diamond RP",
    content:
      "На Diamond RP я играю уже 3 года. Начинала с работы таксиста, а сейчас владею сетью ресторанов и возглавляю клан. Это как вторая жизнь!",
    date: "2023-03-15",
  },
]

export function UserStories() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Истории игроков</h2>
        <Link href="/stories" className="text-primary hover:underline text-sm">
          Все истории
        </Link>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="border-l-4 border-primary/30 pl-4">
            <div className="flex items-start gap-3 mb-2">
              <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <p className="text-sm italic">{story.content}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={story.avatar || "/placeholder.svg"} alt={story.author} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium">{story.author}</span>
              </div>
              <span className="text-xs text-muted-foreground">{story.project}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-accent/50 rounded-md">
        <h3 className="font-medium mb-2">Поделитесь своей историей</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Расскажите о своем опыте в мире RP и вдохновите других игроков!
        </p>
        <Link href="/stories/submit">
          <Button variant="default" size="sm">
            Отправить историю
          </Button>
        </Link>
      </div>
    </div>
  )
}

