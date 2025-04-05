import Link from "next/link"
import { Search } from "@/components/search"
import { ProjectCards } from "@/components/project-cards"
import { NewsSection } from "@/components/news-section"
import { TopServers } from "@/components/top-servers"
import { BeginnerGuide } from "@/components/beginner-guide"
import { CommunityLeaders } from "@/components/community-leaders"
import { EventsCalendar } from "@/components/events-calendar"
import { UserStories } from "@/components/user-stories"
import { ChatbotHelp } from "@/components/chatbot-help"
import { AdBanner } from "@/components/ad-banner"
import { TextAd } from "@/components/text-ad"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Hero section with search */}
          <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">RP Вики Портал</h1>
            <p className="text-muted-foreground text-lg">
              Ваш путеводитель по миру ролевых игр. Выберите проект и погрузитесь в увлекательный мир RP.
            </p>
            <div className="w-full max-w-md">
              <Search placeholder="Поиск проектов, гайдов, серверов..." />
            </div>
          </div>

          {/* Верхний рекламный баннер */}
          <AdBanner
            id="home-top-banner"
            position="header"
            imageUrl="/placeholder.svg?height=90&width=728"
            targetUrl="https://example.com/ad1"
            altText="Реклама игрового сервера"
          />

          {/* Main project selection */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Выберите проект</h2>
              <Link href="/projects" className="text-primary hover:underline">
                Все проекты
              </Link>
            </div>
            <ProjectCards />
          </div>

          {/* Two column layout for additional content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              {/* News section */}
              <NewsSection />

              {/* Рекламный баннер в контенте */}
              <AdBanner
                id="home-content-banner"
                position="content"
                imageUrl="/placeholder.svg?height=250&width=728"
                targetUrl="https://example.com/ad2"
                altText="Реклама игровых товаров"
              />

              {/* Top servers */}
              <TopServers />

              {/* User stories */}
              <UserStories />
            </div>

            {/* Right column (1/3 width) */}
            <div className="space-y-8">
              {/* Рекламный баннер в сайдбаре */}
              <AdBanner
                id="home-sidebar-banner"
                position="sidebar"
                imageUrl="/placeholder.svg?height=250&width=300"
                targetUrl="https://example.com/ad3"
                altText="Реклама игрового сервера"
              />

              {/* Beginner guide */}
              <BeginnerGuide />

              {/* Текстовая реклама */}
              <TextAd
                id="home-text-ad-1"
                title="Игровой хостинг со скидкой 50%"
                description="Разместите свой сервер на нашем хостинге. Первый месяц со скидкой 50% по промокоду RPWIKI"
                targetUrl="https://example.com/hosting"
                backgroundColor="#f5f5f5"
              />

              {/* Community leaders */}
              <CommunityLeaders />

              {/* Events calendar */}
              <EventsCalendar />

              {/* Еще одна текстовая реклама */}
              <TextAd
                id="home-text-ad-2"
                title="Купить игровую валюту"
                description="Безопасная покупка игровой валюты для всех популярных RP проектов"
                targetUrl="https://example.com/currency"
                backgroundColor="#f0f8ff"
              />

              {/* Chatbot help */}
              <ChatbotHelp />
            </div>
          </div>

          {/* Нижний рекламный баннер */}
          <AdBanner
            id="home-footer-banner"
            position="footer"
            imageUrl="/placeholder.svg?height=90&width=728"
            targetUrl="https://example.com/ad4"
            altText="Реклама игрового сообщества"
          />

          {/* Footer */}
          <footer className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Этот Вики Портал не связан и не одобрен правообладателями игр. Все товарные знаки принадлежат их
              соответствующим владельцам.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

