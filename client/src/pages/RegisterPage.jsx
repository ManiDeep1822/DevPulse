import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = ({ onNavigate }) => {
  const { register, authError, setAuthError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setAuthError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    await register(name, email, password);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="inline-flex w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 items-center justify-center text-zinc-100 font-mono font-bold text-sm tracking-wider mb-3 shadow-sm">
            SM
          </div>
          <h1 className="text-lg font-semibold text-zinc-100 tracking-tight">Create DevPulse Account</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono">StartupMeu Engineering Workspace</p>
        </div>

        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 shadow-xl">
          {authError && (
            <div className="mb-4 p-2.5 rounded-md bg-rose-950/30 border border-rose-800/60 flex items-center gap-2 text-rose-400 text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Mani Deep"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="engineer@startupmeu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-3 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-all disabled:opacity-50 mt-1"
            >
              {submitting ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-center text-xs text-zinc-500">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-medium text-zinc-300 hover:text-white ml-1 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
