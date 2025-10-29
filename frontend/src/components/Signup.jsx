import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-200 p-4 relative overflow-hidden">
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 opacity-30 blur-3xl"></div>
        <h2 className="relative text-3xl font-bold text-gray-900 text-center mb-8 drop-shadow-sm">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-900"
            required
          />
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px #60a5fa" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg text-white font-semibold shadow-md"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}