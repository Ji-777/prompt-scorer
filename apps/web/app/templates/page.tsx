// 服务端组件：加载模板列表
import { createSupabaseServerClient } from '../../utils/supabase/serverClient'


import TemplateCard from '@/components/TemplateCard'
import TemplateList from '@/components/TemplateList'

export const revalidate = 0 // 每次访问都重新拉取模板数据

export default async function TemplatesPage() {
  const supabase = await createSupabaseServerClient()

  const { data: templates, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading templates:', error.message)
  }

  const categories: string[] = Array.from(
    new Set((templates ?? []).map((t: any) => t.category).filter(Boolean))
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Prompt Templates</h1>

      {categories.length > 1 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by category
          </p>
          <TemplateList categories={categories} templates={templates ?? []} />
        </div>
      )}

      {categories.length <= 1 && (
        <div className="space-y-4">
          {(templates ?? []).map((template: any) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}
