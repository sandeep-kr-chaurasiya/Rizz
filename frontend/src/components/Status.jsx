import React, { useState } from 'react';

export default function Status() {
  const [statuses, setStatuses] = useState([{
    id: 1,
    text: 'Available to chat!',
    ts: Date.now() - 1000 * 60 * 60,
  }]);
  const [text, setText] = useState('');

  const addStatus = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setStatuses(prev => [{ id: Date.now(), text: text.trim(), ts: Date.now() }, ...prev]);
    setText('');
  };

  return (
    <div className="p-8 text-gray-600 w-full">
      <h2 className="text-2xl font-semibold mb-4">Status</h2>
      <p className="mb-4 text-gray-500">Share a short status with your network.</p>

      <form onSubmit={addStatus} className="flex gap-3 mb-6">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="What's up?" className="flex-1 px-4 py-2 rounded-lg border" />
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">Post</button>
      </form>

      <div className="space-y-4">
        {statuses.map(s => (
          <div key={s.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-sm text-gray-700">{s.text}</div>
            <div className="text-xs text-gray-400 mt-2">{new Date(s.ts).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
