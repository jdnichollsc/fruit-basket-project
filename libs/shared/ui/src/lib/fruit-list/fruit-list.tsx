import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@fruit-basket/utils';

import type { FruitListProps } from './fruit-list.types';

interface EditingState {
  id: string;
  value: string;
  error?: string;
  isLoading?: boolean;
}

// Animation variants
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: { 
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2
    }
  }
};

const editVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { 
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2
    }
  }
};

export function FruitList({ fruits, isLoading = false, onEdit, onDelete }: FruitListProps) {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (fruits.length === 0) {
    return (
      <motion.div
        data-testid="empty-fruit-list"
        className="text-center text-base-content/60 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        No fruits available
      </motion.div>
    );
  }

  return (
    <div>
      <AnimatePresence>
        {deleteError && (
          <motion.p
            role="alert"
            className="mb-4 text-sm text-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {deleteError}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.ul
        data-testid="fruit-list"
        className="space-y-2"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {fruits.map((fruit) => (
            <motion.li
              key={fruit}
              data-testid={`fruit-item-${fruit}`}
              className="flex items-center justify-between p-3 bg-base-100 rounded-lg shadow-sm border border-base-300"
              variants={itemVariants}
              layout
              exit="exit"
            >
              <AnimatePresence mode="wait">
                {editing?.id === fruit ? (
                  <motion.div
                    className="flex-1 mr-2"
                    variants={editVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <input
                      type="text"
                      value={editing.value}
                      onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                      data-testid={`edit-fruit-input-${fruit}`}
                      className={cn("input input-bordered input-sm w-full", editing.isLoading && "input-disabled")}
                      disabled={editing.isLoading}
                    />
                    <AnimatePresence>
                      {editing.error && (
                        <motion.p
                          role="alert"
                          className="mt-1 text-xs text-error"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
                          {editing.error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.span
                    className="text-base-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {fruit}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="space-x-2 flex justify-center items-center">
                <AnimatePresence mode="wait">
                  {editing?.id === fruit ? (
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
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
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
} 