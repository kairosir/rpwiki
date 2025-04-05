"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, DollarSign, Clock, MapPin, GraduationCap } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"

export default function JobsPage() {
  const { projectId } = useParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      // Демо-данные для разных проектов
      const projectJobs = {
        "majestic-rp": [
          {
            id: 1,
            name: "Таксист",
            description: "Перевозите пассажиров по городу и зарабатывайте на чаевых",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $500 до $1500 в час",
            requirements: ["Водительские права", "Автомобиль (можно арендовать)"],
            schedule: "Свободный график",
            location: "Таксопарк в центре города",
            difficulty: "Легко",
          },
          {
            id: 2,
            name: "Дальнобойщик",
            description: "Перевозите грузы между городами на дальние расстояния",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $1000 до $3000 за рейс",
            requirements: ["Водительские права категории C", "Опыт вождения"],
            schedule: "Свободный график",
            location: "Логистический центр",
            difficulty: "Средне",
          },
          {
            id: 3,
            name: "Механик",
            description: "Ремонтируйте автомобили и зарабатывайте на запчастях",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $800 до $2000 в час",
            requirements: ["Навыки механика", "Инструменты (можно купить)"],
            schedule: "Свободный график",
            location: "Автомастерская",
            difficulty: "Средне",
          },
          {
            id: 4,
            name: "Полицейский",
            description: "Поддерживайте порядок в городе и ловите преступников",
            image: "/placeholder.svg?height=200&width=300",
            salary: "$2500 в час + премии",
            requirements: ["Чистая биография", "Экзамен на знание законов", "18+ лет"],
            schedule: "Сменный график",
            location: "Полицейский департамент",
            difficulty: "Сложно",
          },
          {
            id: 5,
            name: "Медик",
            description: "Спасайте жизни и оказывайте первую помощь",
            image: "/placeholder.svg?height=200&width=300",
            salary: "$2200 в час + премии",
            requirements: ["Медицинское образование", "Экзамен по медицине", "18+ лет"],
            schedule: "Сменный график",
            location: "Больница",
            difficulty: "Сложно",
          },
        ],
        "diamond-rp": [
          {
            id: 1,
            name: "Курьер",
            description: "Доставляйте посылки и письма по городу",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $300 до $800 в час",
            requirements: ["Нет"],
            schedule: "Свободный график",
            location: "Почтовое отделение",
            difficulty: "Легко",
          },
          {
            id: 2,
            name: "Рыбак",
            description: "Ловите рыбу и продавайте её на рынке",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $500 до $1500 в час",
            requirements: ["Удочка (можно купить)"],
            schedule: "Свободный график",
            location: "Пирс",
            difficulty: "Легко",
          },
          {
            id: 3,
            name: "Инкассатор",
            description: "Перевозите деньги между банками и банкоматами",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $1500 до $3000 в час",
            requirements: ["Лицензия на оружие", "Чистая биография"],
            schedule: "Сменный график",
            location: "Центральный банк",
            difficulty: "Сложно",
          },
        ],
        "advance-rp": [
          {
            id: 1,
            name: "Грузчик",
            description: "Перемещайте грузы на складе",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $200 до $500 в час",
            requirements: ["Нет"],
            schedule: "Свободный график",
            location: "Склад",
            difficulty: "Легко",
          },
          {
            id: 2,
            name: "Фермер",
            description: "Выращивайте и собирайте урожай",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $400 до $1200 в час",
            requirements: ["Нет"],
            schedule: "Свободный график",
            location: "Ферма",
            difficulty: "Средне",
          },
        ],
        "eclipse-rp": [
          {
            id: 1,
            name: "Водитель автобуса",
            description: "Перевозите пассажиров по маршрутам города",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $600 до $1200 в час",
            requirements: ["Водительские права категории D"],
            schedule: "Сменный график",
            location: "Автобусный парк",
            difficulty: "Средне",
          },
          {
            id: 2,
            name: "Уборщик",
            description: "Поддерживайте чистоту на улицах города",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $300 до $600 в час",
            requirements: ["Нет"],
            schedule: "Свободный график",
            location: "Муниципальная служба",
            difficulty: "Легко",
          },
          {
            id: 3,
            name: "Пожарный",
            description: "Тушите пожары и спасайте людей",
            image: "/placeholder.svg?height=200&width=300",
            salary: "$2000 в час + премии",
            requirements: ["Физическая подготовка", "Экзамен", "18+ лет"],
            schedule: "Сменный график",
            location: "Пожарная часть",
            difficulty: "Сложно",
          },
          {
            id: 4,
            name: "Адвокат",
            description: "Защищайте интересы клиентов в суде",
            image: "/placeholder.svg?height=200&width=300",
            salary: "от $3000 до $10000 за дело",
            requirements: ["Юридическое образование", "Лицензия адвоката"],
            schedule: "Свободный график",
            location: "Юридическая фирма",
            difficulty: "Очень сложно",
          },
        ],
      }

      setJobs(projectJobs[projectId] || [])
      setLoading(false)
    }, 500)
  }, [projectId])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Легко":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Средне":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Сложно":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Очень сложно":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div>
        <Link href={`/projects/${projectId}`} className="flex items-center text-primary mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к проекту
        </Link>
        <h1 className="text-3xl font-bold mb-8">Работы не найдены</h1>
      </div>
    )
  }

  return (
    <div>
      <Link href={`/projects/${projectId}`} className="flex items-center text-primary mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к проекту
      </Link>

      <h1 className="text-3xl font-bold mb-2">Работы</h1>
      <p className="text-muted-foreground mb-8">Варианты заработка на сервере</p>

      {/* Рекламный баннер в контенте */}
      <AdBanner
        id={`jobs-content-banner-${projectId}`}
        position="content"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-jobs"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {jobs.map((job) => (
          <div key={job.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img src={job.image || "/placeholder.svg"} alt={job.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 md:w-2/3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{job.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(job.difficulty)}`}>
                    {job.difficulty}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{job.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span>Зарплата: {job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>График: {job.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Локация: {job.location}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs font-medium mb-1">Требования:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs">
                        <GraduationCap className="h-3 w-3 text-primary" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

