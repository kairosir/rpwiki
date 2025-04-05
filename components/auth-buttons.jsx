"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, LogOut, User, Settings, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function AuthButtons() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      // Используем метод из контекста аутентификации
      const { success, error } = await signOut()

      if (!success) throw error || new Error("Не удалось выйти из системы")

      toast({
        title: "Выход выполнен успешно",
        description: "Вы вышли из своего аккаунта",
      })

      router.push("/")
      router.refresh() // Обновляем страницу для применения изменений
    } catch (error) {
      console.error("Ошибка при выходе:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из аккаунта",
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2"></span>
        Загрузка...
      </Button>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.user_metadata?.avatar_url || "/placeholder.svg?height=32&width=32"}
                alt={user.user_metadata?.username || "Пользователь"}
              />
              <AvatarFallback>{(user.user_metadata?.username || "User").substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">{user.user_metadata?.username || "Пользователь"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.user_metadata?.username || "Пользователь"}</p>
              <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Личный кабинет</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/liked" className="flex items-center gap-2 cursor-pointer">
              <Heart className="h-4 w-4" />
              <span>Понравившиеся</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/settings" className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Настройки</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-destructive border-t-transparent mr-2"></span>
                <span>Выход...</span>
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Выйти</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/login">
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <LogIn className="h-4 w-4" />
          <span>Войти</span>
        </Button>
      </Link>
      <Link href="/auth/register" className="hidden md:block">
        <Button size="sm">Регистрация</Button>
      </Link>
    </div>
  )
}

