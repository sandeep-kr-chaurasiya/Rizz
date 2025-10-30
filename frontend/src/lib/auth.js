const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5050';
const STORAGE_KEY = 'token';

async function request(path, options = {}) {
  const headers = options.headers || {};
  const token = localStorage.getItem(STORAGE_KEY);
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(API_BASE + path, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data: json };
}

export async function signup({ username, email, password }) {
  return request('/auth/signup', { method: 'POST', body: { username, email, password } });
}

export async function login({ email, password }) {
  return request('/auth/login', { method: 'POST', body: { email, password } });
}

export async function check() {
  return request('/auth/check', { method: 'GET' });
}

export async function updateProfile(payload) {
  return request('/auth/profile', { method: 'PATCH', body: payload });
}

export function setToken(token) {
  if (!token) return;
  localStorage.setItem(STORAGE_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(STORAGE_KEY);
}

export default { API_BASE, signup, login, check, updateProfile, setToken, removeToken };
