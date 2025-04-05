"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"
import { LikeDislikeButtons } from "@/components/like-dislike-buttons"
import { ArrowLeft, Car, Truck, Bike, Ship, Plane, DollarSign, Gauge, Zap, Share2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function VehicleDetailPage() {
  const { projectId, vehicleId } = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      // Имитация загрузки данных о транспорте
      const vehicleData = {
        id: vehicleId,
        name: "Adder",
        type: "car",
        class: "Super",
        price: 1000000,
        speed: 9.2,
        acceleration: 8.6,
        handling: 8.0,
        braking: 7.5,
        traction: 8.2,
        image: "/placeholder.svg?height=400&width=800",
        images: [
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
        ],
        description:
          "Один из самых быстрых автомобилей в игре с отличной управляемостью и ускорением. Идеально подходит для гонок и быстрого перемещения по карте.",
        longDescription:
          "Adder - это суперкар, вдохновленный реальным Bugatti Veyron. Это один из самых быстрых и дорогих автомобилей в игре. Благодаря мощному двигателю и аэродинамическому дизайну, Adder развивает невероятную скорость на прямых участках дороги. Однако, из-за своей массы, автомобиль может быть менее маневренным на поворотах по сравнению с другими суперкарами.\n\nAdder отлично подходит для гонок на длинных трассах, где можно в полной мере использовать его скоростные характеристики. Также это отличный выбор для быстрого перемещения по карте и демонстрации своего статуса другим игрокам.",
        features: [
          "Максимальная скорость: 250 км/ч",
          "Разгон до 100 км/ч: 2.8 сек",
          "Привод: задний",
          "Коробка передач: 6-ступенчатая",
          "Вместимость: 2 человека",
          "Расход топлива: высокий",
        ],
        locations: ["Автосалон премиум-класса в центре города", "Иногда появляется у особняков богатых NPC"],
        pros: ["Высокая максимальная скорость", "Быстрый разгон", "Престижный внешний вид"],
        cons: ["Высокая цена", "Высокий расход топлива", "Средняя управляемость на высоких скоростях"],
      }

      setVehicle(vehicleData)
      setLoading(false)
    }, 800)
  }, [projectId, vehicleId])

  const getVehicleIcon = (type) => {
    switch (type) {
      case "car":
        return <Car className="h-6 w-6" />
      case "bike":
        return <Bike className="h-6 w-6" />
      case "truck":
        return <Truck className="h-6 w-6" />
      case "boat":
        return <Ship className="h-6 w-6" />
      case "plane":
        return <Plane className="h-6 w-6" />
      default:
        return <Car className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href={`/projects/${projectId}/vehicles`} className="flex items-center text-primary mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к списку транспорта
        </Link>
        <h1 className="text-3xl font-bold mb-8">Транспорт не найден</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={`/projects/${projectId}/vehicles`} className="flex items-center text-primary mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к списку транспорта
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основная информация */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg overflow-hidden shadow-md">
            <div className="relative h-80">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {vehicle.class}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-full text-primary">{getVehicleIcon(vehicle.type)}</div>
                <h1 className="text-3xl font-bold">{vehicle.name}</h1>
              </div>

              <p className="text-lg mb-6">{vehicle.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <DollarSign className="h-6 w-6 text-primary mb-2" />
                  <div className="text-sm text-muted-foreground">Цена</div>
                  <div className="font-bold text-lg">${vehicle.price.toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-center">
                  <Gauge className="h-6 w-6 text-primary mb-2" />
                  <div className="text-sm text-muted-foreground">Скорость</div>
                  <div className="font-bold text-lg">{vehicle.speed}/10</div>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="h-6 w-6 text-primary mb-2" />
                  <div className="text-sm text-muted-foreground">Ускорение</div>
                  <div className="font-bold text-lg">{vehicle.acceleration}/10</div>
                </div>
              </div>

              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="specs">Характеристики</TabsTrigger>
                  <TabsTrigger value="locations">Где найти</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-4">
                  <div className="space-y-4">
                    <p className="whitespace-pre-line">{vehicle.longDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <h3 className="font-bold mb-2">Преимущества</h3>
                        <ul className="space-y-1">
                          {vehicle.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">Недостатки</h3>
                        <ul className="space-y-1">
                          {vehicle.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500">✗</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="specs" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold mb-3">Характеристики</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Скорость</span>
                            <span>{vehicle.speed}/10</span>
                          </div>
                          <Progress value={vehicle.speed * 10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Ускорение</span>
                            <span>{vehicle.acceleration}/10</span>
                          </div>
                          <Progress value={vehicle.acceleration * 10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Управление</span>
                            <span>{vehicle.handling}/10</span>
                          </div>
                          <Progress value={vehicle.handling * 10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Торможение</span>
                            <span>{vehicle.braking}/10</span>
                          </div>
                          <Progress value={vehicle.braking * 10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Сцепление</span>
                            <span>{vehicle.traction}/10</span>
                          </div>
                          <Progress value={vehicle.traction * 10} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-3">Особенности</h3>
                      <ul className="space-y-2">
                        {vehicle.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="locations" className="pt-4">
                  <div>
                    <h3 className="font-bold mb-3">Где найти</h3>
                    <ul className="space-y-2">
                      {vehicle.locations.map((location, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                          <span>{location}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="px-6 py-4 bg-muted flex justify-between items-center">
              <LikeDislikeButtons id={`vehicle-detail-${vehicle.id}`} type="vehicle-detail" />
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>

          {/* Галерея изображений */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Галерея</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicle.images.map((image, index) => (
                <div key={index} className="bg-card rounded-lg overflow-hidden shadow-md">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${vehicle.name} - изображение ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          <AdBanner
            id={`vehicle-detail-${vehicle.id}-sidebar`}
            position="sidebar"
            imageUrl="/placeholder.svg?height=250&width=300"
            targetUrl="https://example.com/ad-vehicle"
            altText="Реклама игровых товаров"
          />

          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Похожие транспортные средства</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 hover:bg-accent transition-colors p-2 rounded-md">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Транспорт"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">Zentorno</h3>
                  <p className="text-xs text-muted-foreground">Суперкар с отличными характеристиками</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-accent transition-colors p-2 rounded-md">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Транспорт"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">Entity XF</h3>
                  <p className="text-xs text-muted-foreground">Быстрый и маневренный суперкар</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-accent transition-colors p-2 rounded-md">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Транспорт"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">T20</h3>
                  <p className="text-xs text-muted-foreground">Премиум суперкар с высокой скоростью</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Советы</h2>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm">Для максимальной скорости установите турбо-наддув и улучшите двигатель.</p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm">Этот автомобиль лучше всего подходит для гонок на прямых трассах.</p>
              </div>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm">Будьте осторожны на поворотах на высокой скорости - автомобиль может занести.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

