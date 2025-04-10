'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { 
  Users, FileText, Settings, LogOut, 
  LayoutDashboard, Image, Menu, X 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Дашборд' },
  { href: '/admin/content', icon: FileText, label: 'Контент' },
  { href: '/admin/users', icon: Users, label: 'Пользователи' },
  { href: '/admin/ads', icon: Image, label: 'Реклама' },
  { href: '/admin/settings', icon: Settings, label: 'Настройки' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
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
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 