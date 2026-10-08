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
      <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400 mb-2" />
        <p className="text-xs font-mono">Syncing sprint issues...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 pb-10">
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
