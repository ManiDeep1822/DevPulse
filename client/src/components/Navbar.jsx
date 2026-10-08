import React from 'react';
import { 
  Kanban, 
  Search, 
  Plus, 
  History, 
  LogOut, 
  Filter, 
  Sparkles,
  User as UserIcon 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    openCreateModal,
    isActivityOpen,
    setIsActivityOpen,
    activities
  } = useTasks();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Workspace Title */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Kanban className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">DevPulse</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Sprint 12
                </span>
              </div>
              <p className="text-xs text-slate-400">Agile Engineering Workspace</p>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => openCreateModal('todo')}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow"
              aria-label="New Task"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsActivityOpen(!isActivityOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white relative"
              aria-label="Activity"
            >
              <History className="w-5 h-5" />
              {activities.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-500" />
              )}
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-1 items-center space-x-3 max-w-xl w-full">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks, tags, or assignees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Priority filter */}
          <div className="relative flex items-center">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none bg-slate-950/60 border border-slate-800 rounded-lg pl-8 pr-7 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Right side Actions & User Profile */}
        <div className="hidden md:flex items-center space-x-3">
          {/* New Task button */}
          <button
            onClick={() => openCreateModal('todo')}
            className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>

          {/* Activity Drawer Toggle */}
          <button
            onClick={() => setIsActivityOpen(!isActivityOpen)}
            className={`flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors relative ${
              isActivityOpen
                ? 'bg-indigo-950/50 border-indigo-500/50 text-indigo-300'
                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 text-indigo-400" />
            <span>Activity</span>
            {activities.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500 text-white font-bold">
                {activities.length}
              </span>
            )}
          </button>

          {/* User info & logout */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
            <div className="flex items-center space-x-2">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-200 leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-400 capitalize mt-0.5">{user?.role || 'Developer'}</p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
