import { useState, useEffect, useCallback } from 'react';
import type { FruitState } from '../types/fruit';

export function useFruits() {
  const [state, setState] = useState<FruitState>({
    fruits: [],
    loading: true,
    error: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reusable error handler for API operations
  const handleApiOperation = async <T>(
    operation: () => Promise<T>,
    errorMessage: string,
    options?: { setSubmitting?: boolean }
  ) => {
    if (options?.setSubmitting) {
      setIsSubmitting(true);
    }
    setState((prev) => ({ ...prev, error: null }));

    try {
      const result = await operation();
      return result;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : errorMessage,
      }));
      return false;
    } finally {
      if (options?.setSubmitting) {
        setIsSubmitting(false);
      }
    }
  };

  const loadFruits = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const fruits = await handleApiOperation(
      async () => window.BASKET.API.getAll(),
      'Failed to load fruits'
    );
    setState((prev) => ({
      ...prev,
      fruits: Array.isArray(fruits) ? fruits : prev.fruits,
      loading: false,
    }));
  }, []);

  useEffect(() => {
    loadFruits();
  }, [loadFruits]);

  const addFruit = async (name: string) => {
    const fruits = await handleApiOperation(
      async () => window.BASKET.API.add(name),
      'Failed to add fruit',
      { setSubmitting: true }
    );
    if (Array.isArray(fruits)) {
      setState((prev) => ({ ...prev, fruits }));
      return true;
    }
    return false;
  };

  const updateFruit = async (oldName: string, newName: string) => {
    const fruits = await handleApiOperation(
      async () => window.BASKET.API.update(oldName, newName),
      'Failed to update fruit'
    );
    if (Array.isArray(fruits)) {
      setState((prev) => ({ ...prev, fruits }));
      return true;
    }
    return false;
  };

  const deleteFruit = async (name: string) => {
    const fruits = await handleApiOperation(
      async () => window.BASKET.API.delete(name),
      'Failed to delete fruit'
    );
    if (Array.isArray(fruits)) {
      setState((prev) => ({ ...prev, fruits }));
      return true;
    }
    return false;
  };

  return {
    ...state,
    isSubmitting,
    addFruit,
    updateFruit,
    deleteFruit,
  };
}
