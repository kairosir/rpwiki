"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { LikedPosts } from "@/components/liked-posts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LikedPostsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Назад в личный кабинет</span>
          </Link>
        </Button>
      </div>

      <Alert className="mb-6">
        <AlertTitle>Информация о таблице голосов</AlertTitle>
        <AlertDescription>
          Для полной функциональности лайков и дизлайков необходимо создать таблицу votes в базе данных Supabase.
          Используйте SQL-скрипт из файла <code>supabase/migrations/create_votes_table.sql</code> для создания таблицы.
        </AlertDescription>
      </Alert>

      <LikedPosts />
    </div>
  )
}

