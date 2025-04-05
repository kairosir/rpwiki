"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"

export default function CategoryPage() {
  const { projectId, category } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      const categoryData = {
        vehicles: {
          title: "Транспорт",
          description: "Весь доступный транспорт на сервере",
          items: [
            { id: 1, name: "Adder", description: "Суперкар", image: "/placeholder.svg?height=200&width=300" },
            {
              id: 2,
              name: "Futo",
              description: "Спортивный автомобиль",
              image: "/placeholder.svg?height=200&width=300",
            },
            { id: 3, name: "Sanchez", description: "Мотоцикл", image: "/placeholder.svg?height=200&width=300" },
            { id: 4, name: "Buzzard", description: "Вертолет", image: "/placeholder.svg?height=200&width=300" },
          ],
        },
        realty: {
          title: "Недвижимость",
          description: "Данные по всем домам и квартирам",
          items: [
            {
              id: 1,
              name: "Квартира в Винвуде",
              description: "Стандартная квартира",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 2,
              name: "Дом в Палето-Бэй",
              description: "Загородный дом",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 3,
              name: "Апартаменты в центре",
              description: "Элитное жилье",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
        biz: {
          title: "Бизнесы",
          description: "Продвинутый вариант заработка",
          items: [
            { id: 1, name: "Автомойка", description: "Малый бизнес", image: "/placeholder.svg?height=200&width=300" },
            { id: 2, name: "Заправка", description: "Средний бизнес", image: "/placeholder.svg?height=200&width=300" },
            { id: 3, name: "Автосалон", description: "Крупный бизнес", image: "/placeholder.svg?height=200&width=300" },
          ],
        },
        map: {
          title: "Карта",
          description: "Карта сервера со всеми локациями",
          items: [
            {
              id: 1,
              name: "Лос-Сантос",
              description: "Основной город",
              image: "/placeholder.svg?height=200&width=300",
            },
            { id: 2, name: "Сэнди-Шорс", description: "Пригород", image: "/placeholder.svg?height=200&width=300" },
            {
              id: 3,
              name: "Палето-Бэй",
              description: "Северный город",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
        clothes: {
          title: "Одежда",
          description: "Каталог одежды",
          items: [
            {
              id: 1,
              name: "Повседневная",
              description: "Обычная одежда",
              image: "/placeholder.svg?height=200&width=300",
            },
            { id: 2, name: "Деловая", description: "Костюмы и платья", image: "/placeholder.svg?height=200&width=300" },
            {
              id: 3,
              name: "Спортивная",
              description: "Для активного отдыха",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
        skins: {
          title: "Скины",
          description: "Каталог всех доступных паттернов",
          items: [
            {
              id: 1,
              name: "Стандартные",
              description: "Базовые скины",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 2,
              name: "Премиум",
              description: "Эксклюзивные скины",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
        items: {
          title: "Предметы",
          description: "Доступные предметы на сервере",
          items: [
            { id: 1, name: "Оружие", description: "Различное оружие", image: "/placeholder.svg?height=200&width=300" },
            { id: 2, name: "Еда", description: "Продукты питания", image: "/placeholder.svg?height=200&width=300" },
            {
              id: 3,
              name: "Инструменты",
              description: "Рабочие инструменты",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
        jobs: {
          title: "Работы",
          description: "Варианты заработка",
          items: [
            {
              id: 1,
              name: "Таксист",
              description: "Перевозка пассажиров",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 2,
              name: "Дальнобойщик",
              description: "Перевозка грузов",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              id: 3,
              name: "Механик",
              description: "Ремонт транспорта",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
        factions: {
          title: "Фракции",
          description: "Государственные и криминальные организации",
          items: [
            {
              id: 1,
              name: "Полиция",
              description: "Охрана правопорядка",
              image: "/placeholder.svg?height=200&width=300",
            },
            { id: 2, name: "Медики", description: "Спасение жизней", image: "/placeholder.svg?height=200&width=300" },
            {
              id: 3,
              name: "Мафия",
              description: "Криминальная организация",
              image: "/placeholder.svg?height=200&width=300",
            },
          ],
        },
      }

      setData(categoryData[category] || null)
      setLoading(false)
    }, 500)
  }, [projectId, category])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Категория не найдена</h1>
      </div>
    )
  }

  return (
    <div>
      <Link href={`/projects/${projectId}`} className="flex items-center text-primary mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к проекту
      </Link>

      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-muted-foreground mb-8">{data.description}</p>

      {/* Рекламный баннер в контенте */}
      <AdBanner
        id={`category-content-banner-${category}`}
        position="content"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-category"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
        showCloseButton={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {data.items.map((item) => (
          <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

