"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { AdBanner } from "@/components/ad-banner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LikeDislikeButtons } from "@/components/like-dislike-buttons"
import { DetailButton } from "@/components/detail-button"
import { Search, Car, Truck, Bike, Ship, Plane, Filter, ArrowUpDown } from "lucide-react"

export default function VehiclesPage() {
  const { projectId } = useParams()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      const vehiclesData = [
        {
          id: 1,
          name: "Adder",
          type: "car",
          class: "Super",
          price: 1000000,
          speed: 9.2,
          acceleration: 8.6,
          handling: 8.0,
          image: "/placeholder.svg?height=150&width=250",
          description: "Один из самых быстрых автомобилей в игре с отличной управляемостью и ускорением.",
        },
        {
          id: 2,
          name: "Bati 801",
          type: "bike",
          class: "Motorcycles",
          price: 15000,
          speed: 9.5,
          acceleration: 9.3,
          handling: 8.5,
          image: "/placeholder.svg?height=150&width=250",
          description: "Спортивный мотоцикл с высокой скоростью и отличным ускорением.",
        },
        {
          id: 3,
          name: "Phantom",
          type: "truck",
          class: "Commercial",
          price: 120000,
          speed: 5.5,
          acceleration: 4.0,
          handling: 3.5,
          image: "/placeholder.svg?height=150&width=250",
          description: "Мощный грузовик для перевозки тяжелых грузов и трейлеров.",
        },
        {
          id: 4,
          name: "Dinghy",
          type: "boat",
          class: "Boats",
          price: 25000,
          speed: 6.5,
          acceleration: 7.0,
          handling: 6.0,
          image: "/placeholder.svg?height=150&width=250",
          description: "Небольшая быстрая лодка для перемещения по воде.",
        },
        {
          id: 5,
          name: "Luxor",
          type: "plane",
          class: "Planes",
          price: 1500000,
          speed: 8.5,
          acceleration: 7.5,
          handling: 7.0,
          image: "/placeholder.svg?height=150&width=250",
          description: "Роскошный частный самолет для быстрого перемещения по карте.",
        },
        {
          id: 6,
          name: "Zentorno",
          type: "car",
          class: "Super",
          price: 725000,
          speed: 9.0,
          acceleration: 8.8,
          handling: 8.5,
          image: "/placeholder.svg?height=150&width=250",
          description: "Спортивный автомобиль с отличными характеристиками и агрессивным дизайном.",
        },
        {
          id: 7,
          name: "Sanchez",
          type: "bike",
          class: "Off-road",
          price: 8000,
          speed: 7.5,
          acceleration: 8.0,
          handling: 7.0,
          image: "/placeholder.svg?height=150&width=250",
          description: "Внедорожный мотоцикл, идеальный для езды по бездорожью.",
        },
        {
          id: 8,
          name: "Buzzard",
          type: "plane",
          class: "Helicopters",
          price: 1750000,
          speed: 8.0,
          acceleration: 7.0,
          handling: 8.0,
          image: "/placeholder.svg?height=150&width=250",
          description: "Боевой вертолет с ракетами и пулеметами.",
        },
      ]

      setVehicles(vehiclesData)
      setLoading(false)
    }, 800)
  }, [projectId])

  // Фильтрация транспорта по типу и поисковому запросу
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesTab = activeTab === "all" || vehicle.type === activeTab
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // Сортировка транспорта
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    let comparison = 0

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "price") {
      comparison = a.price - b.price
    } else if (sortBy === "speed") {
      comparison = a.speed - b.speed
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Транспорт - {projectId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </h1>
      <p className="text-muted-foreground mb-8">
        Полный каталог транспортных средств, доступных в проекте. Выбирайте из множества автомобилей, мотоциклов, лодок
        и самолетов.
      </p>

      {/* Рекламный баннер */}
      <AdBanner
        id="vehicles-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-vehicles"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      {/* Поиск и фильтры */}
      <div className="flex flex-col md:flex-row gap-4 my-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск транспорта..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSort("name")}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Имя {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button variant="outline" onClick={() => handleSort("price")}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Цена {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button variant="outline" onClick={() => handleSort("speed")}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Скорость {sortBy === "speed" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </div>
      </div>

      {/* Табы для фильтрации по типу */}
      <div className="my-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row gap-2">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Все</span>
            </TabsTrigger>
            <TabsTrigger value="car" className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span>Автомобили</span>
            </TabsTrigger>
            <TabsTrigger value="bike" className="flex items-center gap-1">
              <Bike className="h-4 w-4" />
              <span>Мотоциклы</span>
            </TabsTrigger>
            <TabsTrigger value="truck" className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>Грузовики</span>
            </TabsTrigger>
            <TabsTrigger value="boat" className="flex items-center gap-1">
              <Ship className="h-4 w-4" />
              <span>Лодки</span>
            </TabsTrigger>
            <TabsTrigger value="plane" className="flex items-center gap-1">
              <Plane className="h-4 w-4" />
              <span>Самолеты</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Список транспорта */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-card rounded-lg overflow-hidden shadow-md">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={vehicle.image || "/placeholder.svg"}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  {vehicle.class}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{vehicle.description}</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Цена</div>
                    <div className="font-medium">${vehicle.price.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Скорость</div>
                    <div className="font-medium">{vehicle.speed}/10</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Управление</div>
                    <div className="font-medium">{vehicle.handling}/10</div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-muted flex justify-between items-center">
                <LikeDislikeButtons id={`vehicle-${vehicle.id}`} type="vehicle" />
                <DetailButton href={`/projects/${projectId}/vehicles/${vehicle.id}`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Если нет результатов */}
      {!loading && sortedVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl font-medium mb-2">Транспорт не найден</p>
          <p className="text-muted-foreground">Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      )}
    </div>
  )
}

