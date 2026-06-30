import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  isLoading: boolean;
  emptyMessage?: string;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  isLoading,
  emptyMessage = 'No tasks found',
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-gray-600">✨ {emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id, task.isCompleted)}
          onDelete={() => onDelete(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </div>
  );
}
