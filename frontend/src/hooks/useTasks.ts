import { useState, useEffect, useCallback } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput, TaskFilter } from '../types';
import { taskAPI } from '../services/api';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>('all');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const status = filter === 'all' ? undefined : filter === 'completed' ? 'completed' : 'active';
      const data = await taskAPI.getTasks(status);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (input: CreateTaskInput) => {
    try {
      const newTask = await taskAPI.createTask(input);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create task');
    }
  }, []);

  const updateTask = useCallback(async (id: number, input: UpdateTaskInput) => {
    try {
      const updated = await taskAPI.updateTask(id, input);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update task');
    }
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete task');
    }
  }, []);

  const toggleTask = useCallback(async (id: number, isCompleted: boolean) => {
    return updateTask(id, { isCompleted: !isCompleted });
  }, [updateTask]);

  return {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: fetchTasks,
  };
}
