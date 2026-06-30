import { TaskFilter } from '../types';

interface TaskFilterProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  allCount: number;
  activeCount: number;
  completedCount: number;
}

export function TaskFilterComponent({
  activeFilter,
  onFilterChange,
  allCount,
  activeCount,
  completedCount,
}: TaskFilterProps) {
  const filters: { label: string; value: TaskFilter; count: number }[] = [
    { label: 'All Tasks', value: 'all', count: allCount },
    { label: 'Active', value: 'active', count: activeCount },
    { label: 'Completed', value: 'completed', count: completedCount },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label} <span className="ml-1 text-sm">({count})</span>
        </button>
      ))}
    </div>
  );
}
