import React from 'react';
import Navbar from '../components/Navbar';
import MetricsBar from '../components/MetricsBar';
import Board from '../components/Board';
import TaskModal from '../components/TaskModal';
import ActivityDrawer from '../components/ActivityDrawer';
import { Sparkles, GitBranch, ShieldCheck } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Board View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* Banner with Sprint status & quick context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Sprint 12: Core Infrastructure & Features
            </h2>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-indigo-400 font-medium">
                <GitBranch className="w-3.5 h-3.5" /> main branch
              </span>
              <span>•</span>
              <span>10 Total Engineering Work Items</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              REST API Connected
            </span>
          </div>
        </div>

        {/* Metrics Summary Counters */}
        <MetricsBar />

        {/* Interactive Kanban Board */}
        <Board />
      </main>

      {/* Modals & Slide-out Drawers */}
      <TaskModal />
      <ActivityDrawer />
    </div>
  );
};

export default DashboardPage;
