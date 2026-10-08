import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ onNavigate }) => {
  const { login, demoLogin, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please enter both email and password');
      return;
    }

    setSubmitting(true);
    await login(email, password);
    setSubmitting(false);
  };

  const handleDemoClick = async () => {
    setIsDemoSubmitting(true);
    await demoLogin();
    setIsDemoSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-7">
          <div className="inline-flex w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 items-center justify-center text-zinc-100 font-mono font-bold text-sm tracking-wider mb-3 shadow-sm">
            SM
          </div>
          <h1 className="text-lg font-semibold text-zinc-100 tracking-tight">Sign in to DevPulse</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono">StartupMeu Engineering Platform</p>
        </div>

        {/* Auth Card */}
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 shadow-xl">
          {/* Reviewer Quick Access */}
          <div className="mb-5 pb-5 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-zinc-400 font-medium uppercase tracking-wider">
                Assessment Review
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-1.5 py-0.2 rounded">
                <ShieldCheck className="w-2.5 h-2.5" /> Ready
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoClick}
              disabled={isDemoSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            >
              <span>{isDemoSubmitting ? 'Authenticating...' : 'Continue as Demo Reviewer'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <p className="text-[10px] text-zinc-500 text-center mt-2">
              Instant administrator access without signup friction
            </p>
          </div>

          <div className="relative flex py-1 items-center mb-4">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Or credentials
            </span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>

          {/* Error notification */}
          {authError && (
            <div className="mb-4 p-2.5 rounded-md bg-rose-950/30 border border-rose-800/60 flex items-center gap-2 text-rose-400 text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="demo@devpulse.io"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-1.5 px-3 rounded-md bg-zinc-800 hover:bg-zinc-750 text-zinc-200 hover:text-white text-xs font-medium border border-zinc-700 transition-all disabled:opacity-50 mt-1"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Switcher */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-center text-xs text-zinc-500">
            Need an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="font-medium text-zinc-300 hover:text-white ml-1 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] font-mono text-zinc-600 mt-5">
          DevPulse · MERN Assessment · Lovely Professional University
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
