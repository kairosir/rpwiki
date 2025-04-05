import {
  Umbrella,
  Zap,
  Leaf,
  Landmark,
  Flame,
  Building2,
  Compass,
  Car,
  Plane,
  Palmtree,
  Mountain,
  Home,
} from "lucide-react"

const servers = [
  {
    name: "Сиэтл",
    icon: <Umbrella className="h-10 w-10 text-[#009DBF]" />,
    online: 3130,
    queue: 4,
    color: "#009DBF",
  },
  {
    name: "Хьюстон",
    icon: <Zap className="h-10 w-10 text-[#F1B129]" />,
    online: 2231,
    queue: 2,
    color: "#F1B129",
  },
  {
    name: "Бостон",
    icon: <Leaf className="h-10 w-10 text-[#45CD5B]" />,
    online: 1806,
    queue: 0,
    color: "#45CD5B",
  },
  {
    name: "Вашингтон",
    icon: <Landmark className="h-10 w-10 text-[#9747FF]" />,
    online: 1192,
    queue: 2,
    color: "#9747FF",
  },
  {
    name: "Лос-Анджелес",
    icon: <Palmtree className="h-10 w-10 text-[#62B754]" />,
    online: 1170,
    queue: 0,
    color: "#62B754",
  },
  {
    name: "Майами",
    icon: <Mountain className="h-10 w-10 text-[#FF077E]" />,
    online: 1123,
    queue: 0,
    color: "#FF077E",
  },
  {
    name: "Детройт",
    icon: <Home className="h-10 w-10 text-[#E25C40]" />,
    online: 1087,
    queue: 0,
    color: "#E25C40",
  },
  {
    name: "Лас-Вегас",
    icon: <Zap className="h-10 w-10 text-[#F3C213]" />,
    online: 1069,
    queue: 0,
    color: "#F3C213",
  },
  {
    name: "Сан-Франциско",
    icon: <Compass className="h-10 w-10 text-[#E58139]" />,
    online: 1060,
    queue: 0,
    color: "#E58139",
  },
  {
    name: "Атланта",
    icon: <Car className="h-10 w-10 text-[#FFDC61]" />,
    online: 1053,
    queue: 0,
    color: "#FFDC61",
  },
  {
    name: "Чикаго",
    icon: <Building2 className="h-10 w-10 text-[#77BDE9]" />,
    online: 1046,
    queue: 0,
    color: "#77BDE9",
  },
  {
    name: "Даллас",
    icon: <Flame className="h-10 w-10 text-[#EF3C3C]" />,
    online: 1038,
    queue: 0,
    color: "#EF3C3C",
  },
  {
    name: "Нью-Йорк",
    icon: <Building2 className="h-10 w-10 text-[#629F8E]" />,
    online: 1033,
    queue: 0,
    color: "#629F8E",
  },
  {
    name: "Сан-Диего",
    icon: <Plane className="h-10 w-10 text-[#4098FF]" />,
    online: 999,
    queue: 0,
    color: "#4098FF",
    forNewbies: true,
  },
]

export function ServerGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {servers.map((server) => (
        <div key={server.name} className="bg-card rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">{server.icon}</div>
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-bold text-lg">{server.name}</h3>
                {server.forNewbies && (
                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Для новичков</span>
                )}
              </div>
              <div className="text-2xl font-bold mt-1">{server.online}</div>
              <div className="text-xs text-muted-foreground">
                {server.queue > 0 ? `из них ${server.queue} в очереди` : "онлайн"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

