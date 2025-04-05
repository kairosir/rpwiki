"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  Database,
  FileText,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Демо-данные
  const [projects, setProjects] = useState([
    { id: 1, name: "Majestic RP", type: "GTA 5 RP", status: "Активен" },
    { id: 2, name: "Diamond RP", type: "GTA SA:MP", status: "Активен" },
    { id: 3, name: "Advance RP", type: "GTA SA:MP", status: "Активен" },
  ])

  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@example.com", role: "Администратор" },
    { id: 2, username: "moderator", email: "mod@example.com", role: "Модератор" },
    { id: 3, username: "user1", email: "user1@example.com", role: "Пользователь" },
    { id: 4, username: "user2", email: "user2@example.com", role: "Пользователь" },
  ])

  const [content, setContent] = useState([
    { id: 1, title: "Транспорт в Majestic RP", project: "Majestic RP", category: "Транспорт", author: "admin" },
    { id: 2, title: "Недвижимость в Majestic RP", project: "Majestic RP", category: "Недвижимость", author: "admin" },
    { id: 3, title: "Бизнесы в Diamond RP", project: "Diamond RP", category: "Бизнесы", author: "moderator" },
    { id: 4, title: "Карта Advance RP", project: "Advance RP", category: "Карта", author: "moderator" },
  ])

  // Фильтрация данных по поисковому запросу
  const filteredData = () => {
    const query = searchQuery.toLowerCase()

    switch (activeTab) {
      case "projects":
        return projects.filter(
          (project) => project.name.toLowerCase().includes(query) || project.type.toLowerCase().includes(query),
        )
      case "users":
        return users.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query),
        )
      case "content":
        return content.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.project.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query),
        )
      default:
        return []
    }
  }

  // Пагинация
  const paginatedData = () => {
    const filtered = filteredData()
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }

  const totalPages = Math.ceil(filteredData().length / itemsPerPage)

  // Обработчики действий
  const handleDelete = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить этот элемент?")) {
      switch (activeTab) {
        case "projects":
          setProjects(projects.filter((project) => project.id !== id))
          break
        case "users":
          setUsers(users.filter((user) => user.id !== id))
          break
        case "content":
          setContent(content.filter((item) => item.id !== id))
          break
      }
    }
  }

  const handleLogout = () => {
    // В реальном приложении здесь был бы запрос к API для выхода
    router.push("/auth/login")
  }

  // Сброс страницы при изменении вкладки или поискового запроса
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Боковое меню */}
      <div className="w-64 bg-card border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Админ-панель</h2>
          <nav className="space-y-1">
            <button
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "projects" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => setActiveTab("projects")}
            >
              <Database className="h-5 w-5" />
              <span>Проекты</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "users" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-5 w-5" />
              <span>Пользователи</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "content" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => setActiveTab("content")}
            >
              <FileText className="h-5 w-5" />
              <span>Контент</span>
            </button>
            <button
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5" />
              <span>Настройки</span>
            </button>
          </nav>
        </div>
        <div className="p-4 border-t mt-auto">
          <button
            className="w-full flex items-center gap-2 p-2 text-destructive hover:bg-destructive/10 rounded-md"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Выйти</span>
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {activeTab === "projects" && "Управление проектами"}
            {activeTab === "users" && "Управление пользователями"}
            {activeTab === "content" && "Управление контентом"}
            {activeTab === "settings" && "Настройки"}
          </h1>

          {activeTab !== "settings" && (
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Добавить
              </Button>
            </div>
          )}
        </div>

        {/* Таблица проектов */}
        {activeTab === "projects" && (
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Название</th>
                  <th className="text-left p-3">Тип</th>
                  <th className="text-left p-3">Статус</th>
                  <th className="text-left p-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map((project) => (
                  <tr key={project.id} className="border-t">
                    <td className="p-3">{project.id}</td>
                    <td className="p-3">{project.name}</td>
                    <td className="p-3">{project.type}</td>
                    <td className="p-3">{project.status}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Пагинация */}
            <div className="flex justify-between items-center p-3 border-t">
              <div className="text-sm text-muted-foreground">
                Показано {paginatedData().length} из {filteredData().length} записей
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Таблица пользователей */}
        {activeTab === "users" && (
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Имя пользователя</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Роль</th>
                  <th className="text-left p-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Пагинация */}
            <div className="flex justify-between items-center p-3 border-t">
              <div className="text-sm text-muted-foreground">
                Показано {paginatedData().length} из {filteredData().length} записей
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Таблица контента */}
        {activeTab === "content" && (
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Заголовок</th>
                  <th className="text-left p-3">Проект</th>
                  <th className="text-left p-3">Категория</th>
                  <th className="text-left p-3">Автор</th>
                  <th className="text-left p-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.project}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.author}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Пагинация */}
            <div className="flex justify-between items-center p-3 border-t">
              <div className="text-sm text-muted-foreground">
                Показано {paginatedData().length} из {filteredData().length} записей
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Настройки */}
        {activeTab === "settings" && (
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Настройки сайта</h2>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="siteName">Название сайта</Label>
                <Input id="siteName" defaultValue="Вики Портал" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Input
                  id="siteDescription"
                  defaultValue="Найдите всю необходимую информацию о наших серверах и игровых функциях"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Контактный email</Label>
                <Input id="contactEmail" type="email" defaultValue="contact@example.com" />
              </div>

              <div className="pt-4">
                <Button>Сохранить настройки</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

