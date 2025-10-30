import React from 'react';
import { motion } from 'framer-motion';

export default function ChatList({ chats, activeChatId, setActiveChatId }) {
  return (
    <div className="w-72 bg-white/60 backdrop-blur-2xl border-r border-gray-200 p-4 overflow-y-auto hidden md:block shadow-lg shadow-indigo-100/30">
      <h2 className="font-semibold text-gray-700 mb-4">Chats</h2>
      <div className="space-y-3">
        {chats.map((c) => (
          <motion.div
            key={c.id}
            layout
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveChatId(c.id)}
            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition ${
              activeChatId === c.id ? 'bg-gradient-to-r from-blue-100 to-purple-100 shadow' : 'hover:bg-white/80'
            }`}
          >
            <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-900 truncate">{c.name}</p>
                <span className="text-xs text-gray-500">{c.lastSeen}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{c.messages[c.messages.length - 1]?.text || 'No messages'}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
