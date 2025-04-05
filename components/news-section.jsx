import Link from "next/link"
import { CalendarIcon } from "lucide-react"

const news = [
  {
    id: 1,
    title: "Крупное обновление Majestic RP: новые бизнесы и механики",
    excerpt:
      "Разработчики Majestic RP выпустили масштабное обновление, добавляющее 5 новых типов бизнесов и улучшающее экономические механики.",
    date: "2023-03-25",
    image: "/placeholder.svg?height=200&width=400",
    project: "Majestic RP",
  },
  {
    id: 2,
    title: "Diamond RP отмечает 10-летие: специальные события и подарки",
    excerpt:
      "Легендарному проекту Diamond RP исполнилось 10 лет. Администрация подготовила серию мероприятий и подарки для игроков.",
    date: "2023-03-20",
    image: "/placeholder.svg?height=200&width=400",
    project: "Diamond RP",
  },
  {
    id: 3,
    title: "Eclipse RP запускает новый сервер для новичков",
    excerpt: "Проект Eclipse RP открыл специальный сервер для новых игроков с упрощенными правилами и наставниками.",
    date: "2023-03-15",
    image: "/placeholder.svg?height=200&width=400",
    project: "Eclipse RP",
  },
]

export function NewsSection() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Новости RP-сообщества</h2>
        <Link href="/news" className="text-primary hover:underline text-sm">
          Все новости
        </Link>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-4 pb-4 border-b last:border-0">
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.project}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
              <Link href={`/news/${item.id}`} className="text-primary hover:underline text-sm">
                Читать далее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

