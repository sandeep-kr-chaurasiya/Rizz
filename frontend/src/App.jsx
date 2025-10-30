import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Landing from './components/Landing.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import auth from './lib/auth'

function App() {
  useEffect(() => {
    // On app load validate stored token and redirect to /home if valid
    (async () => {
      try {
        const res = await auth.check();
        if (res.ok) window.history.replaceState({}, '', '/home');
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  return (
    <>
      <Routes>
    <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      </Routes>
    </>
  )
}

export default App
