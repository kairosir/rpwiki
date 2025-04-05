import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

// Создаем клиент Supabase для использования на стороне сервера
export const createClient = () => {
  try {
    return createServerComponentClient<Database>({ cookies })
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    // Возвращаем заглушку клиента в случае ошибки
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
      },
    }
  }
}

