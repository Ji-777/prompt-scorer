import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,          // 你的项目 URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!,         // 服务端 Service Role Key（.env.local 已有）
  {
    auth: { autoRefreshToken: false, persistSession: false }
  }
)
