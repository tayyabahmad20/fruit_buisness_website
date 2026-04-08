import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('freshlux_admin_token', data.token || 'logged_in');
        navigate('/admin/dashboard');
        return;
      }
    } catch (_) {}

    // Demo fallback
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('freshlux_admin_token', 'demo_token');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="glass-card w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <span className="text-5xl">🔐</span>
          <h1 className="text-2xl font-extrabold mt-3" style={{ color: 'var(--text-primary)' }}>Admin Login</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>FreshLux Admin Panel</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] outline-none focus:border-fl-green transition"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-fl-green to-fl-orange text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-60 text-lg mt-2"
          >
            {loading ? 'Logging in…' : 'Login →'}
          </button>
        </form>
        <p className="text-center text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>Demo: admin / admin123</p>
      </div>
    </div>
  );
}
