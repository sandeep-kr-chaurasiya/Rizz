import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../lib/auth';
import Loader from './Loader';

export default function PrivateRoute({ children }) {
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

  if (status === 'loading') return <Loader label="Loading..." />;
  if (status === 'no') return <Navigate to="/" replace />;
  return children;
}
