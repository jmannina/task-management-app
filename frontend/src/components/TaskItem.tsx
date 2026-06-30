import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (isCompleted: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  const priorityColor = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-orange-100 text-orange-800',
    Urgent: 'bg-red-100 text-red-800',
  };

  const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;
  const isOverdue = dueDate && new Date(task.dueDate!) < new Date() && !task.isCompleted;

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
      task.isCompleted
        ? 'bg-gray-50 border-gray-200'
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(!task.isCompleted)}
        className="mt-1 w-5 h-5 text-blue-600 rounded cursor-pointer"
        aria-label={`Mark "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
      />

      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-lg ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className={`text-sm mt-1 ${task.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${priorityColor[task.priority]}`}>
            {task.priority}
          </span>
          {dueDate && (
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              isOverdue ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
            }`}>
              {isOverdue ? '🔴 ' : '📅 '}{dueDate}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          aria-label={`Edit "${task.title}"`}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
          aria-label={`Delete "${task.title}"`}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
