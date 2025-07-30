// apps/web/utils/supabase/supaWrite.ts
import { createSupabaseServerClient } from './serverClient'

type WriteHistoryParams = {
  prompt: string
  score: number
  suggestions: string[]
}

export async function writeHistory({ prompt, score, suggestions }: WriteHistoryParams) {
  const supabase = await createSupabaseServerClient()

  const resultText = `Score: ${score}\n${suggestions.join('\n')}`

  const { data, error } = await supabase.from('history').insert([
    {
      prompt,
      result: resultText,
    },
  ])

  if (error) {
    console.error('❌ Supabase insert failed:', error.message)
    throw error
  }

  return data
}
