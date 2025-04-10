'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, FileText, Image as ImageIcon, 
  TrendingUp, Eye, MousePointer 
} from 'lucide-react'

interface Stats {
  users: {
    total: number
    active: number
    new: number
  }
  content: {
    total: number
    published: number
    draft: number
  }
  ads: {
    active: number
    views: number
    clicks: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: { total: 0, active: 0, new: 0 },
    content: { total: 0, published: 0, draft: 0 },
    ads: { active: 0, views: 0, clicks: 0 }
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Пользователи',
      icon: Users,
      stats: [
        { label: 'Всего', value: stats.users.total },
        { label: 'Активных', value: stats.users.active },
        { label: 'Новых', value: stats.users.new }
      ]
    },
    {
      title: 'Контент',
      icon: FileText,
      stats: [
        { label: 'Всего', value: stats.content.total },
        { label: 'Опубликовано', value: stats.content.published },
        { label: 'Черновики', value: stats.content.draft }
      ]
    },
    {
      title: 'Реклама',
      icon: ImageIcon,
      stats: [
        { label: 'Активных', value: stats.ads.active },
        { label: 'Просмотров', value: stats.ads.views },
        { label: 'Кликов', value: stats.ads.clicks }
      ]
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <Button>Обновить данные</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {card.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="text-2xl font-bold">
                      {isLoading ? (
                        <div className="h-8 w-16 animate-pulse bg-muted rounded" />
                      ) : (
                        stat.value.toLocaleString()
                      )}
                    </div>
                    <div className="ml-2 text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* График активности */}
        <Card>
          <CardHeader>
            <CardTitle>Активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              График активности (в разработке)
            </div>
          </CardContent>
        </Card>

        {/* Последние действия */}
        <Card>
          <CardHeader>
            <CardTitle>Последние действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-full bg-muted animate-pulse rounded" />
                      <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  Список действий (в разработке)
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 