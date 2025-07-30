'use client'

import { useEffect, useState } from 'react'

// ✅ 模板数据结构
interface TemplateItem {
  id: string
  category: string
  title: string
  prompt: string
}

// ✅ props：注入设置输入框内容的方法
export default function PromptTemplates({
  onSelect
}: {
  onSelect: (prompt: string) => void
}) {
  const [templates, setTemplates] = useState<TemplateItem[]>([])

  useEffect(() => {
    fetch('/data/templates.json')
      .then((res) => res.json())
      .then(setTemplates)
      .catch(() => {
        console.error('❌ 模板加载失败')
      })
  }, [])

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">📚 推荐模板</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.prompt)}
            className="text-left border rounded p-4 bg-white shadow-sm hover:bg-blue-50 transition"
          >
            <div className="text-sm text-gray-500">{t.category}</div>
            <div className="font-medium text-gray-800">{t.title}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
