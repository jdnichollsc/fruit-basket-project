import type { FruitListProps } from './fruit-list.types';

export function FruitList({ fruits, isLoading = false, onEdit, onDelete }: FruitListProps) {
  if (fruits.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No fruits available
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {fruits.map((fruit) => (
        <li
          key={fruit}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <span className="text-gray-800">{fruit}</span>
          <div className="space-x-2">
            <button
              type="button"
              aria-label="Edit fruit"
              onClick={() => onEdit(fruit)}
              disabled={isLoading}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Edit
            </button>
            <button
              type="button"
              aria-label="Delete fruit"
              onClick={() => onDelete(fruit)}
              disabled={isLoading}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
} 