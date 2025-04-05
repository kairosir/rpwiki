"use client"

import { useEffect, useState } from "react"
import { ArrowDownRight } from "lucide-react"

export function ServerCounter() {
  const [currentOnline, setCurrentOnline] = useState(15937)
  const [todayPeak, setTodayPeak] = useState(19097)
  const [allTimePeak, setAllTimePeak] = useState(19602)

  // Имитация обновления онлайна
  useEffect(() => {
    const interval = setInterval(() => {
      // Случайное изменение онлайна в пределах ±10
      const change = Math.floor(Math.random() * 20) - 10
      setCurrentOnline((prev) => Math.max(15000, prev + change))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold">{currentOnline}</div>
        <div className="text-sm text-muted-foreground mt-2">текущий онлайн</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <div className="text-5xl font-bold">{todayPeak}</div>
          <ArrowDownRight className="h-6 w-6 text-primary ml-2" />
        </div>
        <div className="text-sm text-muted-foreground mt-2">пик за сегодня</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold">{allTimePeak}</div>
        <div className="text-sm text-muted-foreground mt-2">пик за все время</div>
      </div>
    </div>
  )
}

