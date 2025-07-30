'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies() // ✅ 异步调用

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name)
          return cookie?.value ?? null
        }
      }
    }
  )
}
