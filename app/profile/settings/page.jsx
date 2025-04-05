"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Key } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    profileVisibility: "public",
    emailNotifications: true,
    browserNotifications: false,
    twoFactorAuth: false,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          const { data, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

          if (error) throw error

          if (data) {
            setUserData({
              email: session.user.email,
              username: data.username,
              profileVisibility: data.profile_visibility || "public",
              emailNotifications: data.email_notifications !== false,
              browserNotifications: data.browser_notifications === true,
              twoFactorAuth: data.two_factor_auth === true,
            })
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error)
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить данные пользователя",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, checked) => {
    setUserData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveAccount = async () => {
    try {
      setLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast({
          title: "Ошибка",
          description: "Вы не авторизованы",
          variant: "destructive",
        })
        return
      }

      // Обновляем данные пользователя в базе данных
      const { error } = await supabase
        .from("users")
        .update({
          username: userData.username,
          profile_visibility: userData.profileVisibility,
          email_notifications: userData.emailNotifications,
          browser_notifications: userData.browserNotifications,
          two_factor_auth: userData.twoFactorAuth,
        })
        .eq("id", session.user.id)

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Настройки аккаунта успешно сохранены",
      })
    } catch (error) {
      console.error("Ошибка при сохранении настроек:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    try {
      setLoading(true)

      // Проверяем, совпадают ли пароли
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast({
          title: "Ошибка",
          description: "Новые пароли не совпадают",
          variant: "destructive",
        })
        return
      }

      // Обновляем пароль через Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) throw error

      // Очищаем форму
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Успешно",
        description: "Пароль успешно изменен",
      })
    } catch (error) {
      console.error("Ошибка при изменении пароля:", error)
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось изменить пароль",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

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

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Настройки профиля</h1>
        <p className="text-muted-foreground">Управляйте настройками вашего аккаунта и безопасностью</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Настройки аккаунта</CardTitle>
            <CardDescription>Управляйте основной информацией вашего аккаунта</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={userData.email} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">
                Email нельзя изменить напрямую. Обратитесь в поддержку для изменения.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input id="username" name="username" value={userData.username} onChange={handleInputChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAccount} disabled={loading} className="ml-auto">
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить изменения
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Безопасность</CardTitle>
            <CardDescription>Управляйте паролем и настройками безопасности</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Изменение пароля</h3>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Двухфакторная аутентификация</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Двухфакторная аутентификация</p>
                  <p className="text-sm text-muted-foreground">
                    Добавьте дополнительный уровень безопасности для вашего аккаунта
                  </p>
                </div>
                <Switch
                  checked={userData.twoFactorAuth}
                  onCheckedChange={(checked) => handleSwitchChange("twoFactorAuth", checked)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleChangePassword}
              disabled={
                loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword
              }
              className="ml-auto"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
                  Сохранение...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Изменить пароль
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
            <CardDescription>Настройте способы получения уведомлений</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email уведомления</p>
                <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
              </div>
              <Switch
                checked={userData.emailNotifications}
                onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Уведомления в браузере</p>
                <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
              </div>
              <Switch
                checked={userData.browserNotifications}
                onCheckedChange={(checked) => handleSwitchChange("browserNotifications", checked)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAccount} disabled={loading} className="ml-auto">
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить изменения
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Приватность</CardTitle>
            <CardDescription>Управляйте настройками приватности вашего профиля</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Видимость профиля</Label>
              <Select
                value={userData.profileVisibility}
                onValueChange={(value) => handleSelectChange("profileVisibility", value)}
              >
                <SelectTrigger id="profileVisibility">
                  <SelectValue placeholder="Выберите видимость профиля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Публичный</SelectItem>
                  <SelectItem value="friends">Только друзья</SelectItem>
                  <SelectItem value="private">Приватный</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Определяет, кто может видеть ваш профиль и активность</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAccount} disabled={loading} className="ml-auto">
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2"></span>
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить изменения
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

