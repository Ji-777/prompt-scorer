import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// 正确路径写法，确保是在 apps/web/feedback.json 下
const filePath = path.join(process.cwd(), 'feedback.json')

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    const feedbacks = JSON.parse(data)
    return NextResponse.json(feedbacks)
  } catch (error) {
    console.error('Failed to read feedback.json:', error)
    return NextResponse.json([])
  }
}
