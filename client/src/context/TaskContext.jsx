import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'list'

  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingTasks(true);
    try {
      const res = await api.get('/tasks');
      if (res.data.success) {
        setTasks(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err.message);
    } finally {
      setLoadingTasks(false);
    }
  }, [isAuthenticated]);

  const fetchActivities = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingActivities(true);
    try {
      const res = await api.get('/activities?limit=40');
      if (res.data.success) {
        setActivities(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch activities:', err.message);
    } finally {
      setLoadingActivities(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchActivities();
    } else {
      setTasks([]);
      setActivities([]);
    }
  }, [isAuthenticated, fetchTasks, fetchActivities]);

  const createTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      if (res.data.success) {
        setTasks((prev) => [res.data.data, ...prev]);
        fetchActivities();
        return { success: true };
      }
    } catch (err) {
      console.error('Failed to create task:', err.message);
      return { success: false, message: err.response?.data?.message || 'Error creating task' };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      if (res.data.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? res.data.data : t))
        );
        fetchActivities();
        return { success: true };
      }
    } catch (err) {
      console.error('Failed to update task:', err.message);
      return { success: false, message: err.response?.data?.message || 'Error updating task' };
    }
  };

  // Optimistic update for drag-and-drop or status shifts
  const updateTaskStatus = async (id, newStatus) => {
    const originalTasks = [...tasks];
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );

    try {
      const res = await api.patch(`/tasks/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? res.data.data : t))
        );
        fetchActivities();
      }
    } catch (err) {
      console.error('Failed to update task status, rolling back:', err.message);
      setTasks(originalTasks);
    }
  };

  const deleteTask = async (id) => {
    const originalTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== id));

    try {
      const res = await api.delete(`/tasks/${id}`);
      if (res.data.success) {
        fetchActivities();
      }
    } catch (err) {
      console.error('Failed to delete task, rolling back:', err.message);
      setTasks(originalTasks);
    }
  };

  const openCreateModal = (defaultStatus = 'todo') => {
    setEditingTask({ status: defaultStatus });
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const closeModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  // Filter tasks based on search query, priority filter, and status filter
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesPriority && matchesStatus;

    const matchesTitle = task.title?.toLowerCase().includes(query);
    const matchesDesc = task.description?.toLowerCase().includes(query);
    const matchesTags = task.tags?.some((tag) => tag.toLowerCase().includes(query));
    const matchesAssignee = task.assignee?.toLowerCase().includes(query);

    return matchesPriority && matchesStatus && (matchesTitle || matchesDesc || matchesTags || matchesAssignee);
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loadingTasks,
        searchQuery,
        setSearchQuery,
        priorityFilter,
        setPriorityFilter,
        statusFilter,
        setStatusFilter,
        viewMode,
        setViewMode,
        activities,
        loadingActivities,
        isActivityOpen,
        setIsActivityOpen,
        isTaskModalOpen,
        editingTask,
        openCreateModal,
        openEditModal,
        closeModal,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        fetchTasks,
        fetchActivities,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
