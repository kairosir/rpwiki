"use client"

import { useState, useEffect } from "react"
import { Frown } from "lucide-react"

export default function CommunityPage() {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "."
        }
        return prevDots + "."
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Frown className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-center">В процессе разработки{dots}</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Мы работаем над созданием этого раздела. Скоро здесь появится много интересного контента о сообществе
          RP-проектов.
        </p>
      </div>
    </div>
  )
}

