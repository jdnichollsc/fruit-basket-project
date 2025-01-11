import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useFruits } from '../hooks/useFruits';
import * as promptService from '../services/prompt';

// Mock the dependencies
jest.mock('../hooks/useFruits');
jest.mock('../services/prompt');

describe('HomePage', () => {
  const mockUseFruits = useFruits as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: false,
      addFruit: jest.fn().mockResolvedValue(true),
      updateFruit: jest.fn().mockResolvedValue(true),
      deleteFruit: jest.fn().mockResolvedValue(true),
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

  it('should render submitting state', () => {
    mockUseFruits.mockReturnValue({
      fruits: [],
      loading: false,
      error: null,
      isSubmitting: true,
      addFruit: jest.fn(),
      updateFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });

    render(<HomePage />);
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
  });

  it('should render fruits list and form', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /fruit basket/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('should handle editing a fruit', async () => {
    const mockUpdateFruit = jest.fn().mockResolvedValue(true);
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: false,
      addFruit: jest.fn(),
      updateFruit: mockUpdateFruit,
      deleteFruit: jest.fn(),
    });

    jest.spyOn(promptService, 'promptForNewName').mockReturnValue('New Apple');

    render(<HomePage />);

    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);

    expect(promptService.promptForNewName).toHaveBeenCalledWith('Apple');
    expect(mockUpdateFruit).toHaveBeenCalledWith('Apple', 'New Apple');
  });

  it('should handle editing a fruit when user cancels', async () => {
    const mockUpdateFruit = jest.fn().mockResolvedValue(true);
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: false,
      addFruit: jest.fn(),
      updateFruit: mockUpdateFruit,
      deleteFruit: jest.fn(),
    });

    jest.spyOn(promptService, 'promptForNewName').mockReturnValue(null);

    render(<HomePage />);

    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    fireEvent.click(editButton);

    expect(promptService.promptForNewName).toHaveBeenCalledWith('Apple');
    expect(mockUpdateFruit).not.toHaveBeenCalled();
  });

  it('should handle deleting a fruit', async () => {
    const mockDeleteFruit = jest.fn().mockResolvedValue(true);
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: false,
      addFruit: jest.fn(),
      updateFruit: jest.fn(),
      deleteFruit: mockDeleteFruit,
    });

    render(<HomePage />);

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteFruit).toHaveBeenCalledWith('Apple');
  });
});
