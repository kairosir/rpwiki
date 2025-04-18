// Основная информация о проектах
const projects = {
  "majestic-rp": {
    name: "Majestic RP",
    logo: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=300&width=1200",
    description:
      "Популярный ролевой проект в GTA 5 с реалистичной экономикой и уникальными механиками. Проект предлагает глубокий ролевой опыт с проработанной экономикой, разнообразными профессиями и возможностями для бизнеса.",
    game: "GTA 5",
    players: 15937,
    servers: 14,
    founded: "2018",
    website: "https://example.com",
    discord: "https://discord.gg/example",
    categories: [
      { title: "Карта", icon: "Map", href: `/projects/majestic-rp/map` },
      { title: "Транспорт", icon: "Car", href: `/projects/majestic-rp/vehicles` },
      { title: "Недвижимость", icon: "Home", href: `/projects/majestic-rp/realty` },
      { title: "Бизнесы", icon: "DollarSign", href: `/projects/majestic-rp/biz` },
      { title: "Одежда", icon: "Shirt", href: `/projects/majestic-rp/clothes` },
      { title: "Скины", icon: "Sparkles", href: `/projects/majestic-rp/skins` },
      { title: "Предметы", icon: "Package", href: `/projects/majestic-rp/items` },
      { title: "Работы", icon: "Briefcase", href: `/projects/majestic-rp/jobs` },
      { title: "Фракции", icon: "Users", href: `/projects/majestic-rp/factions` },
      { title: "Гайды", icon: "BookOpen", href: `/projects/majestic-rp/guides` },
      { title: "Донат", icon: "Heart", href: `/projects/majestic-rp/donate` },
    ],
    features: [
      "Реалистичная экономика",
      "Уникальные механики",
      "Проработанные фракции",
      "Разнообразные бизнесы",
      "Активное сообщество",
      "Регулярные обновления",
    ],
  },
  "diamond-rp": {
    name: "Diamond RP",
    logo: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=300&width=1200",
    description:
      "Классический ролевой проект в GTA San Andreas с многолетней историей и стабильным комьюнити. Один из старейших и наиболее уважаемых проектов в СНГ с богатой историей и традициями.",
    game: "GTA SA:MP",
    players: 8245,
    servers: 8,
    founded: "2011",
    website: "https://example.com",
    discord: "https://discord.gg/example",
    categories: [
      { title: "Карта", icon: "Map", href: `/projects/diamond-rp/map` },
      { title: "Транспорт", icon: "Car", href: `/projects/diamond-rp/vehicles` },
      { title: "Недвижимость", icon: "Home", href: `/projects/diamond-rp/realty` },
      { title: "Бизнесы", icon: "DollarSign", href: `/projects/diamond-rp/biz` },
      { title: "Скины", icon: "Sparkles", href: `/projects/diamond-rp/skins` },
      { title: "Предметы", icon: "Package", href: `/projects/diamond-rp/items` },
      { title: "Работы", icon: "Briefcase", href: `/projects/diamond-rp/jobs` },
      { title: "Фракции", icon: "Users", href: `/projects/diamond-rp/factions` },
      { title: "Гайды", icon: "BookOpen", href: `/projects/diamond-rp/guides` },
      { title: "Донат", icon: "Heart", href: `/projects/diamond-rp/donate` },
    ],
    features: [
      "Проверенная временем стабильность",
      "Классический геймплей",
      "Сильное комьюнити",
      "Разнообразные сервера",
      "Проработанная система фракций",
      "Богатая история",
    ],
  },
  "advance-rp": {
    name: "Advance RP",
    logo: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=300&width=1200",
    description:
      "Продвинутый ролевой проект в GTA San Andreas с глубокой проработкой ролевых механик. Проект известен своим хардкорным подходом к ролевой игре и уникальными игровыми механиками.",
    game: "GTA SA:MP",
    players: 7632,
    servers: 6,
    founded: "2012",
    website: "https://example.com",
    discord: "https://discord.gg/example",
    categories: [
      { title: "Карта", icon: "Map", href: `/projects/advance-rp/map` },
      { title: "Транспорт", icon: "Car", href: `/projects/advance-rp/vehicles` },
      { title: "Недвижимость", icon: "Home", href: `/projects/advance-rp/realty` },
      { title: "Бизнесы", icon: "DollarSign", href: `/projects/advance-rp/biz` },
      { title: "Скины", icon: "Sparkles", href: `/projects/advance-rp/skins` },
      { title: "Предметы", icon: "Package", href: `/projects/advance-rp/items` },
      { title: "Работы", icon: "Briefcase", href: `/projects/advance-rp/jobs` },
      { title: "Фракции", icon: "Users", href: `/projects/advance-rp/factions` },
      { title: "Гайды", icon: "BookOpen", href: `/projects/advance-rp/guides` },
      { title: "Донат", icon: "Heart", href: `/projects/advance-rp/donate` },
    ],
    features: [
      "Хардкорный ролевой геймплей",
      "Сложная экономика",
      "Детализированные механики",
      "Строгие правила RP",
      "Уникальные игровые системы",
      "Активная администрация",
    ],
  },
  "eclipse-rp": {
    name: "Eclipse RP",
    logo: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=300&width=1200",
    description:
      "Современный ролевой проект в GTA 5 с упором на социальное взаимодействие и бизнес. Проект создан для комфортной игры как новичков, так и опытных игроков с акцентом на социальные механики.",
    game: "GTA 5",
    players: 12458,
    servers: 10,
    founded: "2019",
    website: "https://example.com",
    discord: "https://discord.gg/example",
    categories: [
      { title: "Карта", icon: "Map", href: `/projects/eclipse-rp/map` },
      { title: "Транспорт", icon: "Car", href: `/projects/eclipse-rp/vehicles` },
      { title: "Недвижимость", icon: "Home", href: `/projects/eclipse-rp/realty` },
      { title: "Бизнесы", icon: "DollarSign", href: `/projects/eclipse-rp/biz` },
      { title: "Одежда", icon: "Shirt", href: `/projects/eclipse-rp/clothes` },
      { title: "Скины", icon: "Sparkles", href: `/projects/eclipse-rp/skins` },
      { title: "Предметы", icon: "Package", href: `/projects/eclipse-rp/items` },
      { title: "Работы", icon: "Briefcase", href: `/projects/eclipse-rp/jobs` },
      { title: "Фракции", icon: "Users", href: `/projects/eclipse-rp/factions` },
      { title: "Гайды", icon: "BookOpen", href: `/projects/eclipse-rp/guides` },
      { title: "Донат", icon: "Heart", href: `/projects/eclipse-rp/donate` },
    ],
    features: [
      "Дружелюбное сообщество",
      "Упрощенный вход для новичков",
      "Развитая бизнес-система",
      "Социальные механики",
      "Современный интерфейс",
      "Частые мероприятия",
    ],
  },
};

export default projects;