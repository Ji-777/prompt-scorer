// ✅ 文件路径：apps/web/app/test-supa/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'




type History = {
  id: number
  prompt: string
  result: string
  created_at: string
}

export default function TestSupaPage() {
  const [data, setData] = useState<History[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('history') // 👈✅ 表名已替换为你的实际表名
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase Error:', error.message)
        setError(error.message)
      } else {
        setData(data || [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">📦 Supabase Test</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data.length === 0 && !loading && !error && <p>No data found.</p>}

      <ul className="space-y-2 mt-4">
        {data.map((item) => (
          <li key={item.id} className="border p-3 rounded">
            <p><strong>Prompt:</strong> {item.prompt}</p>
            <p><strong>Result:</strong> {item.result}</p>
            <p><strong>Created At:</strong> {item.created_at}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
