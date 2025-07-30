'use client';
import { useState } from 'react';

export default function EvaluatePage() {
  const [input, setInput] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null); // ✅ 新增：用于显示保存状态

  const handleEvaluate = async () => {
    const calculatedScore = Math.min(100, input.length + Math.floor(Math.random() * 10));
    setScore(calculatedScore);
    setStatus(null); // 清除旧状态

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          score: calculatedScore,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to save. Status: ${res.status}`);
      }

      setStatus('✅ Saved successfully');
    } catch (err) {
      console.error('Error saving:', err);
      setStatus('❌ Failed to save. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1><strong>Prompt Evaluator</strong></h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
        cols={40}
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={handleEvaluate}>Evaluate</button>
      {score !== null && <p><strong>Score:</strong> {score}</p>}
      {status && <p style={{ marginTop: '1rem', color: status.startsWith('✅') ? 'green' : 'red' }}>{status}</p>}
    </div>
  );
}
