"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Проверка текущей сессии
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        setUser(session?.user || null)

        // Подписка на изменения аутентификации
        const {
          data: { subscription },
        } = await supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null)
        })

        return () => {
          if (subscription && subscription.unsubscribe) {
            subscription.unsubscribe()
          }
        }
      } catch (error) {
        console.error("Ошибка при проверке сессии:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [supabase])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      return { success: true }
    } catch (error) {
      console.error("Ошибка при выходе:", error)
      return { success: false, error }
    }
  }

  const value = {
    user,
    loading,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

