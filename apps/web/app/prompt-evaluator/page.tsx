'use client'

import { useState } from 'react'

// 评分结构体类型定义
type EvaluationResult = {
  clarity: number
  instruction: number
  reusability: number
  summary: string
  improved: string
}

export default function PromptEvaluator() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [copied, setCopied] = useState(false) // 📌 复制状态提示

  const handleEvaluate = async () => {
    setCopied(false) // 每次评估重置复制状态
    const res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const data = await res.json()
    setResult(data)
  }

  const handleCopy = () => {
    if (result?.improved) {
      navigator.clipboard.writeText(result.improved)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2秒后自动关闭提示
    } else {
      alert("Improved prompt is not available yet.")
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">⚡ Prompt Evaluator</h1>
      <p className="mb-4 text-gray-600">
        Paste your GPT prompt below to get instant quality evaluation and suggestions.
      </p>

      <textarea
        className="w-full h-32 p-2 border rounded mb-4"
        placeholder="Paste your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleEvaluate}
      >
        Evaluate Prompt
      </button>

      {/* ✅ 如果有评分结果就显示下面的详细内容 */}
      {result && (
        <section className="bg-white p-6 rounded-lg shadow border space-y-6 mt-8">
          <h2 className="text-xl font-semibold mb-2">📊 Score Breakdown</h2>

          {/* 三项评分条目 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border rounded p-4 bg-blue-50 text-blue-900 shadow-sm">
              <h4 className="font-bold text-sm">Clarity</h4>
              <p className="text-2xl">{result.clarity}/10</p>
            </div>
            <div className="border rounded p-4 bg-green-50 text-green-900 shadow-sm">
              <h4 className="font-bold text-sm">Instruction</h4>
              <p className="text-2xl">{result.instruction}/10</p>
            </div>
            <div className="border rounded p-4 bg-yellow-50 text-yellow-900 shadow-sm">
              <h4 className="font-bold text-sm">Reusability</h4>
              <p className="text-2xl">{result.reusability}/10</p>
            </div>
          </div>

          {/* Summary 区域 */}
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-semibold text-gray-700 mb-1">🧠 Summary</h3>
            <p className="text-gray-800">{result.summary}</p>
          </div>

          {/* Improved Prompt 区域 */}
          <div className="bg-gray-50 p-4 rounded border">
            <h3 className="font-semibold text-gray-700 mb-1">✨ Improved Prompt</h3>
            <p className="bg-white p-3 border border-gray-300 rounded text-gray-800 whitespace-pre-wrap">
              {result.improved}
            </p>
            <button
              onClick={handleCopy}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              {copied ? '✅ Copied!' : '📋 Copy Improved Prompt'}
            </button>
          </div>
        </section>
      )}
    </main>
  )
}
