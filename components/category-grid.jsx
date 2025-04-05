import Link from "next/link"
import { Database, Map, Car, Home, DollarSign, ShoppingBag, Shirt, Sparkles, Package } from "lucide-react"

const categories = [
  {
    title: "Серверы",
    icon: <Database className="h-6 w-6" />,
    description: "Список всех серверов",
    href: "/servers",
  },
  {
    title: "Карта",
    icon: <Map className="h-6 w-6" />,
    description: "Карта сервера со всеми локациями",
    href: "/map",
  },
  {
    title: "Транспорт",
    icon: <Car className="h-6 w-6" />,
    description: "Весь доступный транспорт на сервере",
    href: "/vehicles",
  },
  {
    title: "Недвижимость",
    icon: <Home className="h-6 w-6" />,
    description: "Данные по всем домам и квартирам",
    href: "/realty",
  },
  {
    title: "Бизнесы",
    icon: <DollarSign className="h-6 w-6" />,
    description: "Продвинутый вариант заработка",
    href: "/biz",
  },
  {
    title: "Мужская одежда",
    icon: <Shirt className="h-6 w-6" />,
    description: "Показ мод для мужчин",
    href: "/clothes/male",
  },
  {
    title: "Женская одежда",
    icon: <ShoppingBag className="h-6 w-6" />,
    description: "Показ мод для женщин",
    href: "/clothes/female",
  },
  {
    title: "Скины",
    icon: <Sparkles className="h-6 w-6" />,
    description: "Каталог всех доступных паттернов",
    href: "/skins",
  },
  {
    title: "Предметы",
    icon: <Package className="h-6 w-6" />,
    description: "Доступные предметы на сервере",
    href: "/items",
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-accent transition-colors"
        >
          <div className="p-2 bg-primary/10 rounded-md text-primary">{category.icon}</div>
          <div>
            <h3 className="font-bold">{category.title}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

