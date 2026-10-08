import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const MetricsBar = () => {
  const { tasks } = useTasks();

  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const urgentOrHigh = tasks.filter((t) => t.priority === 'urgent' || t.priority === 'high').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const percentComplete = total > 0 ? Math.round((done / total) * 100) : 0;

  const metrics = [
    {
      label: 'Total Tasks',
      value: total,
      icon: Layers,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20'
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Clock,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20'
    },
    {
      label: 'High & Urgent',
      value: urgentOrHigh,
      icon: AlertTriangle,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      label: 'Completed',
      value: `${done} (${percentComplete}%)`,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
      {metrics.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border ${item.borderColor} backdrop-blur-sm flex items-center justify-between transition-all hover:border-slate-700`}
          >
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                {item.label}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {item.value}
              </h3>
            </div>
            <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <IconComponent className={`w-5 h-5 ${item.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsBar;
