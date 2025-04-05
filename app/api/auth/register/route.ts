import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Регистрация пользователя через Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Создание записи в таблице users
    if (authData.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: authData.user.id,
        email,
        username,
        avatar_url: "/placeholder.svg?height=200&width=200",
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 400 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Ошибка регистрации:", error)
    return NextResponse.json({ error: "Ошибка при регистрации пользователя" }, { status: 500 })
  }
}

