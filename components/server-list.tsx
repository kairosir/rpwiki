import {
  Leaf,
  Zap,
  Flame,
  Building2,
  Plane,
  Home,
  Car,
  Palmtree,
  Mountain,
  Landmark,
  Umbrella,
  Compass,
} from "lucide-react"

const servers = [
  { name: "Нью-Йорк", icon: <Building2 className="h-5 w-5 text-emerald-500" />, online: 1049 },
  { name: "Вашингтон", icon: <Landmark className="h-5 w-5 text-purple-500" />, online: 1183 },
  { name: "Даллас", icon: <Flame className="h-5 w-5 text-red-500" />, online: 1058 },
  { name: "Бостон", icon: <Leaf className="h-5 w-5 text-green-500" />, online: 1794 },
  { name: "Хьюстон", icon: <Zap className="h-5 w-5 text-amber-500" />, online: 2286 },
  { name: "Сиэтл", icon: <Umbrella className="h-5 w-5 text-blue-400" />, online: 3142 },
  { name: "Детройт", icon: <Home className="h-5 w-5 text-orange-500" />, online: 1067 },
  { name: "Чикаго", icon: <Building2 className="h-5 w-5 text-sky-400" />, online: 1046 },
  { name: "Сан-Франциско", icon: <Compass className="h-5 w-5 text-orange-400" />, online: 1052 },
  { name: "Атланта", icon: <Car className="h-5 w-5 text-yellow-400" />, online: 1063 },
  { name: "Сан-Диего", icon: <Plane className="h-5 w-5 text-blue-500" />, online: 981 },
  { name: "Лос-Анджелес", icon: <Palmtree className="h-5 w-5 text-green-400" />, online: 1133 },
  { name: "Майами", icon: <Mountain className="h-5 w-5 text-pink-500" />, online: 1118 },
  { name: "Лас-Вегас", icon: <Zap className="h-5 w-5 text-yellow-500" />, online: 1075 },
]

export function ServerList() {
  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Статус серверов</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {servers.map((server) => (
          <div key={server.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors">
            <div className="flex-shrink-0 bg-background rounded-full p-2">{server.icon}</div>
            <div>
              <div className="font-medium">{server.name}</div>
              <div className="text-xs text-muted-foreground">{server.online} онлайн</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

