import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get("email"))
  const password = String(formData.get("password"))
  const username = String(formData.get("username"))

  const supabase = createRouteHandlerClient({ cookies })

  // 1. Сначала регистрируем пользователя в auth.users
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  // 2. Затем создаем запись в таблице public.users с использованием service role
  // Это обходит ограничения RLS
  const supabaseAdmin = createRouteHandlerClient({
    cookies,
    options: {
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  })

  const { error: profileError } = await supabaseAdmin.from("users").insert({
    id: authData.user?.id,
    email,
    username,
    created_at: new Date().toISOString(),
  })

  if (profileError) {
    console.error("Profile creation error:", profileError)
    // Если не удалось создать профиль, удаляем пользователя из auth.users
    await supabaseAdmin.auth.admin.deleteUser(authData.user?.id || "")
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

