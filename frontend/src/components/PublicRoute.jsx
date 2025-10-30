import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../lib/auth';

export default function PublicRoute({ children }) {
  const [status, setStatus] = useState('loading'); // loading, ok, no

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await auth.check();
        if (!mounted) return;
        if (res.ok) setStatus('ok');
        else setStatus('no');
      } catch (e) {
        if (!mounted) return;
        setStatus('no');
      }
    })();
    return () => { mounted = false };
  }, []);

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Checking...</div>;
  // If authenticated, redirect to home (we don't want logged-in users on public pages)
  if (status === 'ok') return <Navigate to="/home" replace />;
  return children;
}
