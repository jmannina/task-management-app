import axios from 'axios';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';

const API_BASE_URL = (import.meta.env as any).VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  getTasks: async (status?: string): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks', {
      params: status ? { status } : {},
    });
    return response.data;
  },

  getTask: async (id: number): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (input: CreateTaskInput): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', input);
    return response.data;
  },

  updateTask: async (id: number, input: UpdateTaskInput): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${id}`, input);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};

export default apiClient;
