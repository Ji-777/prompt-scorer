'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { CookieOptionsWithName, CookieMethodsServer } from '@supabase/ssr'

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies() // ⛳ 注意这里需要 await

  // ✅ 扩展对象并通过类型断言绕过类型限制
  const cookieMethods = {
    get(name: string): string | null {
      const cookie = cookieStore.get(name)
      return cookie?.value ?? null
    },
    getAll(): { name: string; value: string }[] {
      const allCookies = cookieStore.getAll()
      return allCookies.map((cookie: { name: string; value: string }) => ({
        name: cookie.name,
        value: cookie.value,
      }))
    },
    set(name: string, value: string, options?: CookieOptionsWithName) {
      // SSR 中无操作
    },
    remove(name: string, options?: CookieOptionsWithName) {
      // SSR 中无操作
    },
  } as CookieMethodsServer // ✅ 强制断言为 CookieMethodsServer 类型

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieMethods,
    }
  )
}
