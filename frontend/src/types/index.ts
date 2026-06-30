export interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate?: string;
  priority: number;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string;
  priority?: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';
