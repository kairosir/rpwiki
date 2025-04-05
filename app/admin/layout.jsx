"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Users, Database, FileText, Settings, LogOut, LayoutDashboard, Image, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return pathname === path
  }

  const handleLogout = () => {
    // В реальном приложении здесь был бы запрос к API для выхода
    router.push("/auth/login")
  }

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Мобильная кнопка меню */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Боковое меню */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-card border-r z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">Админ-панель</h2>
          <nav className="space-y-1">
            <Link
              href="/admin"
              className={`w-full flex items-center gap-2 p-2 rounded-md ${
                isActive("/admin") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Дашборд</span>
            </Link>
            <Link
              href="/admin/projects"
              className={`w-full flex items-center gap-2 p-2 rounded-md ${
                isActive("/admin/projects") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <Database className="h-5 w-5" />
              <span>Проекты</span>
            </Link>
            <Link
              href="/admin/users"
              className={`w-full flex items-center gap-2 p-2 rounded-md ${
                isActive("/admin/users") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Пользователи</span>
            </Link>
            <Link
              href="/admin/content"
              className={`w-full flex items-center gap-2 p-2 rounded-md ${
                isActive("/admin/content") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Контент</span>
            </Link>
            <Link
              href="/admin/ads"
              className={`w-full flex items-center gap-2 p-2 rounded-md ${
                isActive("/admin/ads") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <Image className="h-5 w-5" />
              <span>Реклама</span>
            </Link>
            <Link
              href="/admin/settings"
              className={`w-full flex items-center gap-2 p-2 rounded-md ${
                isActive("/admin/settings") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Настройки</span>
            </Link>
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
      <div className="flex-1 lg:ml-0 pt-16 lg:pt-0">{children}</div>
    </div>
  )
}

