import React, { useRef, useEffect } from 'react';

export default function ChatWindow({ activeChat, onSend }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  if (!activeChat) return (
    <div className="flex-1 flex items-center justify-center text-gray-500">No chat selected</div>
  );

  return (
    <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold text-gray-900">{activeChat.name}</div>
            <div className="text-xs text-gray-500">{activeChat.lastSeen}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {activeChat.messages.map((m) => (
          <div key={m.id} className={`max-w-xl px-4 py-3 rounded-3xl ${m.from === 'me' ? 'ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' : 'mr-auto bg-white/90 border border-gray-200 text-gray-800'}`}>
            <div>{m.text}</div>
            <div className="text-xs text-gray-400 mt-1 text-right">{new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <form onSubmit={(e) => { e.preventDefault(); const val = e.target.elements.msg.value; onSend(val); e.target.reset(); }} className="flex items-center gap-3">
          <input name="msg" placeholder="Type a message..." className="flex-1 px-5 py-3 rounded-full bg-white/80 border border-gray-300 outline-none shadow-inner focus:ring-2 focus:ring-indigo-300" />
          <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md">Send</button>
        </form>
      </div>
    </div>
  );
}
