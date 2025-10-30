import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import auth from '../lib/auth';

export default function Settings({ profile, setProfile }) {
  const [local, setLocal] = useState(profile || {});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  // load latest profile from backend when component mounts
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await auth.check();
        if (!mounted) return;
        if (res.ok && res.data?.user) {
          setLocal(prev => ({ ...prev, ...res.data.user }));
          if (setProfile) setProfile(p => ({ ...p, ...res.data.user }));
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false };
  }, [setProfile]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLocal(prev => ({ ...prev, avatar: url }));
  };

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      const payload = {
        username: local.name,
        phone: local.phone,
        bio: local.bio,
      };
      const res = await auth.updateProfile(payload);
      if (res.ok && res.data?.user) {
        setMsg('Saved');
        setProfile && setProfile(prev => ({ ...prev, ...res.data.user }));
        setLocal(prev => ({ ...prev, ...res.data.user }));
      } else {
        setMsg(res.data?.message || 'Save failed');
      }
    } catch (err) {
      setMsg('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 shadow-indigo-100/40">
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            <img src={local?.avatar || 'https://i.pravatar.cc/150?img=5'} alt="avatar" className="w-24 h-24 rounded-full border-4 border-indigo-300 shadow-md" />
            <div className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full">
              <SettingsIcon size={16} />
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
          </label>
          <h2 className="mt-4 text-lg font-semibold">{local?.name || 'Your Name'}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <input type="text" name="name" value={local?.name || ''} onChange={(e)=>setLocal(prev=>({...prev,name:e.target.value}))} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Phone</label>
            <input type="tel" name="phone" value={local?.phone || ''} onChange={(e)=>setLocal(prev=>({...prev,phone:e.target.value}))} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Bio</label>
            <textarea value={local?.bio || ''} onChange={(e)=>setLocal(prev=>({...prev,bio:e.target.value}))} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400" rows={3} />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input type="email" value={local?.email || ''} readOnly className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-xl" />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={save} disabled={saving} className="px-4 py-2 bg-indigo-500 text-white rounded-xl">{saving ? 'Saving...' : 'Save Changes'}</button>
            {msg && <div className="text-sm text-gray-600">{msg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
