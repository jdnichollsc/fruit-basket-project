import React from 'react';
import { useState } from 'react';
import type { FruitListProps } from './fruit-list.types';

interface EditingState {
  id: string;
  value: string;
  error?: string;
  isLoading?: boolean;
}

export function FruitList({ fruits, isLoading = false, onEdit, onDelete }: FruitListProps) {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (fruits.length === 0) {
    return (
      <div className="text-center text-base-content/60 py-4">
        No fruits available
      </div>
    );
  }

  return (
    <div>
      {deleteError && (
        <p role="alert" className="mb-4 text-sm text-error">
          {deleteError}
        </p>
      )}
      <ul className="space-y-2">
        {fruits.map((fruit) => (
          <li
            key={fruit}
            className="flex items-center justify-between p-3 bg-base-100 rounded-lg shadow-sm border border-base-300"
          >
            {editing?.id === fruit ? (
              <div className="flex-1 mr-2">
                <input
                  type="text"
                  value={editing.value}
                  onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                  className="input input-bordered input-sm w-full"
                  disabled={editing.isLoading}
                />
                {editing.error && (
                  <p role="alert" className="mt-1 text-xs text-error">
                    {editing.error}
                  </p>
                )}
              </div>
            ) : (
              <span className="text-base-content">{fruit}</span>
            )}
            <div className="space-x-2">
              {editing?.id === fruit ? (
                <>
                  <button
                    type="button"
                    aria-label="Save changes"
                    onClick={async () => {
                      setEditing({ ...editing, isLoading: true, error: undefined });
                      try {
                        await onEdit(fruit, editing.value);
                        setEditing(null);
                      } catch (error) {
                        setEditing({
                          ...editing,
                          isLoading: false,
                          error: error instanceof Error ? error.message : 'Failed to update fruit',
                        });
                      }
                    }}
                    disabled={editing.isLoading}
                    className="btn btn-ghost btn-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    aria-label="Cancel editing"
                    onClick={() => setEditing(null)}
                    disabled={editing.isLoading}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label="Edit fruit"
                    onClick={() => setEditing({ id: fruit, value: fruit })}
                    disabled={isLoading || editing !== null}
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    aria-label="Delete fruit"
                    onClick={async () => {
                      try {
                        await onDelete(fruit);
                        setDeleteError(null);
                      } catch (error) {
                        setDeleteError(error instanceof Error ? error.message : 'Failed to delete fruit');
                      }
                    }}
                    disabled={isLoading || editing !== null}
                    className="btn btn-ghost btn-sm text-error hover:text-error"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 