import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Гонки на спорткарах",
    project: "Majestic RP",
    date: "2023-04-01",
    time: "20:00",
    href: "/events/1",
  },
  {
    id: 2,
    title: "Выборы мэра города",
    project: "Diamond RP",
    date: "2023-04-03",
    time: "18:00",
    href: "/events/2",
  },
  {
    id: 3,
    title: "Турнир по боксу",
    project: "Eclipse RP",
    date: "2023-04-05",
    time: "19:30",
    href: "/events/3",
  },
]

export function EventsCalendar() {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Календарь событий</h2>

      <div className="space-y-3">
        {events.map((event) => (
          <Link key={event.id} href={event.href} className="block p-3 rounded-md hover:bg-accent transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{event.title}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{event.project}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <Clock className="h-3 w-3 mr-1" />
              <span>{event.time}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/events" className="text-primary hover:underline text-sm">
          Все события
        </Link>
      </div>
    </div>
  )
}

