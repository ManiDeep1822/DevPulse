import React from 'react';
import { X, History, RefreshCw, ArrowRight, Plus, Trash2, Clock } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const actionBadges = {
  created: { label: 'CREATED', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' },
  status_changed: { label: 'MOVED', color: 'text-sky-400 bg-sky-950/40 border-sky-800/60' },
  updated: { label: 'UPDATED', color: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
  deleted: { label: 'DELETED', color: 'text-rose-400 bg-rose-950/40 border-rose-800/60' }
};

const ActivityDrawer = () => {
  const { isActivityOpen, setIsActivityOpen, activities, loadingActivities, fetchActivities } = useTasks();

  if (!isActivityOpen) return null;

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' +
      date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/60 backdrop-blur-sm">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={() => setIsActivityOpen(false)}
      >
        <div 
          className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/40">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-zinc-800 border border-zinc-750 text-zinc-300">
                <History className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-zinc-100">Audit Trail</h3>
                <p className="text-[11px] text-zinc-500 font-mono">Immutable event ledger</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={fetchActivities}
                title="Refresh log"
                className={`p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors ${
                  loadingActivities ? 'animate-spin text-zinc-300' : ''
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsActivityOpen(false)}
                className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Activity Timeline List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activities.map((item) => {
              const badge = actionBadges[item.action] || actionBadges.updated;

              return (
                <div
                  key={item._id}
                  className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors text-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {formatTime(item.createdAt)}
                    </span>
                  </div>

                  <p className="text-zinc-200 text-xs leading-relaxed">
                    {item.details}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-zinc-500">
                    <span>Actor:</span>
                    <span className="text-zinc-300 font-semibold">{item.userName}</span>
                  </div>
                </div>
              );
            })}

            {activities.length === 0 && (
              <div className="text-center py-16 text-zinc-500 text-xs font-mono">
                No audit entries recorded in this session.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDrawer;
