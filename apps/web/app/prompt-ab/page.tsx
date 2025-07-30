// M3 - Prompt A/B 比较测试页面
'use client'

import { useState } from 'react'

export default function PromptABPage() {
  const [promptA, setPromptA] = useState('')
  const [promptB, setPromptB] = useState('')
  const [responseA, setResponseA] = useState('')
  const [responseB, setResponseB] = useState('')
  const [voted, setVoted] = useState(false)

  const mockGptResponse = (prompt: string) => {
    // 模拟模型返回（后期替换为 API 请求）
    return `模拟返回：${prompt.slice(0, 20)}...`
  }

  const handleSubmit = () => {
    const resA = mockGptResponse(promptA)
    const resB = mockGptResponse(promptB)
    setResponseA(resA)
    setResponseB(resB)
    setVoted(false)
  }

  const handleVote = (choice: 'A' | 'B' | 'Equal') => {
    const record = {
      promptA,
      promptB,
      responseA,
      responseB,
      vote: choice,
      timestamp: new Date().toISOString()
    }
    // 发请求保存记录到本地文件（后期接 API 写入 JSON 文件）
    console.log('保存记录：', record)
    setVoted(true)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧪 Prompt A/B 测试</h1>
      <p>请输入两个不同提示词进行对比</p>

      <div style={{ marginBottom: '1rem' }}>
        <textarea
          placeholder="Prompt A"
          value={promptA}
          onChange={e => setPromptA(e.target.value)}
          style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
        />
        <textarea
          placeholder="Prompt B"
          value={promptB}
          onChange={e => setPromptB(e.target.value)}
          style={{ width: '100%', height: '100px' }}
        />
      </div>

      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none' }}>
        🚀 提交对比
      </button>

      {responseA && (
        <div style={{ marginTop: '2rem' }}>
          <h3>模型返回结果：</h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <strong>Response A</strong>
              <pre style={{ background: '#f4f4f4', padding: '1rem' }}>{responseA}</pre>
            </div>
            <div style={{ flex: 1 }}>
              <strong>Response B</strong>
              <pre style={{ background: '#f4f4f4', padding: '1rem' }}>{responseB}</pre>
            </div>
          </div>

          {!voted ? (
            <div style={{ marginTop: '1rem' }}>
              <p>你觉得哪个更好？</p>
              <button onClick={() => handleVote('A')} style={{ marginRight: '1rem' }}>🅰️ A 更好</button>
              <button onClick={() => handleVote('B')} style={{ marginRight: '1rem' }}>🅱️ B 更好</button>
              <button onClick={() => handleVote('Equal')}>⚖️ 一样好</button>
            </div>
          ) : (
            <p style={{ marginTop: '1rem', color: 'green' }}>✅ 已记录你的选择！</p>
          )}
        </div>
      )}
    </div>
  )
}
