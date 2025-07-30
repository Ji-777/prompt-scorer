import { NextRequest, NextResponse } from 'next/server'
import { evaluatePromptWithModel } from '../../../lib/evaluatePromptWithModel'

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    const result = await evaluatePromptWithModel(prompt)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('评分失败:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
