// apps/web/app/components/HistoryList.tsx
'use client'

import { useEffect, useState } from 'react'

// ✅ 临时代替类型
type ScoreRecord = {
  id: string
  prompt: string
  score: number
  suggestions: string[]
  feedback?: string
  timestamp: string
}

export default function HistoryList() {
  const [records, setRecords] = useState<ScoreRecord[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState('')

  useEffect(() => {
    // ✅ 模拟假数据
    const fakeData: ScoreRecord[] = [
      {
        id: '1',
        prompt: 'Explain quantum computing in simple terms.',
        score: 8,
        suggestions: ['Add a real-world analogy', 'Avoid jargon'],
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        prompt: 'Write a haiku about the moon.',
        score: 10,
        suggestions: ['Perfect as is!'],
        feedback: 'Loved the poetic tone.',
        timestamp: new Date().toISOString(),
      },
    ]
    setRecords(fakeData)
  }, [])

  const handleSubmitFeedback = async (id: string) => {
    const updated = records.map((r) =>
      r.id === id ? { ...r, feedback: feedbackText } : r
    )
    setRecords(updated)
    setEditingId(null)
    setFeedbackText('')
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">🕘 Score History</h2>

      {records.length === 0 ? (
        <p className="text-gray-500">No records yet.</p>
      ) : (
        <ul className="space-y-4">
          {records.map((r) => (
            <li key={r.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <div className="text-sm text-gray-600 mb-1">
                Time: {new Date(r.timestamp).toLocaleString()}
              </div>
              <div className="font-medium text-gray-800 mb-1">
                📝 Prompt: {r.prompt}
              </div>
              <div className="text-blue-600 font-semibold mb-1">
                💯 Score: {r.score}
              </div>
              <ul className="text-sm text-gray-700 list-disc list-inside ml-2 mb-2">
                {r.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              {r.feedback ? (
                <div className="text-sm text-green-700 mt-2">
                  🗣️ Feedback: {r.feedback}
                </div>
              ) : editingId === r.id ? (
                <div className="space-y-2 mt-2">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    placeholder="Leave your feedback here..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSubmitFeedback(r.id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setFeedbackText('')
                      }}
                      className="px-3 py-1 bg-gray-300 text-sm rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setEditingId(r.id)}
                  className="text-sm text-blue-500 underline mt-2"
                >
                  💬 Leave Feedback
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
