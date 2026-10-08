import React from 'react';
import { Layers, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const MetricsBar = () => {
  const { tasks } = useTasks();

  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const urgentOrHigh = tasks.filter((t) => t.priority === 'urgent' || t.priority === 'high').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const percentComplete = total > 0 ? Math.round((done / total) * 100) : 0;

  const items = [
    { label: 'Total Issues', value: total, icon: Layers, color: 'text-zinc-300' },
    { label: 'In Progress', value: inProgress, icon: Clock, color: 'text-sky-400' },
    { label: 'High & Urgent', value: urgentOrHigh, icon: AlertTriangle, color: 'text-amber-400' },
    { label: 'Resolved', value: `${done} (${percentComplete}%)`, icon: CheckCircle2, color: 'text-emerald-400' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-base font-semibold text-zinc-100 font-mono mt-0.5">
                {item.value}
              </p>
            </div>
            <div className="p-2 rounded bg-zinc-800/50 border border-zinc-750">
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsBar;
