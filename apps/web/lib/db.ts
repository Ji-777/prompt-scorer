// apps/web/lib/db.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 创建 supabase 实例
export const supabase = createClient(supabaseUrl, supabaseKey)

// 默认导出供 server 端引用的语法使用
export default supabase
