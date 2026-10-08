import React from 'react';
import { X, History, RefreshCw, Clock, ArrowRight, UserCheck, Trash2, PlusCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const actionIcons = {
  created: PlusCircle,
  status_changed: ArrowRight,
  updated: Clock,
  deleted: Trash2
};

const actionStyles = {
  created: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  status_changed: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  updated: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  deleted: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={() => setIsActivityOpen(false)}
      >
        <div 
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white tracking-tight">Audit & Activity Log</h3>
                <p className="text-xs text-slate-400">Live timeline of project updates</p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={fetchActivities}
                title="Refresh log"
                className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                  loadingActivities ? 'animate-spin text-indigo-400' : ''
                }`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsActivityOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Activity Timeline List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {activities.map((item) => {
              const ActionIcon = actionIcons[item.action] || Clock;
              const badgeStyle = actionStyles[item.action] || actionStyles.updated;

              return (
                <div
                  key={item._id}
                  className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${badgeStyle}`}>
                    <ActionIcon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200">
                      {item.userName}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed break-words">
                      {item.details}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1.5 font-medium">
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}

            {activities.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs">
                No activity logs recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDrawer;
