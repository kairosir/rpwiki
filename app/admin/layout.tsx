'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, Database, FileText, Settings, LogOut, 
  LayoutDashboard, Image, Menu, X, BarChart 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверка авторизации
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        const data = await response.json()

        if (!data.authenticated) {
          router.push('/auth/login')
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        toast({
          title: 'Ошибка',
          description: 'Не удалось проверить авторизацию',
          variant: 'destructive'
        })
      }
    }

    checkAuth()
  }, [router, toast])

  const isActive = (path: string) => pathname === path

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/auth/login')
    } catch (error) {
      console.error('Error logging out:', error)
      toast({
        title: 'Ошибка',
        description: 'Не удалось выйти из системы',
        variant: 'destructive'
      })
    }
  }

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Дашборд' },
    { href: '/admin/content', icon: FileText, label: 'Контент' },
    { href: '/admin/users', icon: Users, label: 'Пользователи' },
    { href: '/admin/ads', icon: Image, label: 'Реклама' },
    { href: '/admin/analytics', icon: BarChart, label: 'Аналитика' },
    { href: '/admin/settings', icon: Settings, label: 'Настройки' },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Мобильная кнопка меню */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Боковое меню */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-card border-r z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">Админ-панель</h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-2 p-2 rounded-md ${
                    isActive(item.href) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-4 border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 min-h-screen">
        <div className="container mx-auto p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
} 