'use client'

import { useState } from 'react'
import TemplateCard from './TemplateCard'

export default function TemplateList({
  categories,
  templates,
}: {
  categories: string[]
  templates: any[]
}) {
  const [selected, setSelected] = useState<string>('all')

  const filteredTemplates =
    selected === 'all'
      ? templates
      : templates.filter((t) => t.category === selected)

  return (
    <>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="mt-4 space-y-4">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </>
  )
}
