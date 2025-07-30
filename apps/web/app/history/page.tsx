'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type HistoryItem = {
  id: string
  prompt: string
  score: number | null
  suggestion: string | null
  created_at: string
}

export default function HistoryPage() {
  const supabase = createClient()
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const loadHistory = async () => {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setHistory(data)
      if (error) console.error('History fetch failed:', error.message)
    }

    loadHistory()
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Prompt History</h1>
      {history.map((item) => (
        <div key={item.id} className="mb-6 p-4 border rounded shadow-sm bg-white">
          <p><strong>📝 Prompt:</strong> {item.prompt}</p>
          <p><strong>⭐ Score:</strong> {item.score ?? 'N/A'}</p>
          <p><strong>💡 Suggestion:</strong> {item.suggestion ?? 'N/A'}</p>
          <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}
