import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useFruits } from '../hooks/useFruits';
import * as promptService from '../services/prompt';

// Mock the dependencies
jest.mock('../hooks/useFruits');
jest.mock('../services/prompt');
jest.mock('@fruit-basket/ui', () => ({
  FruitForm: ({ onAdd, isLoading, error }: any) => (
    <div data-testid="fruit-form" onClick={() => onAdd('Cherry')}>
      Fruit Form {isLoading ? 'Loading' : ''} {error || ''}
    </div>
  ),
  FruitList: ({ fruits, isLoading, onEdit, onDelete }: any) => (
    <div data-testid="fruit-list">
      Fruit List {isLoading ? 'Loading' : ''}
      {fruits.map((fruit: string) => (
        <div key={fruit} data-testid={`fruit-item-${fruit}`}>
          <span>{fruit}</span>
          <button onClick={() => onEdit(fruit, 'Updated ' + fruit)}>Edit</button>
          <button onClick={() => onDelete(fruit)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

describe('HomePage', () => {
  const mockUseFruits = useFruits as jest.Mock;
  const mockAddFruit = jest.fn().mockResolvedValue(true);
  const mockUpdateFruit = jest.fn().mockResolvedValue(true);
  const mockDeleteFruit = jest.fn().mockResolvedValue(true);

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: false,
      addFruit: mockAddFruit,
      updateFruit: mockUpdateFruit,
      deleteFruit: mockDeleteFruit,
    });
  });

  it('should render loading state', () => {
    mockUseFruits.mockReturnValue({
      fruits: [],
      loading: true,
      error: null,
      isSubmitting: false,
      addFruit: jest.fn(),
      updateFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });

    render(<HomePage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to load fruits';
    mockUseFruits.mockReturnValue({
      fruits: [],
      loading: false,
      error: errorMessage,
      isSubmitting: false,
      addFruit: jest.fn(),
      updateFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });

    render(<HomePage />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render fruit form and list when data is loaded', () => {
    render(<HomePage />);
    expect(screen.getByTestId('fruit-form')).toBeInTheDocument();
    expect(screen.getByTestId('fruit-list')).toBeInTheDocument();
  });

  it('should handle adding a fruit', async () => {
    render(<HomePage />);
    const fruitForm = screen.getByTestId('fruit-form');
    await fireEvent.click(fruitForm);
    expect(mockAddFruit).toHaveBeenCalledWith('Cherry');
  });

  it('should handle editing a fruit', async () => {
    render(<HomePage />);
    const appleItem = screen.getByTestId('fruit-item-Apple');
    const editButton = within(appleItem).getByText('Edit');
    await fireEvent.click(editButton);
    expect(mockUpdateFruit).toHaveBeenCalledWith('Apple', 'Updated Apple');
  });

  it('should handle deleting a fruit', async () => {
    render(<HomePage />);
    const appleItem = screen.getByTestId('fruit-item-Apple');
    const deleteButton = within(appleItem).getByText('Delete');
    await fireEvent.click(deleteButton);
    expect(mockDeleteFruit).toHaveBeenCalledWith('Apple');
  });

  it('should show loading state in form and list during submission', () => {
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: true,
      addFruit: mockAddFruit,
      updateFruit: mockUpdateFruit,
      deleteFruit: mockDeleteFruit,
    });

    render(<HomePage />);
    expect(screen.getByTestId('fruit-form')).toHaveTextContent('Loading');
    expect(screen.getByTestId('fruit-list')).toHaveTextContent('Loading');
  });
});
