// apps/web/app/api/save/route.ts
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createSupabaseServerClient } from '@/utils/supabase/serverClient' // ✅ 确保路径正确

export async function POST(req: Request) {
  const { prompt, score } = await req.json()

  if (!prompt || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const id = uuidv4()
  const timestamp = new Date().toISOString()

  // ✅ 补上 await，确保拿到 Supabase 实例
  const supabase = await createSupabaseServerClient()

  try {
    const { error } = await supabase.from('prompt_scores').insert([
      {
        id,
        prompt,
        score,
        timestamp,
      },
    ])

    if (error) {
      console.error('Insert error:', error.message)
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Saved successfully' })
  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
