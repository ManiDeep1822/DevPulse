import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { Loader2 } from 'lucide-react';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-semibold tracking-wide">Initializing DevPulse...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <TaskProvider>
        <DashboardPage />
      </TaskProvider>
    );
  }

  if (currentPage === 'register') {
    return <RegisterPage onNavigate={setCurrentPage} />;
  }

  return <LoginPage onNavigate={setCurrentPage} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
