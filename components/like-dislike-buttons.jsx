"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function LikeDislikeButtons({ id, type }) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userVote, setUserVote] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const supabase = createClientComponentClient()

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }

    // Загружаем текущие лайки/дизлайки
    const fetchVotes = async () => {
      try {
        // В реальном приложении здесь был бы запрос к API
        // Имитируем загрузку данных
        const randomLikes = Math.floor(Math.random() * 50)
        const randomDislikes = Math.floor(Math.random() * 10)

        setLikes(randomLikes)
        setDislikes(randomDislikes)

        // Если пользователь авторизован, проверяем его голос
        if (isAuthenticated) {
          const {
            data: { session },
          } = await supabase.auth.getSession()
          if (session) {
            const { data } = await supabase
              .from("votes")
              .select("vote_type")
              .eq("user_id", session.user.id)
              .eq("content_id", id)
              .eq("content_type", type)
              .single()

            if (data) {
              setUserVote(data.vote_type)
            }
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке голосов:", error)
      }
    }

    checkAuth()
    fetchVotes()
  }, [id, type, supabase, isAuthenticated])

  const handleVote = async (voteType) => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      window.location.href = "/auth/login?redirect=" + encodeURIComponent(window.location.pathname)
      return
    }

    setIsLoading(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setIsLoading(false)
        return
      }

      // Если пользователь уже голосовал так же, отменяем голос
      if (userVote === voteType) {
        // Удаляем голос из базы данных
        await supabase
          .from("votes")
          .delete()
          .eq("user_id", session.user.id)
          .eq("content_id", id)
          .eq("content_type", type)

        // Обновляем счетчики
        if (voteType === "like") {
          setLikes(likes - 1)
        } else {
          setDislikes(dislikes - 1)
        }

        setUserVote(null)
      }
      // Если пользователь голосовал иначе, меняем голос
      else if (userVote) {
        // Обновляем голос в базе данных
        await supabase
          .from("votes")
          .update({ vote_type: voteType })
          .eq("user_id", session.user.id)
          .eq("content_id", id)
          .eq("content_type", type)

        // Обновляем счетчики
        if (voteType === "like") {
          setLikes(likes + 1)
          setDislikes(dislikes - 1)
        } else {
          setLikes(likes - 1)
          setDislikes(dislikes + 1)
        }

        setUserVote(voteType)
      }
      // Если пользователь еще не голосовал, добавляем голос
      else {
        // Добавляем голос в базу данных
        await supabase.from("votes").insert({
          user_id: session.user.id,
          content_id: id,
          content_type: type,
          vote_type: voteType,
        })

        // Обновляем счетчики
        if (voteType === "like") {
          setLikes(likes + 1)
        } else {
          setDislikes(dislikes + 1)
        }

        setUserVote(voteType)
      }
    } catch (error) {
      console.error("Ошибка при голосовании:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${userVote === "like" ? "text-green-500" : ""}`}
        onClick={() => handleVote("like")}
        disabled={isLoading}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${userVote === "dislike" ? "text-red-500" : ""}`}
        onClick={() => handleVote("dislike")}
        disabled={isLoading}
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikes}</span>
      </Button>
    </div>
  )
}

