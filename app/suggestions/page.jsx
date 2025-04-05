"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { MessageSquare, Send } from "lucide-react"

export default function SuggestionsPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // В реальном приложении здесь был бы запрос к API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Предложение отправлено",
        description: "Спасибо за ваше предложение! Мы рассмотрим его в ближайшее время.",
      })

      // Очищаем форму
      setFormData({
        title: "",
        category: "",
        description: "",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить предложение. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Ваши предложения</h1>
        </div>

        <p className="text-muted-foreground mb-8">
          Мы ценим ваше мнение и всегда открыты для новых идей. Заполните форму ниже, чтобы отправить нам ваше
          предложение по улучшению сайта или добавлению новой информации.
        </p>

        <div className="bg-card rounded-lg p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок предложения</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Кратко опишите ваше предложение"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content">Контент</SelectItem>
                  <SelectItem value="design">Дизайн</SelectItem>
                  <SelectItem value="functionality">Функциональность</SelectItem>
                  <SelectItem value="bug">Ошибка/Баг</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание предложения</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Подробно опишите ваше предложение"
                rows={6}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Отправить предложение
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 bg-muted/30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Как скоро рассматриваются предложения?</h3>
              <p className="text-muted-foreground text-sm">
                Мы стараемся рассмотреть все предложения в течение 7 рабочих дней.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Получу ли я ответ на свое предложение?</h3>
              <p className="text-muted-foreground text-sm">
                Если вы оставили свой email, мы обязательно сообщим вам о результатах рассмотрения вашего предложения.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Могу ли я отслеживать статус своего предложения?</h3>
              <p className="text-muted-foreground text-sm">
                В настоящее время такой функционал не реализован, но мы работаем над этим.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

