'use client'

import React, { useState } from 'react'

// 模拟评分数据
const mockScore = () => Math.floor(Math.random() * 21) + 70 // 70~90
const mockSuggestions = () => [
  'Try using simpler language.',
  'Be more specific about the goal.',
  'Avoid vague expressions.'
]

export default function ComparePage() {
  const [promptA, setPromptA] = useState('')
  const [promptB, setPromptB] = useState('')
  const [scoreA, setScoreA] = useState<number | null>(null)
  const [scoreB, setScoreB] = useState<number | null>(null)
  const [suggestionsA, setSuggestionsA] = useState<string[]>([])
  const [suggestionsB, setSuggestionsB] = useState<string[]>([])
  const [conclusion, setConclusion] = useState('')

  const handleCompare = () => {
    // 模拟评分逻辑
    const aScore = mockScore()
    const bScore = mockScore()
    const aSuggestions = mockSuggestions()
    const bSuggestions = mockSuggestions()

    setScoreA(aScore)
    setScoreB(bScore)
    setSuggestionsA(aSuggestions)
    setSuggestionsB(bSuggestions)

    // 简单结论逻辑
    if (aScore > bScore) {
      setConclusion('Prompt A performs better due to clearer expression.')
    } else if (aScore < bScore) {
      setConclusion('Prompt B performs better with more concise language.')
    } else {
      setConclusion('Both prompts perform equally well.')
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Prompt A/B Comparison</h1>

      {/* 输入区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Prompt A</label>
          <textarea
            className="w-full border rounded p-2 min-h-[120px]"
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            placeholder="Enter Prompt A"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Prompt B</label>
          <textarea
            className="w-full border rounded p-2 min-h-[120px]"
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            placeholder="Enter Prompt B"
          />
        </div>
      </div>

      {/* 比较按钮 */}
      <button
        onClick={handleCompare}
        className="px-6 py-2 bg-black text-white rounded hover:opacity-90"
      >
        Compare
      </button>

      {/* 输出区 */}
      {(scoreA !== null && scoreB !== null) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* A卡片 */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Prompt A</h2>
            <p className="text-xl font-bold mb-2">Score: {scoreA}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {suggestionsA.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          {/* B卡片 */}
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Prompt B</h2>
            <p className="text-xl font-bold mb-2">Score: {scoreB}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {suggestionsB.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 结论 */}
      {conclusion && (
        <div className="mt-4 p-4 bg-blue-50 text-blue-900 border border-blue-200 rounded">
          <strong>Conclusion: </strong>{conclusion}
        </div>
      )}
    </div>
  )
}
