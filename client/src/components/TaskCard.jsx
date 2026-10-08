import React, { useState } from 'react';
import { 
  Calendar, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  ArrowRight,
  CircleAlert,
  AlertTriangle,
  Minus,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const priorityDetails = {
  urgent: { label: 'Urgent', icon: CircleAlert, color: 'text-rose-400 bg-rose-950/40 border-rose-800/60' },
  high: { label: 'High', icon: AlertTriangle, color: 'text-amber-400 bg-amber-950/40 border-amber-800/60' },
  medium: { label: 'Medium', icon: Minus, color: 'text-sky-400 bg-sky-950/40 border-sky-800/60' },
  low: { label: 'Low', icon: Minus, color: 'text-zinc-400 bg-zinc-800/60 border-zinc-700/60' }
};

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'in_review', label: 'In Review' },
  { value: 'done', label: 'Done' }
];

const TaskCard = ({ task, index }) => {
  const { openEditModal, deleteTask, updateTaskStatus } = useTasks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const priority = priorityDetails[task.priority] || priorityDetails.medium;
  const PriorityIcon = priority.icon;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
  const issueKey = `DEV-${(task._id ? task._id.slice(-3) : '001').toUpperCase()}`;

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
      className={`group rounded-lg bg-zinc-900 border border-zinc-800/90 p-3 transition-all duration-150 cursor-grab active:cursor-grabbing hover:border-zinc-700 hover:bg-zinc-850/80 shadow-sm ${
        isDragging ? 'opacity-30 scale-95 border-zinc-500' : ''
      }`}
    >
      {/* Top Meta: Issue ID & Priority & Options */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-zinc-500 font-semibold tracking-wider">
            {issueKey}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${priority.color}`}
          >
            <PriorityIcon className="w-2.5 h-2.5" />
            <span>{priority.label}</span>
          </span>
        </div>

        {/* Quick Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Options"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>

          {isMenuOpen && (
            <div 
              className="absolute right-0 top-6 z-20 w-40 rounded-md bg-zinc-900 border border-zinc-800 shadow-xl py-1 text-xs"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openEditModal(task);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                <Edit3 className="w-3 h-3 text-zinc-400" />
                Edit Issue
              </button>

              <div className="border-t border-zinc-800 my-1 px-3 py-0.5 text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                Move status
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
                    className="w-full flex items-center gap-2 px-3 py-1 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    {opt.label}
                  </button>
                ))}

              <div className="border-t border-zinc-800 my-1" />
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (window.confirm(`Delete "${task.title}"?`)) {
                    deleteTask(task._id);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-400 hover:bg-rose-950/20"
              >
                <Trash2 className="w-3 h-3" />
                Delete Issue
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h4 
        onClick={() => openEditModal(task)}
        className="text-xs font-medium text-zinc-100 leading-snug hover:text-white transition-colors cursor-pointer mb-2"
      >
        {task.title}
      </h4>

      {/* Description Snippet */}
      {task.description && (
        <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2.5 font-normal">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: Date & Assignee */}
      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-zinc-800/60 text-zinc-500">
        <div className="flex items-center gap-1.5">
          {task.dueDate ? (
            <span
              className={`flex items-center gap-1 font-mono text-[10px] ${
                isOverdue ? 'text-rose-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="font-mono text-[10px] text-zinc-600">—</span>
          )}
        </div>

        {/* Assignee */}
        <div className="flex items-center gap-1.5 text-zinc-400">
          <div className="w-5 h-5 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
            {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="text-[11px] text-zinc-400 max-w-[85px] truncate">
            {task.assignee || 'Unassigned'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
