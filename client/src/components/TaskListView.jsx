import React from 'react';
import { 
  CircleDot, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  Edit3, 
  Trash2, 
  User, 
  MoreHorizontal 
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const statusConfig = {
  todo: { label: 'To Do', icon: CircleDot, color: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-sky-400 bg-sky-950/40 border-sky-800/60' },
  in_review: { label: 'In Review', icon: AlertCircle, color: 'text-amber-400 bg-amber-950/40 border-amber-800/60' },
  done: { label: 'Done', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60' }
};

const priorityConfig = {
  urgent: { label: 'Urgent', dot: 'bg-rose-500', text: 'text-rose-400' },
  high: { label: 'High', dot: 'bg-amber-500', text: 'text-amber-400' },
  medium: { label: 'Medium', dot: 'bg-sky-500', text: 'text-sky-400' },
  low: { label: 'Low', dot: 'bg-zinc-500', text: 'text-zinc-400' }
};

const TaskListView = () => {
  const { filteredTasks, openEditModal, deleteTask, updateTaskStatus } = useTasks();

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-3 px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
        <div className="col-span-5 sm:col-span-5 flex items-center gap-2">Issue Title</div>
        <div className="col-span-3 sm:col-span-2">Status</div>
        <div className="col-span-2 sm:col-span-2">Priority</div>
        <div className="col-span-2 sm:col-span-1 hidden md:block">Due Date</div>
        <div className="col-span-2 sm:col-span-1 hidden lg:block">Assignee</div>
        <div className="col-span-2 sm:col-span-1 text-right">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-800/60">
        {filteredTasks.map((task, index) => {
          const statusInfo = statusConfig[task.status] || statusConfig.todo;
          const priorityInfo = priorityConfig[task.priority] || priorityConfig.medium;
          const issueCode = `DEV-${100 + index}`;

          return (
            <div
              key={task._id}
              className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-zinc-800/40 transition-colors text-xs group"
            >
              {/* Title & Issue Key */}
              <div className="col-span-5 sm:col-span-5 flex items-center gap-3 min-w-0">
                <span className="font-mono text-[11px] text-zinc-500 shrink-0">
                  {issueCode}
                </span>
                <div className="min-w-0">
                  <p 
                    onClick={() => openEditModal(task)}
                    className="font-medium text-zinc-100 hover:text-white cursor-pointer truncate"
                  >
                    {task.title}
                  </p>
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {task.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] text-zinc-500 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Selector */}
              <div className="col-span-3 sm:col-span-2">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                  className={`text-[11px] font-medium px-2 py-0.5 rounded border bg-transparent cursor-pointer focus:outline-none ${statusInfo.color}`}
                >
                  <option value="todo" className="bg-zinc-900 text-zinc-100">To Do</option>
                  <option value="in_progress" className="bg-zinc-900 text-zinc-100">In Progress</option>
                  <option value="in_review" className="bg-zinc-900 text-zinc-100">In Review</option>
                  <option value="done" className="bg-zinc-900 text-zinc-100">Done</option>
                </select>
              </div>

              {/* Priority */}
              <div className="col-span-2 sm:col-span-2 flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dot}`} />
                <span className={`text-[11px] font-medium capitalize ${priorityInfo.text}`}>
                  {priorityInfo.label}
                </span>
              </div>

              {/* Due Date */}
              <div className="col-span-2 sm:col-span-1 hidden md:flex items-center gap-1 text-[11px] text-zinc-400">
                <Calendar className="w-3 h-3 text-zinc-500" />
                <span>{formatDate(task.dueDate)}</span>
              </div>

              {/* Assignee */}
              <div className="col-span-2 sm:col-span-1 hidden lg:flex items-center gap-1.5 text-zinc-300">
                <div className="w-5 h-5 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                  {task.assignee?.charAt(0) || 'U'}
                </div>
                <span className="truncate text-[11px] text-zinc-400">{task.assignee}</span>
              </div>

              {/* Actions */}
              <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-1">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                  title="Edit Issue"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${task.title}"?`)) {
                      deleteTask(task._id);
                    }
                  }}
                  className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                  title="Delete Issue"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="py-12 text-center text-xs text-zinc-500">
            No issues matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListView;
