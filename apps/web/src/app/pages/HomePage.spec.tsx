import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useFruits } from '../hooks/useFruits';
import type { FruitFormProps, FruitListProps } from '@fruit-basket/ui';

// Mock the dependencies
jest.mock('../hooks/useFruits');
jest.mock('@fruit-basket/ui', () => ({
  FruitForm: ({ onAdd, isLoading, error }: Partial<FruitFormProps>) => (
    <div data-testid="fruit-form" onClick={() => onAdd?.('Cherry')}>
      Fruit Form {isLoading ? 'Loading' : ''} {error || ''}
    </div>
  ),
  FruitList: ({ fruits, isLoading, onEdit, onDelete }: Partial<FruitListProps>) => (
    <div data-testid="fruit-list">
      Fruit List {isLoading ? 'Loading' : ''}
      {fruits?.map((fruit: string) => (
        <div key={fruit} data-testid={`fruit-item-${fruit}`}>
          <span>{fruit}</span>
          <button onClick={() => onEdit?.(fruit, 'Updated ' + fruit)}>Edit</button>
          <button onClick={() => onDelete?.(fruit)}>Delete</button>
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
    expect(screen.getByText('Loading Fruit Basket...')).toBeInTheDocument();
    expect(screen.getAllByRole('generic').filter(el => el.className.includes('skeleton'))).not.toHaveLength(0);
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

  it('should match snapshot in loading state', () => {
    mockUseFruits.mockReturnValue({
      fruits: [],
      isLoading: true,
      error: null,
      addFruit: jest.fn(),
      editFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with fruits', () => {
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      isLoading: false,
      error: null,
      addFruit: jest.fn(),
      editFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with error', () => {
    mockUseFruits.mockReturnValue({
      fruits: [],
      isLoading: false,
      error: 'Failed to load fruits',
      addFruit: jest.fn(),
      editFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
