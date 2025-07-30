// apps/web/lib/scoreModel.ts

// ✅ 模拟评分和建议，不调用任何外部 API
export async function scorePromptWithRubric(prompt: string, rubric: string[]) {
  const score = Math.floor(Math.random() * 41) + 60 // 生成一个 60-100 的分数

  const suggestions = [
    'Try making your prompt more specific.',
    'Consider defining the desired tone or audience.',
    'Add examples to clarify the expected output.'
  ]

  return { score, suggestions }
}
