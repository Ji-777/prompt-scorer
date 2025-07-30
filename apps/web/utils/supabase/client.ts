'use client'

import { createBrowserClient } from '@supabase/ssr'
// import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import type { Database } from '@/types/supabase'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
