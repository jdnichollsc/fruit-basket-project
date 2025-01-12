import { renderHook, act } from '@testing-library/react';
import { useFruits } from './useFruits';

describe('useFruits', () => {
  const mockAPI = {
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    // Set up window.BASKET.API mock
    window.BASKET = {
      API: mockAPI,
    };
  });

  afterEach(() => {
    // Clean up mocks
    jest.clearAllMocks();
    // @ts-expect-error - window.BASKET is not defined in the Window interface
    delete window.BASKET;
  });

  it('should load fruits successfully', async () => {
    const mockFruits = ['Apple', 'Banana'];
    mockAPI.getAll.mockResolvedValue(mockFruits);

    const { result } = renderHook(() => useFruits());

    expect(result.current.loading).toBe(true);
    expect(result.current.fruits).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the useEffect to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(mockFruits);
    expect(result.current.error).toBe(null);
  });

  it('should handle loading error', async () => {
    const error = new Error('Failed to load fruits');
    mockAPI.getAll.mockRejectedValue(error);

    const { result } = renderHook(() => useFruits());

    // Wait for the useEffect to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual([]);
    expect(result.current.error).toBe('Failed to load fruits');
  });

  it('should handle non-Error objects in loading', async () => {
    mockAPI.getAll.mockRejectedValue('String error');

    const { result } = renderHook(() => useFruits());

    // Wait for the useEffect to complete
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual([]);
    expect(result.current.error).toBe('Failed to load fruits');
  });

  it('should add fruit successfully', async () => {
    const initialFruits = ['Apple', 'Banana'];
    const mockFruits = ['Apple', 'Banana', 'Cherry'];
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.add.mockResolvedValue(mockFruits);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.addFruit('Cherry');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(mockFruits);
    expect(result.current.error).toBe(null);
  });

  it('should handle add fruit error', async () => {
    const initialFruits = ['Apple', 'Banana'];
    const error = new Error('Failed to add');
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.add.mockRejectedValue(error);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.addFruit('Cherry');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(initialFruits);
    expect(result.current.error).toBe('Failed to add');
  });

  it('should handle non-Error objects in add fruit', async () => {
    const initialFruits = ['Apple', 'Banana'];
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.add.mockRejectedValue('String error');

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.addFruit('Cherry');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(initialFruits);
    expect(result.current.error).toBe('Failed to add fruit');
  });

  it('should update fruit successfully', async () => {
    const initialFruits = ['Apple', 'Banana'];
    const mockFruits = ['Apple', 'Cherry'];
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.update.mockResolvedValue(mockFruits);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.updateFruit('Banana', 'Cherry');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(mockFruits);
    expect(result.current.error).toBe(null);
  });

  it('should handle update fruit error', async () => {
    const initialFruits = ['Apple', 'Banana'];
    const error = new Error('Failed to update');
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.update.mockRejectedValue(error);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.updateFruit('Banana', 'Cherry');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(initialFruits);
    expect(result.current.error).toBe('Failed to update');
  });

  it('should handle non-Error objects in update fruit', async () => {
    const initialFruits = ['Apple', 'Banana'];
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.update.mockRejectedValue('String error');

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.updateFruit('Banana', 'Cherry');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(initialFruits);
    expect(result.current.error).toBe('Failed to update fruit');
  });

  it('should delete fruit successfully', async () => {
    const initialFruits = ['Apple', 'Banana'];
    const mockFruits = ['Apple'];
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.delete.mockResolvedValue(mockFruits);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.deleteFruit('Banana');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(mockFruits);
    expect(result.current.error).toBe(null);
  });

  it('should handle delete fruit error', async () => {
    const initialFruits = ['Apple', 'Banana'];
    const error = new Error('Failed to delete');
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.delete.mockRejectedValue(error);

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.deleteFruit('Banana');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(initialFruits);
    expect(result.current.error).toBe('Failed to delete');
  });

  it('should handle non-Error objects in delete fruit', async () => {
    const initialFruits = ['Apple', 'Banana'];
    mockAPI.getAll.mockResolvedValue(initialFruits);
    mockAPI.delete.mockRejectedValue('String error');

    const { result } = renderHook(() => useFruits());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      await result.current.deleteFruit('Banana');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.fruits).toEqual(initialFruits);
    expect(result.current.error).toBe('Failed to delete fruit');
  });
});
