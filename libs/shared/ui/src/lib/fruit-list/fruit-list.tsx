import type { FruitListProps } from './fruit-list.types';

export function FruitList({ fruits, isLoading = false, onEdit, onDelete }: FruitListProps) {
  if (fruits.length === 0) {
    return (
      <div className="text-center text-base-content/60 py-4">
        No fruits available
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {fruits.map((fruit) => (
        <li
          key={fruit}
          className="flex items-center justify-between p-3 bg-base-100 rounded-lg shadow-sm border border-base-300"
        >
          <span className="text-base-content">{fruit}</span>
          <div className="space-x-2">
            <button
              type="button"
              aria-label="Edit fruit"
              onClick={() => onEdit(fruit)}
              disabled={isLoading}
              className="btn btn-ghost btn-sm"
            >
              Edit
            </button>
            <button
              type="button"
              aria-label="Delete fruit"
              onClick={() => onDelete(fruit)}
              disabled={isLoading}
              className="btn btn-ghost btn-sm text-error hover:text-error"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
} 