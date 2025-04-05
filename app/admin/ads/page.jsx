"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit, Eye, EyeOff, Image, Type, Save, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdBanner } from "@/components/ad-banner"
import { TextAd } from "@/components/text-ad"

// Демо-данные для рекламных баннеров
const initialBanners = [
  {
    id: "banner-1",
    name: "Главный баннер",
    type: "banner",
    position: "header",
    imageUrl: "/placeholder.svg?height=90&width=728",
    targetUrl: "https://example.com/ad1",
    altText: "Реклама игрового сервера",
    isActive: true,
    backgroundColor: "#ffffff",
    startDate: "2023-04-01",
    endDate: "2023-05-01",
    views: 1245,
    clicks: 87,
  },
  {
    id: "banner-2",
    name: "Боковой баннер",
    type: "banner",
    position: "sidebar",
    imageUrl: "/placeholder.svg?height=250&width=300",
    targetUrl: "https://example.com/ad2",
    altText: "Реклама игровых товаров",
    isActive: true,
    backgroundColor: "#f5f5f5",
    startDate: "2023-04-01",
    endDate: "2023-05-01",
    views: 982,
    clicks: 45,
  },
  {
    id: "text-ad-1",
    name: "Текстовая реклама хостинга",
    type: "text",
    title: "Игровой хостинг со скидкой 50%",
    description: "Разместите свой сервер на нашем хостинге. Первый месяц со скидкой 50% по промокоду RPWIKI",
    targetUrl: "https://example.com/hosting",
    isActive: true,
    backgroundColor: "#f5f5f5",
    textColor: "#333333",
    startDate: "2023-04-01",
    endDate: "2023-05-01",
    views: 756,
    clicks: 32,
  },
]

export default function AdsManagementPage() {
  const [ads, setAds] = useState([])
  const [currentAd, setCurrentAd] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [activeTab, setActiveTab] = useState("all")

  // Загрузка данных
  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setAds(initialBanners)
  }, [])

  // Фильтрация рекламы
  const filteredAds = () => {
    let filtered = ads

    // Фильтр по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (ad) => ad.name.toLowerCase().includes(query) || (ad.title && ad.title.toLowerCase().includes(query)),
      )
    }

    // Фильтр по типу
    if (activeTab !== "all") {
      filtered = filtered.filter((ad) => ad.type === activeTab)
    }

    return filtered
  }

  // Пагинация
  const paginatedAds = () => {
    const filtered = filteredAds()
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  }

  const totalPages = Math.ceil(filteredAds().length / itemsPerPage)

  // Обработчики действий
  const handleCreateAd = (type) => {
    const newAd = {
      id: `ad-${Date.now()}`,
      name: type === "banner" ? "Новый баннер" : "Новое текстовое объявление",
      type,
      position: type === "banner" ? "header" : null,
      imageUrl: type === "banner" ? "/placeholder.svg" : null,
      targetUrl: "",
      altText: type === "banner" ? "Реклама" : null,
      title: type === "text" ? "Заголовок объявления" : null,
      description: type === "text" ? "Описание объявления" : null,
      isActive: true,
      backgroundColor: "#ffffff",
      textColor: type === "text" ? "#333333" : null,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      views: 0,
      clicks: 0,
    }

    setCurrentAd(newAd)
    setIsEditing(true)
  }

  const handleEditAd = (ad) => {
    setCurrentAd(ad)
    setIsEditing(true)
  }

  const handleDeleteAd = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту рекламу?")) {
      setAds(ads.filter((ad) => ad.id !== id))
    }
  }

  const handleSaveAd = () => {
    if (!currentAd) return

    // Проверяем, существует ли уже такая реклама
    const existingAdIndex = ads.findIndex((ad) => ad.id === currentAd.id)

    if (existingAdIndex >= 0) {
      // Обновляем существующую рекламу
      const updatedAds = [...ads]
      updatedAds[existingAdIndex] = currentAd
      setAds(updatedAds)
    } else {
      // Добавляем новую рекламу
      setAds([...ads, currentAd])
    }

    setIsEditing(false)
    setCurrentAd(null)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setCurrentAd(null)
  }

  const handleToggleActive = (id) => {
    setAds(ads.map((ad) => (ad.id === id ? { ...ad, isActive: !ad.isActive } : ad)))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentAd((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, value) => {
    setCurrentAd((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setCurrentAd((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Управление рекламой</h1>

      {isEditing ? (
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {currentAd.id.includes("ad-") ? "Создание новой рекламы" : "Редактирование рекламы"}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="h-4 w-4 mr-2" />
                Отмена
              </Button>
              <Button onClick={handleSaveAd}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название рекламы (для админа)</Label>
                    <Input id="name" name="name" value={currentAd.name || ""} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetUrl">Целевой URL</Label>
                    <Input
                      id="targetUrl"
                      name="targetUrl"
                      value={currentAd.targetUrl || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Дата начала</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={currentAd.startDate || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Дата окончания</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={currentAd.endDate || ""}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isActive">Статус</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="isActive"
                        checked={currentAd.isActive}
                        onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                      />
                      <Label htmlFor="isActive" className="cursor-pointer">
                        {currentAd.isActive ? "Активна" : "Неактивна"}
                      </Label>
                    </div>
                  </div>
                </div>

                {currentAd.type === "banner" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">URL изображения</Label>
                        <Input
                          id="imageUrl"
                          name="imageUrl"
                          value={currentAd.imageUrl || ""}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="altText">Альтернативный текст</Label>
                        <Input
                          id="altText"
                          name="altText"
                          value={currentAd.altText || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="position">Позиция</Label>
                        <Select
                          value={currentAd.position}
                          onValueChange={(value) => handleSelectChange("position", value)}
                        >
                          <SelectTrigger id="position">
                            <SelectValue placeholder="Выберите позицию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="header">Верх страницы</SelectItem>
                            <SelectItem value="sidebar">Боковая панель</SelectItem>
                            <SelectItem value="content">В контенте</SelectItem>
                            <SelectItem value="footer">Низ страницы</SelectItem>
                            <SelectItem value="popup">Всплывающий</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">Цвет фона</Label>
                        <div className="flex gap-2">
                          <Input
                            id="backgroundColor"
                            name="backgroundColor"
                            value={currentAd.backgroundColor || "#ffffff"}
                            onChange={handleInputChange}
                          />
                          <input
                            type="color"
                            value={currentAd.backgroundColor || "#ffffff"}
                            onChange={(e) =>
                              handleInputChange({
                                target: { name: "backgroundColor", value: e.target.value },
                              })
                            }
                            className="w-10 h-10 p-1 rounded border"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {currentAd.type === "text" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Заголовок объявления</Label>
                      <Input id="title" name="title" value={currentAd.title || ""} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={currentAd.description || ""}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">Цвет фона</Label>
                        <div className="flex gap-2">
                          <Input
                            id="backgroundColor"
                            name="backgroundColor"
                            value={currentAd.backgroundColor || "#ffffff"}
                            onChange={handleInputChange}
                          />
                          <input
                            type="color"
                            value={currentAd.backgroundColor || "#ffffff"}
                            onChange={(e) =>
                              handleInputChange({
                                target: { name: "backgroundColor", value: e.target.value },
                              })
                            }
                            className="w-10 h-10 p-1 rounded border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="textColor">Цвет текста</Label>
                        <div className="flex gap-2">
                          <Input
                            id="textColor"
                            name="textColor"
                            value={currentAd.textColor || "#333333"}
                            onChange={handleInputChange}
                          />
                          <input
                            type="color"
                            value={currentAd.textColor || "#333333"}
                            onChange={(e) =>
                              handleInputChange({
                                target: { name: "textColor", value: e.target.value },
                              })
                            }
                            className="w-10 h-10 p-1 rounded border"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-bold mb-4">Предпросмотр</h3>

                {currentAd.type === "banner" && (
                  <AdBanner
                    id={currentAd.id}
                    position={currentAd.position}
                    imageUrl={currentAd.imageUrl}
                    targetUrl={currentAd.targetUrl}
                    altText={currentAd.altText}
                    backgroundColor={currentAd.backgroundColor}
                    showCloseButton={false}
                  />
                )}

                {currentAd.type === "text" && (
                  <TextAd
                    id={currentAd.id}
                    title={currentAd.title}
                    description={currentAd.description}
                    targetUrl={currentAd.targetUrl}
                    backgroundColor={currentAd.backgroundColor}
                    textColor={currentAd.textColor}
                  />
                )}

                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    Это предварительный просмотр рекламы. Внешний вид может отличаться в зависимости от размещения на
                    сайте.
                  </p>
                </div>
              </div>

              {(currentAd.views > 0 || currentAd.clicks > 0) && (
                <div className="mt-4 bg-muted/30 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Статистика</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Просмотры</p>
                      <p className="text-xl font-bold">{currentAd.views}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Клики</p>
                      <p className="text-xl font-bold">{currentAd.clicks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CTR</p>
                      <p className="text-xl font-bold">
                        {currentAd.views > 0 ? ((currentAd.clicks / currentAd.views) * 100).toFixed(2) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="banner">Баннеры</TabsTrigger>
                <TabsTrigger value="text">Текстовые</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="relative">
                <Input
                  placeholder="Поиск рекламы..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="md:w-64"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleCreateAd("banner")}>
                  <Image className="h-4 w-4 mr-2" />
                  Новый баннер
                </Button>
                <Button onClick={() => handleCreateAd("text")}>
                  <Type className="h-4 w-4 mr-2" />
                  Новое объявление
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3">Название</th>
                  <th className="text-left p-3">Тип</th>
                  <th className="text-left p-3">Статус</th>
                  <th className="text-left p-3">Период</th>
                  <th className="text-left p-3">Статистика</th>
                  <th className="text-left p-3">Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAds().map((ad) => (
                  <tr key={ad.id} className="border-t">
                    <td className="p-3">
                      <div className="font-medium">{ad.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {ad.type === "banner" ? ad.altText : ad.title}
                      </div>
                    </td>
                    <td className="p-3">
                      {ad.type === "banner" ? (
                        <div className="flex items-center">
                          <Image className="h-4 w-4 mr-1 text-primary" />
                          <span>Баннер</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Type className="h-4 w-4 mr-1 text-primary" />
                          <span>Текст</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {ad.isActive ? (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span>Активна</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>
                            <span>Неактивна</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="text-xs">
                          <span className="font-medium">{ad.views}</span> просм.
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">{ad.clicks}</span> кликов
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">
                            {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(2) : 0}%
                          </span>{" "}
                          CTR
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleToggleActive(ad.id)}>
                          {ad.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteAd(ad.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedAds().length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      {searchQuery ? "Рекламные объявления не найдены" : "Нет рекламных объявлений"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Пагинация */}
            <div className="flex justify-between items-center p-3 border-t">
              <div className="text-sm text-muted-foreground">
                Показано {paginatedAds().length} из {filteredAds().length} объявлений
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

