import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-200 p-4">
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
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Hi 👋</h1>
        <p className="text-center text-gray-700 mb-6">Welcome — create an account to get started.</p>
        <div className="space-y-4">
          <Link to="/signup" className="block w-full text-center py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg font-semibold">Sign Up</Link>
          <Link to="/login" className="block w-full text-center py-3 border border-gray-200 rounded-lg font-medium">Log In</Link>
        </div>
      </div>
    </div>
  );
}
