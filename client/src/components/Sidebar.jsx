import React from 'react';
import { 
  Kanban, 
  ListTodo, 
  History, 
  BarChart2, 
  ShieldCheck, 
  LogOut, 
  ChevronDown, 
  Plus, 
  FolderGit2,
  Clock,
  Layers,
  Sparkles,
  Command
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { user, logout } = useAuth();
  const { 
    tasks, 
    viewMode, 
    setViewMode, 
    openCreateModal, 
    isActivityOpen, 
    setIsActivityOpen, 
    activities,
    priorityFilter,
    setPriorityFilter
  } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'done').length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-zinc-950 border-r border-zinc-800/80 flex flex-col transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Workspace Header */}
      <div className="h-14 border-b border-zinc-800/80 flex items-center justify-between px-3.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-100 font-bold text-xs tracking-wider">
            SM
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-100 truncate">StartupMeu</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                  PROD
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate">Engineering Workspace</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Command className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Action: New Task */}
      <div className="p-3 border-b border-zinc-800/60">
        <button
          onClick={() => openCreateModal('todo')}
          className={`w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold shadow-sm transition-all active:scale-[0.99] ${
            isCollapsed ? 'px-0' : ''
          }`}
          title="New Issue (C)"
        >
          <Plus className="w-4 h-4 shrink-0 stroke-[2.5]" />
          {!isCollapsed && <span>New Issue</span>}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {/* Core Views */}
        <div>
          {!isCollapsed && (
            <p className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Views
            </p>
          )}
          <nav className="space-y-0.5">
            <button
              onClick={() => setViewMode('board')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'board'
                  ? 'bg-zinc-800/80 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
              title="Board View"
            >
              <Kanban className="w-4 h-4 shrink-0 text-zinc-400" />
              {!isCollapsed && <span>Board</span>}
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-zinc-800/80 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
              title="List View"
            >
              <ListTodo className="w-4 h-4 shrink-0 text-zinc-400" />
              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>List</span>
                  <span className="text-[10px] font-mono text-zinc-500">{total}</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setIsActivityOpen(true)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActivityOpen
                  ? 'bg-zinc-800/80 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
              title="Audit & Activity Log"
            >
              <History className="w-4 h-4 shrink-0 text-zinc-400" />
              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>Audit Trail</span>
                  {activities.length > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300">
                      {activities.length}
                    </span>
                  )}
                </div>
              )}
            </button>
          </nav>
        </div>

        {/* Sprint Status & Scope */}
        {!isCollapsed && (
          <div className="pt-2 border-t border-zinc-800/60">
            <p className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Sprint 12
            </p>
            <div className="px-2 py-2 rounded-lg bg-zinc-900/70 border border-zinc-800/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Completion</span>
                <span className="font-mono text-zinc-200 text-[11px] font-semibold">
                  {completed}/{total} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
                <span>Active Cycle</span>
                <span className="text-emerald-400 font-medium">On Track</span>
              </div>
            </div>
          </div>
        )}

        {/* Priority Filters */}
        {!isCollapsed && (
          <div className="pt-2 border-t border-zinc-800/60">
            <p className="px-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Priority Filter
            </p>
            <div className="space-y-0.5">
              {[
                { key: 'all', label: 'All Priorities', dot: 'bg-zinc-500' },
                { key: 'urgent', label: 'Urgent', dot: 'bg-rose-500' },
                { key: 'high', label: 'High', dot: 'bg-amber-500' },
                { key: 'medium', label: 'Medium', dot: 'bg-sky-500' },
                { key: 'low', label: 'Low', dot: 'bg-zinc-400' }
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPriorityFilter(p.key)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                    priorityFilter === p.key
                      ? 'bg-zinc-800 text-zinc-100 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                    <span>{p.label}</span>
                  </div>
                  {p.key !== 'all' && (
                    <span className="text-[10px] font-mono text-zinc-500">
                      {tasks.filter((t) => t.priority === p.key).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer User Info */}
      <div className="p-2.5 border-t border-zinc-800/80 bg-zinc-950">
        <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-md object-cover ring-1 ring-zinc-700 shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-zinc-200 truncate">{user?.name}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
