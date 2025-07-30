'use client'

import { useState } from 'react'

interface ReScoreButtonProps {
  prompt: string
  onReScored?: (data: { score: number; suggestions: string[] }) => void
}

export default function ReScoreButton({ prompt, onReScored }: ReScoreButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleReScore = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/re-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      const json = await res.json()
      if (json.success && onReScored) {
        onReScored(json.data)
      }
    } catch (e) {
      console.error('Re-score failed:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleReScore}
      disabled={loading}
      className="px-4 py-2 rounded-md bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Scoring...' : 'Re-score'}
    </button>
  )
}
