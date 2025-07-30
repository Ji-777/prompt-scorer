import React, { useState } from 'react';

export default function FeedbackRating({ promptId, onSubmit }) {
  const [rating, setRating] = useState(null); // 'up' or 'down'
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating) {
      alert("Please select 👍 or 👎 before submitting.");
      return;
    }

    const data = {
      promptId,
      score: rating,
      feedback,
      timestamp: new Date().toISOString(),
    };

    // ✅ Save to localStorage grouped by date
    const todayKey = `feedback_${new Date().toISOString().slice(0, 10)}`;
    const existing = JSON.parse(localStorage.getItem(todayKey) || '[]');
    existing.push(data);
    localStorage.setItem(todayKey, JSON.stringify(existing));

    console.log("✅ Feedback saved to localStorage:", data);

    onSubmit?.(data);
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="text-green-600 mt-2">✅ Thank you for your feedback!</div>;
  }

  return (
    <div className="border-t mt-4 pt-4">
      <div className="text-sm font-medium mb-2">How helpful was this response?</div>
      <div className="flex space-x-4 mb-2">
        <button
          className={`p-2 border rounded ${rating === 'up' ? 'bg-green-100' : ''}`}
          onClick={() => setRating('up')}
        >
          👍 Yes, helpful
        </button>
        <button
          className={`p-2 border rounded ${rating === 'down' ? 'bg-red-100' : ''}`}
          onClick={() => setRating('down')}
        >
          👎 Not really
        </button>
      </div>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={2}
        placeholder="Optional: What did you like or dislike?"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-1 rounded"
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
    </div>
  );
}
