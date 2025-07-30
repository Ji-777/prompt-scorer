import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt } = body as { prompt?: string }
    if (!prompt) {
      return NextResponse.json({ success: false, data: null, error: '缺少 prompt 参数' }, { status: 400 })
    }

    const scoreResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    const scoreJson = await scoreResponse.json()
    if (!scoreResponse.ok || scoreJson.error) {
      return NextResponse.json({ success: false, data: null, error: scoreJson.error || '评分接口返回错误' }, { status: scoreResponse.status || 500 })
    }

    const { score, suggestions } = scoreJson as { score: number, suggestions: string[] }

    const { error: insertError } = await supabaseAdmin
      .from('history')
      .insert({ prompt, score, suggestions })

    if (insertError) {
      return NextResponse.json({ success: false, data: null, error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: { score, suggestions }, error: null }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ success: false, data: null, error: e?.message || '服务器内部错误' }, { status: 500 })
  }
}
