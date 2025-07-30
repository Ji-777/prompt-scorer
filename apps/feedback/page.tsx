'use client';

import React, { useEffect, useState } from 'react';

type Feedback = {
  rating: number;
  comment: string;
};

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.feedback || []));
  }, []);

  const handleSubmit = async () => {
    await fetch('/api/submit-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment }),
    });

    setSubmitted(true);
    setComment('');
    setRating(5);
    setTimeout(() => setSubmitted(false), 2000);

    const updated = await fetch('/api/feedback').then((res) => res.json());
    setFeedbacks(updated.feedback || []);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 font-sans text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">🚀 PromptCoach – Prompt Quality Evaluator</h1>
        <p className="text-gray-500 mt-2">Helping you write better prompts ✨</p>
      </div>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Submit Your Feedback</h2>

        <label className="block mb-2 text-sm font-medium">Rating (1–5):</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-medium">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what you think..."
          className="w-full p-2 border border-gray-300 rounded mb-4 resize-none h-24"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Feedback
        </button>

        {submitted && (
          <p className="text-green-600 mt-4">✅ Feedback submitted!</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">🗣️ User Feedbacks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((fb, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500"
            >
              <div className="mb-2 text-yellow-500 text-lg">
                {'⭐️'.repeat(fb.rating)}
              </div>
              <p className="text-gray-700 italic">“{fb.comment}”</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
