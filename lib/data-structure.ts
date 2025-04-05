// Структура данных для проектов и их разделов

// Типы для транспорта
export interface Vehicle {
  id: string
  name: string
  type: string
  description: string
  image: string
  price: number
  speed: number
  capacity: number
  fuelConsumption: number
  available: boolean
}

// Типы для недвижимости
export interface RealEstate {
  id: string
  name: string
  type: string
  description: string
  image: string
  price: number
  location: string
  rooms: number
  garage: boolean
  interior: string
}

// Типы для бизнесов
export interface Business {
  id: string
  name: string
  type: string
  description: string
  image: string
  price: number
  income: number
  employees: number
  location: string
}

// Типы для работ
export interface Job {
  id: string
  name: string
  description: string
  image: string
  salary: number
  requirements: string[]
  schedule: string
  location: string
}

// Типы для фракций
export interface Faction {
  id: string
  name: string
  type: string
  description: string
  image: string
  leader: string
  members: number
  requirements: string[]
  location: string
}

// Типы для гайдов
export interface Guide {
  id: string
  title: string
  description: string
  image: string
  content: string
  author: string
  date: string
  category: string
}

// Типы для новостей
export interface News {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  project: string
  author: string
}

// Типы для проектов
export interface Project {
  id: string
  name: string
  description: string
  logo: string
  banner: string
  game: string
  players: number
  servers: number
  founded: string
  website: string
  discord: string
  features: string[]
  categories: ProjectCategory[]
}

export interface ProjectCategory {
  title: string
  icon: string
  href: string
}

// Типы для серверов
export interface Server {
  id: string
  name: string
  project: string
  gameType: "samp" | "crmp" | "gta5" | "mta"
  online: number
  capacity: number
  ip: string
  port: string
  website: string
  discord: string
}

// Типы для пользователей
export interface User {
  id: string
  username: string
  email: string
  avatar: string
  age: number
  project: string
  discord: string
  role: "user" | "admin" | "moderator"
  registeredAt: string
  lastLogin: string
}

