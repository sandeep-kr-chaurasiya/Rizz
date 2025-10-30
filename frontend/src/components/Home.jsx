import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MessageSquare, CircleEllipsis, Settings as SettingsIcon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import Status from './Status';
import Settings from './Settings';

export default function Home() {
  const [active, setActive] = useState("Chats");
  const [activeChatId, setActiveChatId] = useState("u1");
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Sandeep Kumar",
    bio: "Engineer. Dreamer. Builder.",
    email: "sandeep@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  });

  const [chats, setChats] = useState([
    { id: "u1", name: "Aisha Khan", avatar: "https://i.pravatar.cc/150?img=32", lastSeen: "online", messages: [ { id: 1, from: "u1", text: "Hey Sandeep — how’s your day going?", ts: Date.now() - 60000 }, { id: 2, from: "me", text: "Pretty good! Working on our chat UI.", ts: Date.now() - 30000 } ] },
    { id: "u2", name: "Ravi Patel", avatar: "https://i.pravatar.cc/150?img=12", lastSeen: "2h ago", messages: [ { id: 1, from: "u2", text: "Can you review my PR?", ts: Date.now() - 40000 } ] },
    { id: "u3", name: "Lina Gomez", avatar: "https://i.pravatar.cc/150?img=45", lastSeen: "online", messages: [ { id: 1, from: "u3", text: "Let’s test the glowing theme later.", ts: Date.now() - 100000 }, { id: 2, from: "me", text: "Yes! Looks smooth so far.", ts: Date.now() - 90000 } ] },
  ]);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSend = (text) => {
    if (!text || !text.trim()) return;
    const newMsg = { id: Date.now(), from: "me", text, ts: Date.now() };
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, messages: [...c.messages, newMsg] } : c));
    setTimeout(() => {
      setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, messages: [...c.messages, { id: Date.now()+1, from: c.id, text: 'Got it 👍', ts: Date.now() }] } : c));
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50 text-gray-900">
      {/* Animated glowing background */}
      <motion.div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-25" animate={{ x: [0, 150, -150, 0], y: [0, -100, 100, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-25 top-1/3 left-1/4" animate={{ x: [0, -120, 120, 0], y: [0, 80, -80, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-25 bottom-10 right-10" animate={{ x: [0, 100, -100, 0], y: [0, -70, 70, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Sidebar */}
      <aside className="bg-white/70 backdrop-blur-xl border-t md:border-t-0 md:border-r border-gray-200 shadow-lg fixed bottom-0 left-0 right-0 md:static flex justify-around md:flex-col md:justify-between items-center px-4 py-3 md:px-6 md:py-8 z-50">
        <div className="flex md:flex-col items-center space-x-6 md:space-x-0 md:space-y-8">
          <div className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">💬</div>

          <nav className="flex md:flex-col items-center space-x-6 md:space-x-0 md:space-y-6 mt-0 md:mt-6">
            {[ { name: 'Chats', icon: <MessageSquare size={22} /> }, { name: 'Status', icon: <CircleEllipsis size={22} /> }, { name: 'Settings', icon: <SettingsIcon size={22} /> } ].map(item => (
              <button key={item.name} onClick={() => setActive(item.name)} className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${active === item.name ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200' : 'hover:bg-indigo-100/70 hover:shadow-md text-gray-700'}`}>
                {item.icon}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:block mb-6">
          <button onClick={() => { localStorage.removeItem('token'); try { navigate('/'); } catch(e) { window.location.href = '/'; } }} className="p-3 rounded-xl hover:bg-white/80 text-gray-700 transition" title="Logout">
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex pb-16 md:pb-0">
        {/* Chat list column (only visible on Chats) */}
        {active === 'Chats' && <ChatList chats={chats} activeChatId={activeChatId} setActiveChatId={setActiveChatId} />}

        {/* Content area changes based on active */}
        {active === 'Chats' && <ChatWindow activeChat={activeChat} onSend={handleSend} />}
        {active === 'Status' && <div className="flex-1"><Status /></div>}
        {active === 'Settings' && <div className="flex-1"><Settings profile={profile} setProfile={setProfile} /></div>}
      </div>
    </div>
  );
}