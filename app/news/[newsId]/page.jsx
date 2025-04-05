"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Share2, MessageSquare, ThumbsUp } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"

export default function NewsDetailPage() {
  const { newsId } = useParams()
  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      const newsData = {
        1: {
          id: 1,
          title: "Крупное обновление Majestic RP: новые бизнесы и механики",
          excerpt:
            "Разработчики Majestic RP выпустили масштабное обновление, добавляющее 5 новых типов бизнесов и улучшающее экономические механики.",
          content: `
            <p>Команда разработчиков Majestic RP анонсировала и выпустила крупное обновление, которое значительно расширяет возможности игроков в сфере бизнеса и экономики.</p>
            
            <h2>Новые типы бизнесов</h2>
            
            <p>В игру добавлены следующие типы бизнесов:</p>
            
            <ul>
              <li><strong>Автомастерская премиум-класса</strong> - возможность тюнинговать элитные автомобили с эксклюзивными опциями</li>
              <li><strong>Агентство недвижимости</strong> - помощь игрокам в покупке и продаже недвижимости за комиссию</li>
              <li><strong>Рекламное агентство</strong> - создание и размещение рекламы для других бизнесов</li>
              <li><strong>Охранное агентство</strong> - предоставление услуг охраны для бизнесов и частных лиц</li>
              <li><strong>Юридическая фирма</strong> - оказание юридических услуг, представительство в суде</li>
            </ul>
            
            <h2>Улучшения экономики</h2>
            
            <p>Помимо новых бизнесов, разработчики внесли следующие изменения в экономическую систему:</p>
            
            <ul>
              <li>Переработана система налогообложения с прогрессивной шкалой</li>
              <li>Добавлена возможность брать кредиты в банке под разные проценты в зависимости от кредитной истории</li>
              <li>Внедрена система экономических кризисов и подъемов, влияющих на цены и спрос</li>
              <li>Добавлена фондовая биржа с акциями компаний</li>
            </ul>
            
            <p>Обновление уже доступно на всех серверах Majestic RP. Разработчики обещают в ближайшее время выпустить подробные гайды по новым механикам.</p>
          `,
          date: "2023-03-25",
          image: "/placeholder.svg?height=400&width=800",
          project: "Majestic RP",
          author: "Admin",
          views: 1245,
          likes: 87,
          comments: 32,
        },
        2: {
          id: 2,
          title: "Diamond RP отмечает 10-летие: специальные события и подарки",
          excerpt:
            "Легендарному проекту Diamond RP исполнилось 10 лет. Администрация подготовила серию мероприятий и подарки для игроков.",
          content: `
            <p>Один из старейших и наиболее популярных RP-проектов в СНГ - Diamond RP - отмечает свое 10-летие. В честь этого знаменательного события администрация подготовила масштабную программу празднования.</p>
            
            <h2>История проекта</h2>
            
            <p>Diamond RP был основан в 2013 году и за 10 лет прошел огромный путь от небольшого сервера до целой сети серверов с тысячами игроков. Проект пережил множество обновлений, смену движков и постоянно развивался, сохраняя при этом свою уникальную атмосферу.</p>
            
            <h2>Праздничные мероприятия</h2>
            
            <p>В честь юбилея на всех серверах Diamond RP будут проводиться следующие мероприятия:</p>
            
            <ul>
              <li>Исторический тур по знаковым местам сервера с рассказом об их эволюции</li>
              <li>Встреча с ветеранами проекта и администрацией</li>
              <li>Турнир по гонкам с призовым фондом в 10 миллионов игровых долларов</li>
              <li>Конкурс историй от игроков "Моя жизнь на Diamond RP"</li>
              <li>Праздничный концерт с выступлением известных стримеров</li>
            </ul>
            
            <h2>Подарки для игроков</h2>
            
            <p>Каждый игрок, зашедший на сервер в течение праздничной недели, получит:</p>
            
            <ul>
              <li>Юбилейный автомобиль с уникальной раскраской</li>
              <li>Памятную медаль "10 лет Diamond RP"</li>
              <li>VIP-статус на 10 дней</li>
              <li>10,000 игровых долларов</li>
            </ul>
            
            <p>Празднование продлится с 1 по 10 апреля. Не пропустите это историческое событие!</p>
          `,
          date: "2023-03-20",
          image: "/placeholder.svg?height=400&width=800",
          project: "Diamond RP",
          author: "Admin",
          views: 982,
          likes: 76,
          comments: 45,
        },
      }

      const relatedNewsData = [
        {
          id: 3,
          title: "Eclipse RP запускает новый сервер для новичков",
          excerpt:
            "Проект Eclipse RP открыл специальный сервер для новых игроков с упрощенными правилами и наставниками.",
          date: "2023-03-15",
          image: "/placeholder.svg?height=200&width=300",
          project: "Eclipse RP",
        },
        {
          id: 4,
          title: "Advance RP представляет новую систему криминала",
          excerpt:
            "Разработчики Advance RP полностью переработали систему криминала, добавив новые механики и возможности.",
          date: "2023-03-10",
          image: "/placeholder.svg?height=200&width=300",
          project: "Advance RP",
        },
        {
          id: 5,
          title: "Majestic RP проводит турнир по гонкам с призовым фондом $1,000,000",
          excerpt: "Крупнейший турнир по гонкам на Majestic RP с рекордным призовым фондом в миллион игровых долларов.",
          date: "2023-03-05",
          image: "/placeholder.svg?height=200&width=300",
          project: "Majestic RP",
        },
      ]

      setNews(newsData[newsId] || null)
      setRelatedNews(relatedNewsData)
      setLoading(false)
    }, 500)
  }, [newsId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/news" className="flex items-center text-primary mb-4 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к новостям
        </Link>
        <h1 className="text-3xl font-bold mb-8">Новость не найдена</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/news" className="flex items-center text-primary mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Назад к новостям
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg overflow-hidden shadow-md">
            <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-80 object-cover" />

            <div className="p-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">{news.project}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(news.date).toLocaleDateString()}
                </div>
                <span className="mx-2">•</span>
                <span>Автор: {news.author}</span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{news.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{news.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Просмотры: {news.views}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />

              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <Button variant="outline" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Нравится</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Поделиться</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Комментарии */}
          <div className="mt-8 bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Комментарии ({news.comments})</h2>
            <p className="text-muted-foreground">Войдите, чтобы оставить комментарий</p>
          </div>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Рекламный баннер */}
          <AdBanner
            id={`news-${newsId}-sidebar-banner`}
            position="sidebar"
            imageUrl="/placeholder.svg?height=250&width=300"
            targetUrl="https://example.com/ad-news-detail"
            altText="Реклама игрового сервера"
          />

          {/* Похожие новости */}
          <div className="bg-card rounded-lg p-5 shadow-sm">
            <h3 className="font-bold mb-4">Похожие новости</h3>
            <div className="space-y-4">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-start gap-3 hover:bg-accent transition-colors rounded-md p-2"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.project}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

