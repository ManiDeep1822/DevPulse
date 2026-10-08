import React from 'react';
import { 
  Kanban, 
  ListTodo, 
  Search, 
  Plus, 
  History, 
  SlidersHorizontal, 
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TopHeader = ({ isSidebarCollapsed }) => {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    openCreateModal,
    isActivityOpen,
    setIsActivityOpen,
    activities,
    filteredTasks,
    tasks
  } = useTasks();

  return (
    <header className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/80 px-4 sm:px-6 py-2.5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Breadcrumbs & View Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="font-semibold text-zinc-300">StartupMeu</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-400">Projects</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="font-medium text-zinc-100 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[11px]">
              Sprint 12
            </span>
          </nav>

          {/* View Switcher: Board vs List */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5 text-xs">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-all ${
                viewMode === 'board'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            {filteredTasks.length} of {tasks.length} issues
          </span>
        </div>

        {/* Right: Search, Filter, Activity, New Issue */}
        <div className="flex items-center gap-2.5 flex-1 max-w-xl justify-end">
          {/* High-density search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by title, tag, or owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-md pl-8 pr-3 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500 hover:text-zinc-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900/80 border border-zinc-800 rounded-md px-2.5 py-1 text-xs text-zinc-300 hover:border-zinc-700 focus:outline-none focus:border-zinc-700 cursor-pointer hidden sm:block"
          >
            <option value="all">All Columns</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="in_review">In Review</option>
            <option value="done">Done</option>
          </select>

          {/* Activity Drawer Toggle */}
          <button
            onClick={() => setIsActivityOpen(!isActivityOpen)}
            className={`p-1.5 rounded-md border text-xs font-medium transition-colors relative ${
              isActivityOpen
                ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850'
            }`}
            title="Audit Trail"
          >
            <History className="w-3.5 h-3.5" />
            {activities.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          {/* Create Button */}
          <button
            onClick={() => openCreateModal('todo')}
            className="flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold px-3 py-1 rounded-md shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">New Issue</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
