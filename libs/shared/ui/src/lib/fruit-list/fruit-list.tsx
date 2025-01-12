import React from 'react';
import { useState } from 'react';
import { cn } from '@fruit-basket/utils';

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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (fruits.length === 0) {
    return (
      <div data-testid="empty-fruit-list" className="text-center text-base-content/60 py-4">
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
      <ul data-testid="fruit-list" className="space-y-2">
        {fruits.map((fruit) => (
          <li
            key={fruit}
            data-testid={`fruit-item-${fruit}`}
            className="flex items-center justify-between p-3 bg-base-100 rounded-lg shadow-sm border border-base-300"
          >
            {editing?.id === fruit ? (
              <div className="flex-1 mr-2">
                <input
                  type="text"
                  value={editing.value}
                  onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                  data-testid={`edit-fruit-input-${fruit}`}
                  className={cn("input input-bordered input-sm w-full", editing.isLoading && "input-disabled")}
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
            <div className="space-x-2 flex justify-center items-center">
              {editing?.id === fruit ? (
                <>
                  <button
                    type="button"
                    aria-label="Save changes"
                    data-testid={`save-fruit-button-${fruit}`}
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
                    className={cn("btn btn-ghost btn-sm", editing.isLoading && "btn-disabled")}
                  >
                    {editing.isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label="Cancel editing"
                    data-testid={`cancel-edit-button-${fruit}`}
                    onClick={() => setEditing(null)}
                    disabled={editing.isLoading}
                    className={cn("btn btn-ghost btn-sm", editing.isLoading && "btn-disabled")}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label="Edit fruit"
                    data-testid={`edit-fruit-button-${fruit}`}
                    onClick={() => setEditing({ id: fruit, value: fruit })}
                    disabled={isLoading || editing !== null || deletingId === fruit}
                    className={cn("btn btn-ghost btn-sm", (isLoading || editing !== null || deletingId === fruit) && "btn-disabled")}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    aria-label="Delete fruit"
                    data-testid={`delete-fruit-button-${fruit}`}
                    onClick={async () => {
                      setDeletingId(fruit);
                      try {
                        await onDelete(fruit);
                        setDeleteError(null);
                      } catch (error) {
                        setDeleteError(error instanceof Error ? error.message : 'Failed to delete fruit');
                      } finally {
                        setDeletingId(null);
                      }
                    }}
                    disabled={isLoading || editing !== null || deletingId === fruit}
                    className={cn(
                      "btn btn-ghost btn-sm text-error hover:text-error",
                      (isLoading || editing !== null || deletingId === fruit) && "btn-disabled"
                    )}
                  >
                    {deletingId === fruit ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
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