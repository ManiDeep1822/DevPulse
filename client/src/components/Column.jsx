import React, { useState } from 'react';
import { Plus, CircleDot, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import { useTasks } from '../context/TaskContext';

const columnStyles = {
  todo: {
    title: 'To Do',
    icon: CircleDot,
    indicator: 'bg-zinc-500',
    countBadge: 'text-zinc-400 bg-zinc-800/80 border-zinc-700/60'
  },
  in_progress: {
    title: 'In Progress',
    icon: Clock,
    indicator: 'bg-sky-400',
    countBadge: 'text-sky-400 bg-sky-950/40 border-sky-800/60'
  },
  in_review: {
    title: 'In Review',
    icon: AlertCircle,
    indicator: 'bg-amber-400',
    countBadge: 'text-amber-400 bg-amber-950/40 border-amber-800/60'
  },
  done: {
    title: 'Done',
    icon: CheckCircle,
    indicator: 'bg-emerald-400',
    countBadge: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60'
  }
};

const Column = ({ status, tasks }) => {
  const { openCreateModal, updateTaskStatus } = useTasks();
  const [isOver, setIsOver] = useState(false);

  const style = columnStyles[status] || columnStyles.todo;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = (e) => {
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
      className={`flex flex-col rounded-xl bg-zinc-900/30 border transition-all duration-150 min-h-[580px] p-2.5 ${
        isOver
          ? 'border-zinc-500 bg-zinc-900/60 ring-1 ring-zinc-500'
          : 'border-zinc-800/80'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${style.indicator}`} />
          <h3 className="font-semibold text-xs text-zinc-200 tracking-tight">
            {style.title}
          </h3>
          <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-semibold border ${style.countBadge}`}>
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => openCreateModal(status)}
          className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          title={`Add issue to ${style.title}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Issues list */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-0.5">
        {tasks.map((task, idx) => (
          <TaskCard key={task._id} task={task} index={idx} />
        ))}

        {tasks.length === 0 && (
          <div
            onClick={() => openCreateModal(status)}
            className="flex-1 flex flex-col items-center justify-center border border-dashed border-zinc-800/80 rounded-lg p-5 text-center cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all min-h-[120px]"
          >
            <p className="text-[11px] text-zinc-500 font-medium">No issues in {style.title}</p>
            <span className="text-[10px] text-zinc-400 hover:text-zinc-200 mt-1 inline-flex items-center gap-1 font-mono">
              <Plus className="w-3 h-3" /> New Issue
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
