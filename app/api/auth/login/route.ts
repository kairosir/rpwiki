import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Вход пользователя
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Обновление времени последнего входа
    if (data.user) {
      await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Ошибка входа:", error)
    return NextResponse.json({ error: "Ошибка при входе в систему" }, { status: 500 })
  }
}

