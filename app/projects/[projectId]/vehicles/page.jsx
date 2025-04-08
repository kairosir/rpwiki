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
import { loadCategoryData, loadCategoryCommon } from "@/utils/data-loader"

export default function VehiclesPage() {
  const { projectId } = useParams()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [vehicles, setVehicles] = useState([])
  const [commonData, setCommonData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        // Загружаем общие данные категории и данные для проекта
        const [vehiclesCommonData, projectVehicles] = await Promise.all([
          loadCategoryCommon('vehicles'),
          loadCategoryData('vehicles', projectId)
        ]);
        
        setCommonData(vehiclesCommonData);
        setVehicles(projectVehicles);
      } catch (error) {
        console.error(`Ошибка загрузки данных для проекта ${projectId}:`, error);
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [projectId]);

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

  // Отображаем загрузку пока не получим данные
  if (loading || !commonData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {commonData.info.title} - {projectId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </h1>
      <p className="text-muted-foreground mb-8">
        {commonData.info.description}
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

      {/* Табы с категориями транспорта */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {commonData.types.map((type) => (
            <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
              {type.id === "all" && <Car className="h-4 w-4" />}
              {type.id === "car" && <Car className="h-4 w-4" />}
              {type.id === "bike" && <Bike className="h-4 w-4" />}
              {type.id === "truck" && <Truck className="h-4 w-4" />}
              {type.id === "boat" && <Ship className="h-4 w-4" />}
              {type.id === "plane" && <Plane className="h-4 w-4" />}
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Список транспорта */}
      {sortedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-card rounded-lg overflow-hidden shadow-sm">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{vehicle.name}</h3>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {vehicle.class}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {vehicle.description}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Скорость</div>
                    <div className="font-semibold">{vehicle.speed}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Ускорение</div>
                    <div className="font-semibold">{vehicle.acceleration}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Управление</div>
                    <div className="font-semibold">{vehicle.handling}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">
                    ${vehicle.price.toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <LikeDislikeButtons id={`vehicle-${vehicle.id}`} />
                    <DetailButton href={`/projects/${projectId}/vehicles/${vehicle.id}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">По вашему запросу ничего не найдено</div>
          <Button onClick={() => { setSearchQuery(""); setActiveTab("all"); }}>
            Сбросить фильтры
          </Button>
        </div>
      )}

      {/* Рекламный баннер */}
      <div className="mt-10">
        <AdBanner
          id="vehicles-bottom-banner"
          position="footer"
          imageUrl="/placeholder.svg?height=90&width=728"
          targetUrl="https://example.com/ad-vehicles-bottom"
          altText="Реклама игровых товаров"
          backgroundColor="#f5f5f5"
        />
      </div>
    </div>
  )
}

