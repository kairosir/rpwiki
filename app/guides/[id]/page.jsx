"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { AdBanner } from "@/components/ad-banner"
import { Button } from "@/components/ui/button"
import { LikeDislikeButtons } from "@/components/like-dislike-buttons"
import { ArrowLeft, Calendar, User, Clock, BookOpen, Share2 } from "lucide-react"

export default function GuidePage() {
  const { id } = useParams()
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setTimeout(() => {
      // Имитация загрузки данных гайда
      const guideData = {
        "what-is-rp": {
          id: "what-is-rp",
          title: "Что такое RP и как начать?",
          author: "RPMaster",
          date: "2023-05-15",
          readTime: "8 мин",
          category: "Для новичков",
          content: `
            <h2>Что такое RP?</h2>
            <p>Ролевая игра (RP) - это особый жанр игры, где вы отыгрываете роль персонажа в виртуальном мире, следуя определенным правилам и взаимодействуя с другими игроками. В отличие от обычных игр, здесь главное не победа или достижение игровых целей, а сам процесс отыгрыша роли и взаимодействие с другими игроками.</p>
            
            <p>В RP проектах GTA вы создаете своего персонажа, придумываете ему биографию, характер, привычки и начинаете "жить" его жизнью в виртуальном городе. Вы можете устроиться на работу, купить дом, открыть бизнес, вступить в организацию или создать свою - возможности практически безграничны.</p>
            
            <h2>Основные принципы RP</h2>
            <ul>
              <li><strong>IC (In Character)</strong> - действия и слова вашего персонажа в игре</li>
              <li><strong>OOC (Out of Character)</strong> - общение между игроками вне роли</li>
              <li><strong>Реалистичность</strong> - ваши действия должны быть логичными и соответствовать реальному миру</li>
              <li><strong>Отыгрыш</strong> - вы должны действовать от лица вашего персонажа, а не от себя</li>
              <li><strong>Уважение к другим игрокам</strong> - основа комфортной игры для всех</li>
            </ul>
            
            <h2>Как начать играть в RP?</h2>
            <ol>
              <li>
                <h3>Выберите проект</h3>
                <p>Существует множество RP проектов с разными правилами, механиками и атмосферой. Изучите несколько и выберите тот, который вам больше нравится.</p>
                <img src="/placeholder.svg?height=300&width=600" alt="Выбор проекта" className="rounded-lg my-4" />
              </li>
              <li>
                <h3>Установите необходимые моды</h3>
                <p>Каждый проект требует установки определенных модификаций. Обычно на официальном сайте проекта есть подробная инструкция по установке.</p>
              </li>
              <li>
                <h3>Создайте персонажа</h3>
                <p>Придумайте имя, внешность и биографию вашего персонажа. Чем детальнее вы продумаете его характер и историю, тем интереснее будет играть.</p>
                <img src="/placeholder.svg?height=300&width=600" alt="Создание персонажа" className="rounded-lg my-4" />
              </li>
              <li>
                <h3>Изучите правила</h3>
                <p>Каждый RP проект имеет свой свод правил, которые необходимо соблюдать. Внимательно изучите их, чтобы избежать нарушений и наказаний.</p>
              </li>
              <li>
                <h3>Начните с простого</h3>
                <p>Не пытайтесь сразу стать криминальным авторитетом или мэром города. Начните с простых работ, познакомьтесь с игроками, изучите город и механики игры.</p>
                <img src="/placeholder.svg?height=300&width=600" alt="Первые шаги в игре" className="rounded-lg my-4" />
              </li>
            </ol>
            
            <h2>Частые ошибки новичков</h2>
            <ul>
              <li><strong>PowerGaming</strong> - принуждение других игроков к определенным действиям без их согласия</li>
              <li><strong>MetaGaming</strong> - использование информации, которую ваш персонаж не мог знать</li>
              <li><strong>RDM (Random DeathMatch)</strong> - убийство других игроков без причины</li>
              <li><strong>VDM (Vehicle DeathMatch)</strong> - намеренное убийство игроков с помощью транспорта</li>
              <li><strong>Нереалистичные действия</strong> - прыжки с высоких зданий без последствий, игнорирование ранений и т.д.</li>
            </ul>
            
            <h2>Заключение</h2>
            <p>RP - это уникальный игровой опыт, который может принести много удовольствия и новых знакомств. Главное - быть терпеливым, уважать других игроков и не бояться ошибаться. Удачи в вашем ролевом приключении!</p>
          `,
          relatedGuides: [
            { id: "rp-terms", title: "Основные термины и сленг" },
            { id: "server-registration", title: "Как зарегистрироваться на сервере" },
            { id: "beginner-jobs", title: "Способы заработка для новичков" },
          ],
        },
        // Другие гайды...
      }

      setGuide(guideData[id] || null)
      setLoading(false)
    }, 800)
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Гайд не найден</h1>
        <Button asChild>
          <Link href="/guides">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к списку гайдов
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Навигация */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/guides" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Вернуться к списку гайдов
            </Link>
          </Button>
        </div>

        {/* Заголовок и мета-информация */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{guide.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(guide.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{guide.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{guide.category}</span>
            </div>
          </div>
        </div>

        {/* Рекламный баннер */}
        <AdBanner
          id="guide-top-banner"
          position="header"
          imageUrl="/placeholder.svg?height=90&width=728"
          targetUrl="https://example.com/ad-guide"
          altText="Реклама игровых товаров"
          backgroundColor="#f5f5f5"
        />

        {/* Содержимое гайда */}
        <div className="mt-8 prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>

        {/* Лайки и шаринг */}
        <div className="mt-8 flex justify-between items-center">
          <LikeDislikeButtons id={`guide-${guide.id}`} type="guide" />
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Поделиться
          </Button>
        </div>

        {/* Связанные гайды */}
        {guide.relatedGuides && guide.relatedGuides.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Похожие гайды</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.id}
                  href={`/guides/${relatedGuide.id}`}
                  className="bg-card p-4 rounded-lg hover:bg-accent transition-colors"
                >
                  {relatedGuide.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

