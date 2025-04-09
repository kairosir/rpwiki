'use client'

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthButtons } from "@/components/auth-buttons"
import { MobileMenu } from "@/components/mobile-menu"
import dynamic from 'next/dynamic'

const AnimatedTitle = dynamic(() => import('@/components/animated-title').then(mod => mod.AnimatedTitle), {
  ssr: false,
  loading: () => <span>GTA RP Wiki</span>
})

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <AnimatedTitle />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/monitoring"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Мониторинг
            </Link>
            <Link
              href="/guides"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Гайды
            </Link>
            <Link
              href="/news"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Новости
            </Link>
            <Link
              href="/community"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Сообщество
            </Link>
            <Link
              href="/support"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Поддержка
            </Link>
          </nav>
        </div>
        
        <div className="flex md:hidden">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">GTA RP Wiki</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex-1 md:hidden"></div>
          <nav className="flex items-center">
            <ModeToggle />
            <AuthButtons />
            <div className="md:hidden">
              <MobileMenu 
                trigger={
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

