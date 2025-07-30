'use client'

import { useState } from 'react'

export interface RubricEditorProps {
  rubric: string[]
  onChange: (rubric: string[]) => void
}

export default function RubricEditor({ rubric, onChange }: RubricEditorProps) {
  const [newCriterion, setNewCriterion] = useState('')

  const handleAdd = () => {
    const trimmed = newCriterion.trim()
    if (trimmed && !rubric.includes(trimmed)) {
      onChange([...rubric, trimmed])
      setNewCriterion('')
    }
  }

  const handleRemove = (criterion: string) => {
    onChange(rubric.filter((c) => c !== criterion))
  }

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Custom Rubric Criteria</h3>
      <div className="flex mb-3">
        <input
          type="text"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
          placeholder="Enter new criterion..."
          className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="ml-2 px-3 py-2 rounded-md bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {rubric.length > 0 ? (
        <ul className="space-y-1">
          {rubric.map((c) => (
            <li
              key={c}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm text-gray-800 dark:text-gray-200"
            >
              <span>{c}</span>
              <button
                type="button"
                onClick={() => handleRemove(c)}
                className="text-red-500 dark:text-red-400 hover:underline text-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No custom criteria yet</p>
      )}
    </div>
  )
}
