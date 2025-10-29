import { useEffect } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Landing from './components/Landing.jsx'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // On app load, check if a token exists and validate it with backend
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // not logged in

        const res = await fetch('http://localhost:5050/auth/check', {
          headers: { Authorization: token },
        });
        if (res.ok) {
          navigate('/home');
        } else {
          // invalid token -> remove
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Auth check failed', err);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
