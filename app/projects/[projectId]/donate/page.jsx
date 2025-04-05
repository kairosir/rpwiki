"use client"

import Link from "next/link"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdBanner } from "@/components/ad-banner"
import { LikeDislikeButtons } from "@/components/like-dislike-buttons"
import { DetailButton } from "@/components/detail-button"
import { CreditCard, Wallet, Gift, ChevronsRight, Heart } from "lucide-react"

export default function DonatePage() {
  const { projectId } = useParams()
  const [activeTab, setActiveTab] = useState("packages")
  const [amount, setAmount] = useState("")

  const donatePackages = [
    {
      id: 1,
      name: "Стартовый набор",
      price: 299,
      description: "Базовый набор для начинающих игроков",
      benefits: ["100,000 игровой валюты", "VIP статус на 3 дня", "Уникальный предмет"],
      popular: false,
    },
    {
      id: 2,
      name: "Продвинутый набор",
      price: 599,
      description: "Оптимальный выбор для активных игроков",
      benefits: ["300,000 игровой валюты", "VIP статус на 7 дней", "Уникальный транспорт", "Скидка 5% на все покупки"],
      popular: true,
    },
    {
      id: 3,
      name: "Премиум набор",
      price: 999,
      description: "Максимальные преимущества для настоящих ценителей",
      benefits: [
        "1,000,000 игровой валюты",
        "VIP статус на 30 дней",
        "Эксклюзивный транспорт",
        "Уникальная недвижимость",
        "Скидка 10% на все покупки",
      ],
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Донат - {projectId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </h1>
      <p className="text-muted-foreground mb-8">
        Поддержите проект и получите уникальные преимущества в игре. Все средства идут на развитие и улучшение серверов.
      </p>

      {/* Рекламный баннер */}
      <AdBanner
        id="donate-top-banner"
        position="header"
        imageUrl="/placeholder.svg?height=90&width=728"
        targetUrl="https://example.com/ad-donate"
        altText="Реклама игровых товаров"
        backgroundColor="#f5f5f5"
      />

      {/* Табы для выбора типа доната */}
      <div className="my-6">
        <Tabs defaultValue="packages" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row gap-2">
            <TabsTrigger value="packages">Наборы</TabsTrigger>
            <TabsTrigger value="currency">Валюта</TabsTrigger>
            <TabsTrigger value="custom">Произвольная сумма</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Контент в зависимости от выбранного таба */}
      <div className="mt-6">
        {activeTab === "packages" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donatePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-card rounded-lg overflow-hidden shadow-md border ${
                  pkg.popular ? "border-primary" : "border-transparent"
                }`}
              >
                {pkg.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Популярный выбор
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="text-2xl font-bold mb-4">{pkg.price} ₽</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Heart className="h-4 w-4 text-primary mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Приобрести</Button>
                </div>
                <div className="px-6 py-3 bg-muted flex justify-between items-center">
                  <LikeDislikeButtons id={`donate-package-${pkg.id}`} type="donate-package" />
                  <DetailButton href={`/projects/${projectId}/donate/${pkg.id}`} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "currency" && (
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Покупка игровой валюты</h2>
            <p className="text-muted-foreground mb-6">
              Приобретите игровую валюту для быстрого старта или развития вашего персонажа
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Button variant="outline" onClick={() => setAmount("100")}>
                100,000 $ - 199 ₽
              </Button>
              <Button variant="outline" onClick={() => setAmount("300")}>
                300,000 $ - 499 ₽
              </Button>
              <Button variant="outline" onClick={() => setAmount("500")}>
                500,000 $ - 799 ₽
              </Button>
              <Button variant="outline" onClick={() => setAmount("1000")}>
                1,000,000 $ - 1499 ₽
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
              <div className="w-full md:w-1/2">
                <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
                  Или введите свою сумму (в тысячах $)
                </label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Например: 250"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <Button className="w-full md:w-auto">Купить валюту</Button>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">Курс обмена:</h3>
              <p className="text-sm text-muted-foreground">1,000 $ = 2 ₽</p>
              <p className="text-sm text-muted-foreground">Минимальная сумма покупки: 50,000 $</p>
            </div>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Произвольное пожертвование</h2>
            <p className="text-muted-foreground mb-6">
              Поддержите проект любой суммой. Все средства пойдут на развитие серверов и улучшение игрового опыта.
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
              <div className="w-full md:w-1/2">
                <label htmlFor="donation-amount" className="block text-sm font-medium mb-2">
                  Сумма пожертвования (₽)
                </label>
                <Input
                  id="donation-amount"
                  type="number"
                  placeholder="Например: 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <Button className="w-full md:w-auto">Пожертвовать</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-md flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Банковская карта</h3>
                  <p className="text-sm text-muted-foreground">Visa, MasterCard, МИР</p>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-md flex items-start gap-3">
                <Wallet className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Электронные кошельки</h3>
                  <p className="text-sm text-muted-foreground">ЮMoney, QIWI, WebMoney</p>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-md flex items-start gap-3">
                <Gift className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Бонусы</h3>
                  <p className="text-sm text-muted-foreground">За каждые 1000 ₽ - особый подарок</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Информация о донате */}
      <div className="mt-12 bg-card rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Информация о донате</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Все средства, полученные от пожертвований, направляются на развитие проекта, улучшение серверной
            инфраструктуры и создание нового контента.
          </p>
          <p>
            Приобретая донат-услуги, вы получаете преимущества в игре, которые помогут вам быстрее развиваться и
            наслаждаться игровым процессом.
          </p>
          <p>
            Мы ценим каждого игрока и стремимся сделать игровой опыт максимально комфортным и увлекательным. Спасибо за
            вашу поддержку!
          </p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <LikeDislikeButtons id="donate-page" type="page" />
          <Button variant="outline" asChild>
            <Link href={`/projects/${projectId}/donate/faq`}>
              Часто задаваемые вопросы
              <ChevronsRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

