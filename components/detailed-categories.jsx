"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

const categories = [
  {
    emoji: "🛠️",
    title: "Подготовка",
    description: "Перед началом игры",
    items: [
      { title: "Установка игры", href: "/post/ustanovka-igry" },
      { title: "Дополнительное ПО", href: "/post/dopolnitelnoe-po" },
      { title: "Серверы GTA 5 RP", href: "/post/servery-gta-5-rp" },
      { title: "Системные требования", href: "/post/sistemnye-trebovaniya" },
      { title: "Устранение проблем", href: "/post/ustranenie-problem" },
    ],
  },
  {
    emoji: "👶🏻",
    title: "Начало игры",
    description: "Полезно для новичков",
    items: [
      { title: "Первые шаги", href: "/post/pervye-shagi" },
      { title: "Начальные квесты", href: "/post/nachalnye-kvesty" },
      { title: "Взаимодействие", href: "/post/vzaimodejstvie" },
      { title: "Базовые управление", href: "/post/bazovoe-upravlenie" },
      { title: "Создание персонажа", href: "/post/sozdanie-personazha" },
    ],
  },
  {
    emoji: "🎮",
    title: "Основы игры",
    description: "Основной контент на проекте",
    items: [
      { title: "Мастерская", href: "/post/masterskaya" },
      { title: "Тайники", href: "/post/tajniki" },
      { title: "Университет", href: "/post/universitet" },
      { title: "Телефон", href: "/post/telefon" },
      { title: "Инвентарь", href: "/post/inventar" },
    ],
  },
  {
    emoji: "💼",
    title: "Работы",
    description: "Варианты заработать денег",
    items: [
      { title: "Грибник", href: "/post/gribnik" },
      { title: "Мусорщик", href: "/post/musorshik" },
      { title: "Инкассатор", href: "/post/inkassator" },
      { title: "Таксист", href: "/post/taksist" },
      { title: "Доставка", href: "/post/dostavka" },
    ],
  },
  {
    emoji: "💵",
    title: "Бизнесы",
    description: "Как заработать миллион",
    items: [
      { title: "Информация", href: "/post/vse-o-biznesah" },
      { title: "Автомойка", href: "/post/avtomojka" },
      { title: "Тату-салон", href: "/post/tatu-salon" },
      { title: "Заправка", href: "/post/zapravka" },
      { title: "Ресторан", href: "/post/restoran" },
    ],
  },
  {
    emoji: "🏠",
    title: "Недвижимость",
    description: "Все о домах и больше",
    items: [
      { title: "Информация", href: "/post/vse-o-nedvizhimosti" },
      { title: "Квартиры", href: "/post/kvartiry" },
      { title: "Дома", href: "/post/doma" },
      { title: "Гаражи", href: "/post/garazhi" },
      { title: "Склады", href: "/post/sklady" },
    ],
  },
  {
    emoji: "👮🏻‍♂️",
    title: "Гос",
    description: "Все о государственной службе",
    items: [
      { title: "Общая информация", href: "/post/obshaya-informaciya" },
      { title: "Поставки материалов", href: "/post/postavki-materialov" },
      { title: "Система видеонаблюдения", href: "/post/sistema-videonablyudeniya" },
      { title: "Полиция", href: "/post/policiya" },
      { title: "Скорая помощь", href: "/post/skoraya-pomosh" },
    ],
  },
  {
    emoji: "🏴‍☠️",
    title: "Крайм",
    description: "Все о криминальном мире",
    items: [
      { title: "Банды", href: "/post/bandy" },
      { title: "Угон авто", href: "/post/ugon-avto" },
      { title: "Выращивание Green", href: "/post/vyrashivanie-green" },
      { title: "Ограбления", href: "/post/ogrableniya" },
      { title: "Черный рынок", href: "/post/chernyj-rynok" },
    ],
  },
]

export function DetailedCategories() {
  const [expandedCategories, setExpandedCategories] = useState({})

  const toggleCategory = (title) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div key={category.title} className="bg-card rounded-lg overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="text-2xl">{category.emoji}</div>
            <div>
              <h3 className="font-bold">{category.title}</h3>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="space-y-2">
              {category.items.slice(0, 3).map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm hover:text-primary transition-colors">
                  {item.title}
                </Link>
              ))}
              {category.items.length > 3 && (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="text-sm text-primary flex items-center gap-1"
                >
                  {expandedCategories[category.title] ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Свернуть список
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Развернуть список
                    </>
                  )}
                </button>
              )}
              {expandedCategories[category.title] && (
                <div className="space-y-2 pt-2">
                  {category.items.slice(3).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

