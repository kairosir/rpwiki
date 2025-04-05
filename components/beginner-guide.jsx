import Link from "next/link"
import { HelpCircle, BookOpen, Gamepad2, DollarSign, Users } from "lucide-react"

const guides = [
  {
    id: 1,
    title: "Что такое RP и как начать?",
    icon: <HelpCircle className="h-4 w-4" />,
    href: "/guides/what-is-rp",
  },
  {
    id: 2,
    title: "Основные термины и сленг",
    icon: <BookOpen className="h-4 w-4" />,
    href: "/guides/rp-terms",
  },
  {
    id: 3,
    title: "Как зарегистрироваться на сервере",
    icon: <Gamepad2 className="h-4 w-4" />,
    href: "/guides/server-registration",
  },
  {
    id: 4,
    title: "Способы заработка для новичков",
    icon: <DollarSign className="h-4 w-4" />,
    href: "/guides/beginner-jobs",
  },
  {
    id: 5,
    title: "Как найти RP-сообщество",
    icon: <Users className="h-4 w-4" />,
    href: "/guides/find-community",
  },
]

export function BeginnerGuide() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Справка для новичков</h2>

      <div className="space-y-3">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={guide.href}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
          >
            <div className="flex-shrink-0 bg-primary/10 text-primary p-2 rounded-full">{guide.icon}</div>
            <span className="text-sm">{guide.title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/guides" className="text-primary hover:underline text-sm">
          Все гайды для новичков
        </Link>
      </div>
    </div>
  )
}

