// apps/web/utils/supabase/supaWrite.ts
// --------------------------------------------------
// 将评分结果写入 history 表的辅助函数
// --------------------------------------------------

import { getServerClient } from './serverClient'

type WriteHistoryParams = {
  prompt: string
  score: number
  suggestions: string[]
}

export async function writeHistory({ prompt, score, suggestions }: WriteHistoryParams) {
  const supabase = getServerClient()

  // 我们把 score + 建议打包成 result 字段写入（兼容你之前 history 表的结构）
  const resultText = `Score: ${score}\n${suggestions.join('\n')}`

  const { data, error } = await supabase.from('history').insert([
    {
      prompt,
      result: resultText,          // 兼容你表里的 result 字段
      // created_at 如果数据库默认 now()，就不用传。否则可传 new Date().toISOString()
    },
  ])

  if (error) {
    console.error('❌ Supabase insert failed:', error.message)
    throw error
  }

  return data
}
