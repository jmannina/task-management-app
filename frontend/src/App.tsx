import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskFilterComponent } from './components/TaskFilter';
import { Task } from './types';

function App() {
  const { tasks, loading, error, filter, setFilter, createTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreateTask = async (input: any) => {
    try {
      setFormError(null);
      await createTask(input);
      setShowForm(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleUpdateTask = async (input: any) => {
    if (!editingTask) return;
    try {
      setFormError(null);
      await updateTask(editingTask.id, input);
      setEditingTask(null);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleCancelCreate = () => {
    setShowForm(false);
  };

  const allTasks = tasks;
  const activeTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);

  const displayedTasks =
    filter === 'completed' ? completedTasks :
    filter === 'active' ? activeTasks :
    allTasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">✓ Task Manager</h1>
          <p className="text-gray-600">Stay organized and keep track of your tasks</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold mb-1">Error loading tasks</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Form Section */}
          {(showForm || editingTask) && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                initialTask={editingTask || undefined}
                onCancel={editingTask ? handleCancelEdit : handleCancelCreate}
                isLoading={loading}
              />
              {formError && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {formError}
                </div>
              )}
            </div>
          )}

          {/* Create Button */}
          {!showForm && !editingTask && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
            >
              + New Task
            </button>
          )}

          {/* Filter Section */}
          {!loading && tasks.length > 0 && (
            <TaskFilterComponent
              activeFilter={filter}
              onFilterChange={setFilter}
              allCount={allTasks.length}
              activeCount={activeTasks.length}
              completedCount={completedTasks.length}
            />
          )}

          {/* Tasks List */}
          <TaskList
            tasks={displayedTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={handleEditTask}
            isLoading={loading}
            emptyMessage={
              filter === 'completed' ? 'No completed tasks yet' :
              filter === 'active' ? 'No active tasks' :
              'No tasks yet. Create one to get started!'
            }
          />

          {/* Stats Footer */}
          {!loading && tasks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>
                {activeTasks.length} active • {completedTasks.length} completed out of {allTasks.length} total
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
