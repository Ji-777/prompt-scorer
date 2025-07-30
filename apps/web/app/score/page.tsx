'use client'

import { useState } from 'react'
import RubricEditor from '@/components/RubricEditor'

export default function ScorePage() {
  const [prompt, setPrompt] = useState('')
  const [rubric, setRubric] = useState<string[]>([])
  const [score, setScore] = useState<number | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleScore = async () => {
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, rubric }),
    })

    const data = await res.json()
    if (data.success) {
      setScore(data.score)
      setSuggestions(data.suggestions)
    } else {
      alert('Error: ' + data.error)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Prompt Scoring</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="w-full h-24 p-3 border border-gray-300 rounded-md"
      />

      <RubricEditor rubric={rubric} onChange={setRubric} />

      <button
        onClick={handleScore}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Score Now
      </button>

      {score !== null && (
        <div className="mt-4 text-lg font-medium">
          Score: <span className="text-blue-600">{score.toFixed(2)}</span>
          <br />
          Suggestions:
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
