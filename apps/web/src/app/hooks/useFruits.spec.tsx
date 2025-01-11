import { renderHook, act, waitFor } from '@testing-library/react';
import { useFruits } from './useFruits';

describe('useFruits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useFruits());

    expect(result.current).toEqual({
      fruits: [],
      loading: true,
      error: null,
      isSubmitting: false,
      addFruit: expect.any(Function),
      updateFruit: expect.any(Function),
      deleteFruit: expect.any(Function),
    });
  });

  it('should load fruits successfully', async () => {
    const mockFruits = ['Apple', 'Banana'];
    window.BASKET.API.getAll.mockResolvedValueOnce(mockFruits);

    const { result } = renderHook(() => useFruits());

    await waitFor(() => {
      expect(result.current).toEqual({
        fruits: mockFruits,
        loading: false,
        error: null,
        isSubmitting: false,
        addFruit: expect.any(Function),
        updateFruit: expect.any(Function),
        deleteFruit: expect.any(Function),
      });
    });
  });

  it('should handle loading error', async () => {
    const errorMessage = 'Failed to load fruits';
    window.BASKET.API.getAll.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFruits());

    await waitFor(() => {
      expect(result.current).toEqual({
        fruits: [],
        loading: false,
        error: errorMessage,
        isSubmitting: false,
        addFruit: expect.any(Function),
        updateFruit: expect.any(Function),
        deleteFruit: expect.any(Function),
      });
    });
  });

  it('should handle non-Error objects in loading', async () => {
    const errorMessage = 'Unknown error';
    window.BASKET.API.getAll.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useFruits());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load fruits');
    });
  });

  it('should add fruit successfully', async () => {
    const updatedFruits = ['Apple', 'Banana', 'Mango'];
    window.BASKET.API.add.mockResolvedValueOnce(updatedFruits);

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.addFruit('Mango');
    });

    expect(success).toBe(true);
    expect(result.current.fruits).toEqual(updatedFruits);
    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle add fruit error', async () => {
    const errorMessage = 'Fruit already exists';
    window.BASKET.API.add.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.addFruit('Apple');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle non-Error objects in add fruit', async () => {
    const errorMessage = 'Unknown error';
    window.BASKET.API.add.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.addFruit('Apple');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe('Failed to add fruit');
  });

  it('should update fruit successfully', async () => {
    // First, mock the initial load
    window.BASKET.API.getAll.mockResolvedValueOnce(['Apple', 'Banana']);

    // Then mock the update
    const updatedFruits = ['Banana', 'Orange'];
    window.BASKET.API.update.mockResolvedValueOnce(updatedFruits);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let success;
    await act(async () => {
      success = await result.current.updateFruit('Apple', 'Orange');
    });

    expect(success).toBe(true);
    expect(result.current.fruits).toEqual(updatedFruits);
    expect(result.current.error).toBeNull();
  });

  it('should handle update fruit error', async () => {
    const errorMessage = 'Fruit not found';
    window.BASKET.API.update.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.updateFruit('NonExistent', 'Orange');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error objects in update fruit', async () => {
    const errorMessage = 'Unknown error';
    window.BASKET.API.update.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.updateFruit('Apple', 'Orange');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe('Failed to update fruit');
  });

  it('should delete fruit successfully', async () => {
    // First, mock the initial load
    window.BASKET.API.getAll.mockResolvedValueOnce(['Apple', 'Banana']);

    // Then mock the delete
    const updatedFruits = ['Banana'];
    window.BASKET.API.delete.mockResolvedValueOnce(updatedFruits);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let success;
    await act(async () => {
      success = await result.current.deleteFruit('Apple');
    });

    expect(success).toBe(true);
    expect(result.current.fruits).toEqual(updatedFruits);
    expect(result.current.error).toBeNull();
  });

  it('should handle delete fruit error', async () => {
    const errorMessage = 'Fruit not found';
    window.BASKET.API.delete.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.deleteFruit('NonExistent');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error objects in delete fruit', async () => {
    const errorMessage = 'Unknown error';
    window.BASKET.API.delete.mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useFruits());

    let success;
    await act(async () => {
      success = await result.current.deleteFruit('Apple');
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe('Failed to delete fruit');
  });
});
