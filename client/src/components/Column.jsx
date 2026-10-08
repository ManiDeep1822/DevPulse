import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, CircleDot, AlertCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import { useTasks } from '../context/TaskContext';

const columnConfig = {
  todo: {
    title: 'To Do',
    icon: CircleDot,
    accent: 'border-slate-500/40 text-slate-300',
    indicator: 'bg-slate-400',
    badge: 'bg-slate-800 text-slate-300 border-slate-700'
  },
  in_progress: {
    title: 'In Progress',
    icon: Clock,
    accent: 'border-sky-500/40 text-sky-400',
    indicator: 'bg-sky-400',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30'
  },
  in_review: {
    title: 'In Review',
    icon: AlertCircle,
    accent: 'border-amber-500/40 text-amber-400',
    indicator: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  done: {
    title: 'Done',
    icon: CheckCircle,
    accent: 'border-emerald-500/40 text-emerald-400',
    indicator: 'bg-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  }
};

const Column = ({ status, tasks }) => {
  const { openCreateModal, updateTaskStatus } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const config = columnConfig[status] || columnConfig.todo;
  const Icon = config.icon;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e) => {
    // Only reset if actually leaving the container
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl bg-slate-900/40 border transition-all duration-200 min-h-[500px] p-3 sm:p-4 ${
        isOver
          ? 'border-indigo-500 bg-indigo-950/20 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10'
          : 'border-slate-800/80 hover:border-slate-800'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${config.indicator}`} />
          <h3 className="font-semibold text-sm text-slate-200 tracking-tight">
            {config.title}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${config.badge}`}>
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => openCreateModal(status)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={`Add task to ${config.title}`}
          aria-label={`Add task to ${config.title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-0.5">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div
            onClick={() => openCreateModal(status)}
            className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800/80 rounded-xl p-6 text-center cursor-pointer hover:border-slate-700 hover:bg-slate-800/20 transition-all min-h-[140px]"
          >
            <p className="text-xs text-slate-500 font-medium">No tasks in {config.title}</p>
            <span className="text-[11px] text-indigo-400 hover:text-indigo-300 mt-1 inline-flex items-center gap-1 font-medium">
              <Plus className="w-3 h-3" /> Create one now
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
