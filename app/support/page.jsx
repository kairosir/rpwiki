"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { MessageSquare, Send, Mail, Phone, HelpCircle, AlertTriangle } from "lucide-react"
import { AdBanner } from "@/components/ad-banner"
import { TextAd } from "@/components/text-ad"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("suggestion")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    email: "",
    priority: activeTab === "issue" ? "medium" : "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
    // Сбрасываем приоритет при смене типа обращения
    if (value === "suggestion") {
      setFormData((prev) => ({ ...prev, priority: "" }))
    } else if (value === "issue") {
      setFormData((prev) => ({ ...prev, priority: "medium" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // В реальном приложении здесь был бы запрос к API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: activeTab === "suggestion" ? "Предложение отправлено" : "Обращение отправлено",
        description: "Спасибо за ваше обращение! Мы рассмотрим его в ближайшее время.",
      })

      // Очищаем форму
      setFormData({
        title: "",
        category: "",
        description: "",
        email: "",
        priority: activeTab === "issue" ? "medium" : "",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить обращение. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Поддержка</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Мы ценим ваше мнение и всегда готовы помочь. Заполните форму ниже, чтобы отправить нам ваше предложение по
            улучшению сайта или сообщить о проблеме.
          </p>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestion">Предложение</TabsTrigger>
              <TabsTrigger value="issue">Проблема</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="bg-card rounded-lg p-6 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{activeTab === "suggestion" ? "Заголовок предложения" : "Тема обращения"}</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={
                    activeTab === "suggestion" ? "Кратко опишите ваше предложение" : "Кратко опишите вашу проблему"
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {activeTab === "suggestion" ? (
                        <>
                          <SelectItem value="content">Контент</SelectItem>
                          <SelectItem value="design">Дизайн</SelectItem>
                          <SelectItem value="functionality">Функциональность</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="technical">Техническая проблема</SelectItem>
                          <SelectItem value="account">Проблема с аккаунтом</SelectItem>
                          <SelectItem value="content">Проблема с контентом</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email для связи</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ваш email для ответа"
                    required
                  />
                </div>
              </div>

              {activeTab === "issue" && (
                <div className="space-y-2">
                  <Label htmlFor="priority">Приоритет</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => handleSelectChange("priority", value)}
                    required
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Выберите приоритет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="critical">Критический</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">
                  {activeTab === "suggestion" ? "Описание предложения" : "Описание проблемы"}
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={
                    activeTab === "suggestion"
                      ? "Подробно опишите ваше предложение"
                      : "Подробно опишите вашу проблему, включая шаги для воспроизведения"
                  }
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
                    {activeTab === "suggestion" ? "Отправить предложение" : "Отправить обращение"}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {/* Рекламный баннер */}
          <AdBanner
            id="support-sidebar-banner"
            position="sidebar"
            imageUrl="/placeholder.svg?height=300&width=300"
            targetUrl="https://example.com/ad-support"
            altText="Реклама игровых товаров"
            backgroundColor="#f5f5f5"
          />

          {/* Контактная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">support@rpwiki.ru</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Телефон</h3>
                  <p className="text-sm text-muted-foreground">+7 (999) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Telegram</h3>
                  <a
                    href="https://t.me/rpwiki_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    @rpwiki_support
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Часто задаваемые вопросы */}
          <Card>
            <CardHeader>
              <CardTitle>Часто задаваемые вопросы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Как скоро рассматриваются обращения?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Мы стараемся рассмотреть все обращения в течение 24-48 часов.
                </p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Получу ли я ответ на свое обращение?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Да, мы обязательно ответим на ваше обращение по указанному email.
                </p>
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Как отслеживать статус обращения?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  После отправки обращения вы получите уникальный номер для отслеживания.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Текстовая реклама */}
          <TextAd
            id="support-text-ad"
            title="Нужна помощь с игровым сервером?"
            description="Наши специалисты помогут настроить и оптимизировать ваш игровой сервер. Первая консультация бесплатно!"
            targetUrl="https://example.com/server-help"
            backgroundColor="#f0f8ff"
          />

          {/* Предупреждение */}
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Обратите внимание</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  Для срочных вопросов, связанных с безопасностью аккаунта, рекомендуем обращаться напрямую через
                  Telegram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

