// apps/web/app/components/HistoryList.tsx
'use client'

import { useEffect, useState } from 'react'
import { getAllRecords, updateFeedback, ScoreRecord } from '../utils/db'

export default function HistoryList() {
  const [records, setRecords] = useState<ScoreRecord[]>([])
  const [editingId, setEditingId] = useState<string | null>(null) // ✅ 当前正在编辑的记录 ID
  const [feedbackText, setFeedbackText] = useState('') // ✅ 输入框内容

  useEffect(() => {
    getAllRecords().then(setRecords)
  }, [])

  const handleSubmitFeedback = async (id: string) => {
    await updateFeedback(id, feedbackText)
    const updated = await getAllRecords()
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
