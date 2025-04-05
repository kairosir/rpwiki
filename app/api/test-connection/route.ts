import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Простой запрос для проверки подключения
    const { data, error } = await supabase.from("projects").select("*").limit(1)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error testing connection:", error)
    return NextResponse.json({ error: "Failed to connect to Supabase" }, { status: 500 })
  }
}

