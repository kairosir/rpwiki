"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Star, MessageCircle, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/ad-banner"

export default function HelpersPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [helpers, setHelpers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      const projectData = {
        "majestic-rp": {
          name: "Majestic RP",
          logo: "/placeholder.svg?height=120&width=120",
          description: "Популярный ролевой проект в GTA 5 с реалистичной экономикой и уникальными механиками.",
        },
        "diamond-rp": {
          name: "Diamond RP",
          logo: "/placeholder.svg?height=120&width=120",
          description: "Классический ролевой проект в GTA San Andreas с многолетней историей и стабильным комьюнити.",
        },
        "advance-rp": {
          name: "Advance RP",
          logo: "/placeholder.svg?height=120&width=120",
          description: "Продвинутый ролевой проект в GTA San Andreas с глубокой проработкой ролевых механик.",
        },
        "eclipse-rp": {
          name: "Eclipse RP",
          logo: "/placeholder.svg?height=120&width=120",
          description: "Современный ролевой проект в GTA 5 с упором на социальное взаимодействие и бизнес.",
        },
      }

      const helpersData = {
        "majestic-rp": [
          {
            id: 1,
            name: "MaxPlay",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.9,
            reviews: 156,
            experience: "3 года",
            discord: "MaxPlay#1234",
            description:
              "Помогу освоиться на сервере, расскажу о механиках и особенностях проекта. Опытный игрок с 3-летним стажем.",
          },
          {
            id: 2,
            name: "RPMaster",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.8,
            reviews: 132,
            experience: "2 года",
            discord: "RPMaster#5678",
            description: "Специализируюсь на бизнесах и экономике сервера. Помогу с выбором и развитием бизнеса.",
          },
          {
            id: 3,
            name: "GamerGirl",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.7,
            reviews: 98,
            experience: "1.5 года",
            discord: "GamerGirl#9012",
            description: "Помогу новичкам с освоением основ RP. Терпеливо объясню все механики и правила сервера.",
          },
        ],
        "diamond-rp": [
          {
            id: 1,
            name: "DiamondPro",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.9,
            reviews: 203,
            experience: "5 лет",
            discord: "DiamondPro#1234",
            description: "Ветеран проекта с 5-летним опытом. Знаю все тонкости и секреты сервера.",
          },
          {
            id: 2,
            name: "SAMPMaster",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.7,
            reviews: 167,
            experience: "4 года",
            discord: "SAMPMaster#5678",
            description: "Специалист по фракциям и государственным организациям. Помогу с карьерным ростом.",
          },
        ],
        "advance-rp": [
          {
            id: 1,
            name: "AdvanceGuru",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.8,
            reviews: 145,
            experience: "3.5 года",
            discord: "AdvanceGuru#1234",
            description: "Эксперт по криминальным организациям и бандам. Помогу с выбором пути в криминальном мире.",
          },
          {
            id: 2,
            name: "RPPro",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.6,
            reviews: 112,
            experience: "2.5 года",
            discord: "RPPro#5678",
            description: "Специалист по отыгрышу ролей. Научу правильно вести себя в RP-ситуациях.",
          },
        ],
        "eclipse-rp": [
          {
            id: 1,
            name: "EclipseMaster",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.9,
            reviews: 178,
            experience: "2 года",
            discord: "EclipseMaster#1234",
            description: "Помогу с освоением всех аспектов проекта. Особенно хорошо разбираюсь в бизнесах и экономике.",
          },
          {
            id: 2,
            name: "GTAExpert",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.7,
            reviews: 134,
            experience: "1.5 года",
            discord: "GTAExpert#5678",
            description: "Специалист по транспорту и гонкам. Научу дрифтить и побеждать в гоночных соревнованиях.",
          },
          {
            id: 3,
            name: "RPNewbie",
            avatar: "/placeholder.svg?height=100&width=100",
            rating: 4.5,
            reviews: 87,
            experience: "1 год",
            discord: "RPNewbie#9012",
            description:
              "Помогу новичкам с первыми шагами на сервере. Недавно сам был новичком, поэтому хорошо понимаю все трудности.",
          },
        ],
      }

      const productsData = {
        "majestic-rp": [
          {
            id: 1,
            name: "Стартовый набор",
            price: 500,
            description: "Базовый набор для новичка: деньги, телефон, базовая одежда",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 2,
            name: "Бизнес-консультация",
            price: 1000,
            description: "Часовая консультация по выбору и развитию бизнеса",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 3,
            name: "VIP-статус на неделю",
            price: 2000,
            description: "Доступ к VIP-возможностям на 7 дней",
            image: "/placeholder.svg?height=200&width=300",
          },
        ],
        "diamond-rp": [
          {
            id: 1,
            name: "Премиум аккаунт",
            price: 1500,
            description: "Премиум аккаунт с дополнительными возможностями на 30 дней",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 2,
            name: "Набор новичка",
            price: 800,
            description: "Базовый набор для начала игры: деньги, телефон, GPS",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 3,
            name: "Обучение фракциям",
            price: 1200,
            description: "Подробное обучение работе во фракциях и государственных организациях",
            image: "/placeholder.svg?height=200&width=300",
          },
        ],
        "advance-rp": [
          {
            id: 1,
            name: "Криминальный стартер",
            price: 1000,
            description: "Набор для начинающего преступника: оружие, маска, инструменты",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 2,
            name: "Курс выживания",
            price: 1500,
            description: "Обучение выживанию в криминальном мире сервера",
            image: "/placeholder.svg?height=200&width=300",
          },
        ],
        "eclipse-rp": [
          {
            id: 1,
            name: "Бизнес-план",
            price: 2000,
            description: "Детальный план развития бизнеса с расчетами и советами",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 2,
            name: "Гоночный набор",
            price: 1800,
            description: "Набор для начинающего гонщика: тюнинг, советы по трассам",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: 3,
            name: "Премиум поддержка",
            price: 3000,
            description: "Персональная поддержка опытного игрока на 30 дней",
            image: "/placeholder.svg?height=200&width=300",
          },
        ],
      }

      setProject(projectData[projectId] || null)
      setHelpers(helpersData[projectId] || [])
      setProducts(productsData[projectId] || [])
      setLoading(false)
    }, 500)
  }, [projectId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div>
        <Link href="/guides" className="flex items-center text-primary mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к гайдам
        </Link>
        <h1 className="text-3xl font-bold mb-8">Проект не найден</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/guides" className="flex items-center text-primary mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к гайдам
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <img src={project.logo || "/placeholder.svg"} alt={`${project.name} лого`} className="w-16 h-16 rounded-md" />
        <div>
          <h1 className="text-3xl font-bold">{project.name} - Помощники</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      {/* Рекламный баннер */}
      <AdBanner
        id={`helpers-${projectId}-banner`}
        position="content"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-helpers"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Список помощников */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Доступные помощники</h2>

          <div className="space-y-4">
            {helpers.map((helper) => (
              <div key={helper.id} className="bg-card rounded-lg p-4 shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    <img src={helper.avatar || "/placeholder.svg"} alt={helper.name} className="w-full rounded-md" />
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{helper.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1">{helper.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({helper.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Опыт: {helper.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span>Discord: {helper.discord}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-3">{helper.description}</p>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Профиль
                      </Button>
                      <Button className="flex-1">Связаться</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Товары и услуги */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Товары и услуги</h2>

          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-md">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{product.name}</h3>
                    <span className="font-bold text-primary">${product.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  <Button className="w-full">Купить</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-card rounded-lg p-4 shadow-md">
            <h3 className="font-bold mb-2">Нужна помощь?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Не нашли подходящего помощника или услугу? Свяжитесь с нами, и мы поможем вам найти то, что нужно.
            </p>
            <Button variant="outline" className="w-full flex items-center justify-center gap-1">
              <span>Связаться с поддержкой</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SupportPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h1>Поддержка</h1>
        <form>
          <label>Ваше сообщение:</label>
          <textarea placeholder="Введите предложение или жалобу"></textarea>
          <button type="submit">Отправить</button>
        </form>
      </div>
      <div>
        <img src="/ads/banner.jpg" alt="Реклама" />
      </div>
    </div>
  );
}

