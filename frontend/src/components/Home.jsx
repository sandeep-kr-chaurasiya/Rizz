import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, CircleEllipsis, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [active, setActive] = useState("Chats");
  const [activeChatId, setActiveChatId] = useState("u1");

  const [profile, setProfile] = useState({
    name: "Sandeep Kumar",
    bio: "Engineer. Dreamer. Builder.",
    email: "sandeep@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  });

  const [chats, setChats] = useState([
    {
      id: "u1",
      name: "Aisha Khan",
      avatar: "https://i.pravatar.cc/150?img=32",
      lastSeen: "online",
      messages: [
        { id: 1, from: "u1", text: "Hey Sandeep — how’s your day going?", ts: Date.now() - 60000 },
        { id: 2, from: "me", text: "Pretty good! Working on our chat UI.", ts: Date.now() - 30000 },
      ],
    },
    {
      id: "u2",
      name: "Ravi Patel",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastSeen: "2h ago",
      messages: [{ id: 1, from: "u2", text: "Can you review my PR?", ts: Date.now() - 40000 }],
    },
    {
      id: "u3",
      name: "Lina Gomez",
      avatar: "https://i.pravatar.cc/150?img=45",
      lastSeen: "online",
      messages: [
        { id: 1, from: "u3", text: "Let’s test the glowing theme later.", ts: Date.now() - 100000 },
        { id: 2, from: "me", text: "Yes! Looks smooth so far.", ts: Date.now() - 90000 },
      ],
    },
  ]);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    const newMsg = { id: Date.now(), from: "me", text, ts: Date.now() };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );

    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: Date.now() + 1, from: c.id, text: "Got it 👍", ts: Date.now() },
                ],
              }
            : c
        )
      );
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside
        className="bg-white/70 backdrop-blur-xl border-t md:border-t-0 md:border-r border-gray-200 shadow-lg 
                   fixed bottom-0 left-0 right-0 md:static flex justify-around md:flex-col md:justify-between 
                   items-center py-2 md:py-6 z-50"
      >
        <div className="flex md:flex-col items-center space-x-6 md:space-x-0 md:space-y-8">
          <div className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">💬</div>

          <nav className="flex md:flex-col items-center space-x-6 md:space-x-0 md:space-y-6 mt-0 md:mt-6">
            {[
              { name: "Chats", icon: <MessageSquare size={22} /> },
              { name: "Status", icon: <CircleEllipsis size={22} /> },
              { name: "Settings", icon: <Settings size={22} /> },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`p-2 md:p-3 rounded-xl transition ${
                  active === item.name
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md"
                    : "hover:bg-white/80 text-gray-700"
                }`}
              >
                {item.icon}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:block mb-6">
          <button
            onClick={() => alert('Logging out...')}
            className="p-3 rounded-xl hover:bg-white/80 text-gray-700 transition"
            title="Logout"
          >
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex pb-16 md:pb-0">
        {/* Chat list */}
        {active === "Chats" && (
          <div className="w-72 bg-white/70 backdrop-blur-xl border-r border-gray-200 p-4 overflow-y-auto hidden md:block">
            <h2 className="font-semibold text-gray-700 mb-4">Chats</h2>
            <div className="space-y-3">
              {chats.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveChatId(c.id)}
                  className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition ${
                    activeChatId === c.id
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 shadow"
                      : "hover:bg-white/80"
                  }`}
                >
                  <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-900 truncate">{c.name}</p>
                      <span className="text-xs text-gray-500">{c.lastSeen}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {c.messages[c.messages.length - 1]?.text || "No messages"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Chat window */}
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl">
          {active === "Chats" && (
            <>
              {/* Chat header */}
              <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{activeChat.name}</div>
                    <div className="text-xs text-gray-500">{activeChat.lastSeen}</div>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {activeChat.messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-xl p-3 rounded-2xl ${
                      m.from === "me"
                        ? "ml-auto bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow"
                        : "mr-auto bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <div>{m.text}</div>
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(e.target.elements.msg.value);
                    e.target.reset();
                  }}
                  className="flex items-center gap-3"
                >
                  <input
                    name="msg"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 text-white font-semibold"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          )}

          {active === "Status" && (
            <div className="p-8 text-gray-600">
              <h2 className="text-2xl font-semibold">Status</h2>
              <p className="mt-4">No status updates yet — coming soon.</p>
            </div>
          )}

          {active === "Settings" && (
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                  <label className="relative cursor-pointer">
                    <img
                      src={profile?.avatar || "https://i.pravatar.cc/150?img=5"}
                      alt="avatar"
                      className="w-24 h-24 rounded-full border-4 border-indigo-300 shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full">
                      <Settings size={16} />
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setProfile((prev) => ({ ...prev, avatar: url }));
                        }
                      }}
                    />
                  </label>
                  <h2 className="mt-4 text-lg font-semibold">
                    {profile?.name || "Your Name"}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile?.name || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Bio</label>
                    <textarea
                      name="bio"
                      value={profile?.bio || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, bio: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      rows="3"
                      placeholder="Write something about yourself..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <input
                      type="email"
                      value={profile?.email || "you@example.com"}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-xl"
                    />
                  </div>
                  <button className="w-full bg-indigo-500 text-white py-2 rounded-xl mt-4 font-medium shadow-md hover:bg-indigo-600 transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}