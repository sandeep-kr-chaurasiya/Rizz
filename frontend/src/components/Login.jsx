import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import auth from '../lib/auth'

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await auth.login({ email: formData.email, password: formData.password });
      if (res.ok && res.data?.jwtToken) {
        auth.setToken(res.data.jwtToken);
        navigate('/home');
      } else {
        setError(res.data?.message || 'Login failed');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-8 z-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 drop-shadow-sm">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-900"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-900"
            required
          />
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px #a855f7" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg text-white font-semibold shadow-md"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-purple-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-center text-sm text-red-600 mt-4">{error}</p>}
      </motion.div>
    </div>
  );
}