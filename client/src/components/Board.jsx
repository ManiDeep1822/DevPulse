import React from 'react';
import Column from './Column';
import { useTasks } from '../context/TaskContext';
import { Loader2 } from 'lucide-react';

const columns = [
  { key: 'todo', title: 'To Do' },
  { key: 'in_progress', title: 'In Progress' },
  { key: 'in_review', title: 'In Review' },
  { key: 'done', title: 'Done' }
];

const Board = () => {
  const { filteredTasks, loadingTasks } = useTasks();

  if (loadingTasks) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
        <p className="text-sm font-medium">Loading DevPulse sprint board...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-12">
      {columns.map((col) => {
        const columnTasks = filteredTasks.filter((t) => t.status === col.key);
        return (
          <Column
            key={col.key}
            status={col.key}
            tasks={columnTasks}
          />
        );
      })}
    </div>
  );
};

export default Board;
