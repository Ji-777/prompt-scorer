'use client'

import Link from 'next/link'
import { useState } from 'react'
import ReScoreButton from '@/components/ReScoreButton'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [scoreResult, setScoreResult] = useState<null | {
    score: number
    suggestions: string[]
  }>(null)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Prompt Scoring SaaS
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl text-center mb-8">
        A simple tool to score your prompts and offer suggestions.
      </p>

      {/* 输入框 */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt here..."
        className="w-full max-w-xl p-4 border rounded mb-4 text-black"
        rows={4}
      />

      {/* 重新评分按钮 */}
      <ReScoreButton
        prompt={input}
        onReScored={(data) => {
          setScoreResult(data)
        }}
      />

      {/* 展示评分结果 */}
      {scoreResult && (
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">
            Score: {scoreResult.score} / 100
          </p>
          <ul className="mt-2 text-left list-disc list-inside text-sm text-gray-700">
            {scoreResult.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 查看历史链接 */}
      <div className="mt-10">
        <Link
          href="/history"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View scoring history
        </Link>
      </div>
    </main>
  )
}
