import React, { useState } from 'react';
import { 
  Calendar, 
  Tag, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ArrowRightCircle, 
  UserCheck 
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const priorityConfig = {
  urgent: {
    label: 'Urgent',
    badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    indicator: 'bg-rose-500'
  },
  high: {
    label: 'High',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    indicator: 'bg-amber-500'
  },
  medium: {
    label: 'Medium',
    badge: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    indicator: 'bg-sky-500'
  },
  low: {
    label: 'Low',
    badge: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    indicator: 'bg-slate-400'
  }
};

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'in_review', label: 'In Review' },
  { value: 'done', label: 'Done' }
];

const TaskCard = ({ task }) => {
  const { openEditModal, deleteTask, updateTaskStatus } = useTasks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const priorityStyle = priorityConfig[task.priority] || priorityConfig.medium;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task._id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`group relative rounded-xl bg-slate-900 border border-slate-800 p-4 transition-all duration-200 cursor-grab active:cursor-grabbing hover:border-slate-700 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 ${
        isDragging ? 'opacity-40 scale-95 border-indigo-500 shadow-indigo-500/20' : ''
      }`}
    >
      {/* Header: Priority & Menu */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${priorityStyle.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.indicator}`} />
          {priorityStyle.label}
        </span>

        {/* Quick Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Task options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {isMenuOpen && (
            <div 
              className="absolute right-0 top-6 z-20 w-44 rounded-lg bg-slate-800 border border-slate-700 shadow-xl py-1 text-xs"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openEditModal(task);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:bg-slate-700/60 hover:text-white"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                Edit Task
              </button>

              <div className="border-t border-slate-700 my-1 px-3 py-1 text-[10px] text-slate-400 font-semibold uppercase">
                Move to...
              </div>
              {statusOptions
                .filter((s) => s.value !== task.status)
                .map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setIsMenuOpen(false);
                      updateTaskStatus(task._id, opt.value);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1 text-slate-300 hover:bg-slate-700/60 hover:text-white"
                  >
                    <ArrowRightCircle className="w-3 h-3 text-sky-400" />
                    {opt.label}
                  </button>
                ))}

              <div className="border-t border-slate-700 my-1" />
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (window.confirm(`Delete task "${task.title}"?`)) {
                    deleteTask(task._id);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h4 
        onClick={() => openEditModal(task)}
        className="font-semibold text-sm text-slate-100 hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 mb-1.5"
      >
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 font-normal leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-slate-800/80 border border-slate-700/80 text-slate-300 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer: Due Date & Assignee */}
      <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5">
          {task.dueDate ? (
            <span
              className={`flex items-center gap-1 text-[11px] font-medium ${
                isOverdue ? 'text-rose-400' : 'text-slate-400'
              }`}
              title={isOverdue ? 'Overdue' : 'Due date'}
            >
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">No due date</span>
          )}
        </div>

        {/* Assignee */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold">
            {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="text-[11px] font-medium text-slate-300 max-w-[90px] truncate">
            {task.assignee || 'Unassigned'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
