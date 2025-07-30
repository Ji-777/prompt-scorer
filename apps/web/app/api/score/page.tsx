'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PromptScoringPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    setLoading(true)

    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (res.ok) {
        setPrompt('')
        router.push('/history')
      } else {
        const error = await res.json()
        alert(error.error || 'Something went wrong')
      }
    } catch (err) {
      console.error(err)
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Prompt Scoring</h1>
      <textarea
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginBottom: '1rem',
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: '#6c47ff',
          color: 'white',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '6px',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Scoring...' : 'Submit for Scoring'}
      </button>
    </div>
  )
}
