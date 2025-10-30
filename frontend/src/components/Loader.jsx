import React from 'react';
import { motion } from "framer-motion";

export default function Loader({ size = 12, label = 'Checking authentication...' }) {
  // size in Tailwind units (w-12 -> 3rem)
  const dim = `w-${size} h-${size}`;
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Animated glowing background */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30 top-40 left-1/3"
        animate={{ x: [0, -120, 120, 0], y: [0, 60, -60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-pink-400 rounded-full blur-3xl opacity-30 bottom-20 right-10"
        animate={{ x: [0, 80, -80, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex flex-col items-center gap-4">
        <div
          className={`rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin shadow-[0_0_20px_rgba(99,102,241,0.6)] ${dim}`}
          style={{ borderTopColor: '#6366f1' }}
        />
        {label && <div className="text-sm text-gray-600">{label}</div>}
      </div>
    </div>
  );
}
