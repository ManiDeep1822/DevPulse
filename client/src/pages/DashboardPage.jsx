import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import MetricsBar from '../components/MetricsBar';
import Board from '../components/Board';
import TaskListView from '../components/TaskListView';
import TaskModal from '../components/TaskModal';
import ActivityDrawer from '../components/ActivityDrawer';
import { useTasks } from '../context/TaskContext';

const DashboardPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { viewMode } = useTasks();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* Enterprise Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isSidebarCollapsed ? 'pl-16' : 'pl-64'
        }`}
      >
        {/* Top Header */}
        <TopHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* Workspace Canvas */}
        <main className="flex-1 px-4 sm:px-6 py-4 max-w-7xl w-full mx-auto">
          {/* Metrics Ribbon */}
          <MetricsBar />

          {/* Active View: Board or List */}
          <div className="mt-4">
            {viewMode === 'board' ? <Board /> : <TaskListView />}
          </div>
        </main>
      </div>

      {/* Slide-overs & Modals */}
      <TaskModal />
      <ActivityDrawer />
    </div>
  );
};

export default DashboardPage;
