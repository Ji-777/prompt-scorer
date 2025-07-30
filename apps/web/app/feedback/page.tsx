'use client';

import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';

interface Feedback {
  id: number;
  user: string;
  comment: string;
  rating: number;
  timestamp: string;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  // 获取 feedback.json 数据
  useEffect(() => {
    fetch('/feedback.json')
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);

  const handleSubmit = async () => {
    if (!comment.trim()) return alert('Please enter a comment!');
    const newFeedback: Feedback = {
      id: Date.now(),
      user: 'Anonymous',
      comment,
      rating,
      timestamp: new Date().toISOString(),
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    setComment('');
    setRating(5);

    const res = await fetch('/api/saveFeedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });

    if (!res.ok) alert('Failed to save feedback!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ fontSize: '28px' }}>🌟 <strong>User Feedback</strong></h1>

      {/* 表单区 */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', background: '#fafafa' }}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          Rating (1-5):  
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={1}
            max={5}
            style={{ width: '60px', marginLeft: '10px', padding: '4px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '8px' }}>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="💬 Leave your thoughts here..."
            rows={3}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '4px', resize: 'none' }}
          />
        </label>

        <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '8px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit Feedback
        </button>
      </div>

      {/* 展示区 */}
      <h2 style={{ fontSize: '22px' }}>📝 <strong>All Feedbacks:</strong></h2>

      {feedbacks.length === 0 ? (
        <p style={{ marginTop: '10px', color: '#999' }}>No feedback yet. Be the first to share! ✨</p>
      ) : (
        feedbacks.map((fb) => (
          <div key={fb.id} style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
            <p style={{ margin: '4px 0' }}>⭐ <strong>Rating:</strong> {fb.rating}</p>
            <p style={{ margin: '4px 0' }}>💬 <strong>Comment:</strong> {fb.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
