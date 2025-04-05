import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthButtons } from "@/components/auth-buttons"

export default function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-primary">
              RP Вики Портал
            </Link>

            <nav className="hidden md:flex items-center gap-6 ml-6">
              <Link href="/monitoring" className="text-sm hover:text-primary transition-colors">
                Мониторинг
              </Link>
              <Link href="/guides" className="text-sm hover:text-primary transition-colors">
                Гайды
              </Link>
              <Link href="/news" className="text-sm hover:text-primary transition-colors">
                Новости
              </Link>
              <Link href="/community" className="text-sm hover:text-primary transition-colors">
                Сообщество
              </Link>
              <Link href="/support" className="text-sm hover:text-primary transition-colors">
                Поддержка пупсиков
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <AuthButtons />

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

