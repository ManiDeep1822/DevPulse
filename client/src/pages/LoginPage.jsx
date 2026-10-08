import React, { useState } from 'react';
import { Kanban, Sparkles, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradient glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 items-center justify-center shadow-xl shadow-indigo-600/30 ring-1 ring-white/20 mb-3">
            <Kanban className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome to DevPulse</h1>
          <p className="text-xs text-slate-400 mt-1">Full-Stack MERN Agile Kanban Workspace</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Quick Evaluator Access Banner */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>StartupMeu Evaluator Access</span>
            </div>
            <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
              Test all full-stack features, kanban workflows, and seeded tasks instantly with one click.
            </p>
            <button
              type="button"
              onClick={handleDemoClick}
              disabled={isDemoSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isDemoSubmitting ? 'Authenticating Demo...' : '⚡ 1-Click Demo Login (Admin)'}</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Or sign in with email
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          {/* Error notification */}
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="demo@devpulse.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all disabled:opacity-50 mt-2"
            >
              <span>{submitting ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="font-semibold text-indigo-400 hover:text-indigo-300 ml-1 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          DevPulse Assessment Project · Built by Mani Deep
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
