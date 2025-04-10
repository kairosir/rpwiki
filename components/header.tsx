'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth-provider'
import { signOut } from 'next-auth/react'

export default function Header() {
  const pathname = usePathname()
  const { isAuthenticated, user, isLoading } = useAuth()

  const isActive = (path: string) => pathname === path

  const menuItems = [
    { href: '/monitoring', label: 'Мониторинг' },
    { href: '/guides', label: 'Гайды' },
    { href: '/news', label: 'Новости' },
    { href: '/community', label: 'Сообщество' },
    { href: '/support', label: 'Поддержка' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">RP Вики Портал</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? 'text-foreground' : 'text-foreground/60 hover:text-foreground/80'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  {user?.role && ['admin', 'moderator'].includes(user.role) && (
                    <Button variant="outline" asChild>
                      <Link href="/admin">
                        Админ-панель
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => signOut()}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Button variant="default" asChild>
                  <Link href="/auth/signin">
                    Войти
                  </Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
} 