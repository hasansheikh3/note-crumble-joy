import { useState, useEffect } from 'react';
import { Task, CompletedTask } from '@/types/task';

const STORAGE_KEYS = {
  TASKS: 'sticky-notes-tasks',
  COMPLETED: 'sticky-notes-completed',
  STREAK: 'sticky-notes-streak',
  LAST_ACTIVITY: 'sticky-notes-last-activity',
};

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [streak, setStreak] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
        const savedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
        const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);

        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
        if (savedCompleted) {
          setCompletedTasks(JSON.parse(savedCompleted));
        }
        if (savedStreak) {
          setStreak(Number(savedStreak));
        }

        // Check streak validity
        if (lastActivity) {
          const lastDate = new Date(Number(lastActivity));
          const today = new Date();
          const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysDiff > 1) {
            // Reset streak if more than 1 day gap
            setStreak(0);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK, streak.toString());
  }, [streak]);

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      isCompleted: false,
    };

    setTasks(prev => [newTask, ...prev]);
    return newTask.id;
  };

  const completeTask = (taskId: string) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (!taskToComplete) return;

    // Create completed task
    const completedTask: CompletedTask = {
      id: taskToComplete.id,
      completedAt: Date.now(),
      color: taskToComplete.color,
      jarPosition: {
        x: Math.random() * 80 + 10, // 10-90% from left
        y: Math.random() * 60 + 20, // 20-80% from bottom
        z: Math.random() * 20 + 10, // depth for 3D effect
      },
    };

    // Update states
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setCompletedTasks(prev => [...prev, completedTask]);

    // Update streak
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    const lastActivityDate = lastActivity ? new Date(Number(lastActivity)).toDateString() : null;

    if (lastActivityDate !== today) {
      setStreak(prev => prev + 1);
      localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
    }

    return completedTask;
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };

  // Get today's completed tasks count
  const getTodayCount = () => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000;

    return completedTasks.filter(task => 
      task.completedAt >= todayStart && task.completedAt < todayEnd
    ).length;
  };

  // Get this week's completed tasks count
  const getWeekCount = () => {
    const today = new Date();
    const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()).getTime();
    
    return completedTasks.filter(task => task.completedAt >= weekStart).length;
  };

  return {
    // State
    tasks: tasks.filter(task => !task.isCompleted),
    completedTasks,
    streak,
    todayCount: getTodayCount(),
    weekCount: getWeekCount(),
    
    // Actions
    createTask,
    completeTask,
    deleteTask,
    clearAllTasks,
    clearCompletedTasks,
  };
};