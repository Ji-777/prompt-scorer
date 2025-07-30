'use client'

export default function TemplateCard({
  template,
}: {
  template: any
}) {
  return (
    <div className="border p-4 rounded-md dark:border-gray-700">
      <h2 className="text-lg font-semibold">{template.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {template.description}
      </p>
    </div>
  )
}
