import { NextRequest, NextResponse } from 'next/server'
import { scorePromptWithRubric } from '@/lib/scoreModel'
import { createSupabaseServerClient } from '@/utils/supabase/serverClient'
import { supabaseAdmin } from '@/utils/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { prompt, rubric } = await req.json()

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ success: false, error: 'Prompt cannot be empty.' }, { status: 400 })
    }

    // 1) 临时评分结果（跳过模型调用）
     const score = 88
     const suggestions = ['Try adding more detail', 'Clarify your intended outcome']


    // 2) 读取当前登录用户（可为空）
    const supabaseSSR = await createSupabaseServerClient()
    const { data: { user } } = await supabaseSSR.auth.getUser()

    // 3) 用 Service Role 写库（绕过 RLS）
    const { error: insertError } = await supabaseAdmin
      .from('history')
      .insert({
        prompt,
        score,
        suggestion: suggestions.join('\n'),
        user_id: user?.id ?? null,
      })

    if (insertError) {
      console.error('[Supabase insert error]', insertError)
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, score, suggestions })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
