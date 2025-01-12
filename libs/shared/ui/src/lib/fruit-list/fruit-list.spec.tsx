import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FruitList } from '.';
import type { FruitListProps } from '.';

describe('FruitList', () => {
  const mockFruits = ['Apple', 'Banana', 'Cherry'];
  const mockOnEdit = jest.fn().mockImplementation(() => Promise.resolve());
  const mockOnDelete = jest.fn().mockImplementation(() => Promise.resolve());
  
  const mockProps: FruitListProps = {
    fruits: mockFruits,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot with fruits', () => {
    const { container } = render(<FruitList {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when empty', () => {
    const { container } = render(<FruitList {...mockProps} fruits={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when loading', () => {
    const { container } = render(<FruitList {...mockProps} isLoading={true} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot in edit mode', () => {
    const { container } = render(<FruitList {...mockProps} />);
    const editButton = screen.getAllByLabelText('Edit fruit')[0];
    fireEvent.click(editButton);
    expect(container).toMatchSnapshot();
  });

  it('should render list of fruits', () => {
    render(<FruitList {...mockProps} />);
    
    mockFruits.forEach(fruit => {
      expect(screen.getByText(fruit)).toBeInTheDocument();
    });
  });

  it('should render edit and delete buttons for each fruit', () => {
    render(<FruitList {...mockProps} />);
    
    mockFruits.forEach(fruit => {
      const listItem = screen.getByText(fruit).closest('li');
      expect(listItem).toBeInTheDocument();
      expect(listItem?.querySelector('button[aria-label="Edit fruit"]')).toBeInTheDocument();
      expect(listItem?.querySelector('button[aria-label="Delete fruit"]')).toBeInTheDocument();
    });
  });

  it('should call onEdit when edit button is clicked', () => {
    render(<FruitList {...mockProps} />);
    
    const editButton = screen.getAllByLabelText('Edit fruit')[0];
    fireEvent.click(editButton);
    
    expect(mockProps.onEdit).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue('Apple')).toBeInTheDocument();
  });

  it('should handle successful edit operation', async () => {
    mockOnEdit.mockImplementationOnce(() => Promise.resolve());
    render(<FruitList {...mockProps} />);
    
    // Start editing
    const editButton = screen.getAllByLabelText('Edit fruit')[0];
    fireEvent.click(editButton);
    
    // Change input value
    const input = screen.getByDisplayValue('Apple');
    await userEvent.clear(input);
    await userEvent.type(input, 'Green Apple');
    
    // Save changes
    const saveButton = screen.getByLabelText('Save changes');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith('Apple', 'Green Apple');
    });
  });

  it('should handle failed edit operation', async () => {
    const error = new Error('Failed to update');
    mockOnEdit.mockImplementationOnce(() => Promise.reject(error));
    render(<FruitList {...mockProps} />);
    
    // Start editing
    const editButton = screen.getAllByLabelText('Edit fruit')[0];
    fireEvent.click(editButton);
    
    // Save without changes
    const saveButton = screen.getByLabelText('Save changes');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(error.message);
    });
  });

  it('should cancel edit operation', () => {
    render(<FruitList {...mockProps} />);
    
    // Start editing
    const editButton = screen.getAllByLabelText('Edit fruit')[0];
    fireEvent.click(editButton);
    
    // Cancel editing
    const cancelButton = screen.getByLabelText('Cancel editing');
    fireEvent.click(cancelButton);
    
    expect(screen.queryByDisplayValue('Apple')).not.toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('should handle successful delete operation', async () => {
    mockOnDelete.mockImplementationOnce(() => Promise.resolve());
    render(<FruitList {...mockProps} />);
    
    const deleteButton = screen.getAllByLabelText('Delete fruit')[0];
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith('Apple');
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should handle failed delete operation', async () => {
    const error = new Error('Failed to delete');
    mockOnDelete.mockImplementationOnce(() => Promise.reject(error));
    render(<FruitList {...mockProps} />);
    
    const deleteButton = screen.getAllByLabelText('Delete fruit')[0];
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(error.message);
    });
  });

  it('should render empty message when no fruits', () => {
    render(<FruitList {...mockProps} fruits={[]} />);
    expect(screen.getByText('No fruits available')).toBeInTheDocument();
  });

  it('should disable buttons when isLoading is true', () => {
    render(<FruitList {...mockProps} isLoading={true} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('should disable other fruit actions while editing one fruit', () => {
    render(<FruitList {...mockProps} />);
    
    // Start editing first fruit
    const editButtons = screen.getAllByLabelText('Edit fruit');
    fireEvent.click(editButtons[0]);
    
    // Check other fruits' buttons are disabled
    const otherEditButtons = screen.getAllByLabelText('Edit fruit').slice(1);
    const deleteButtons = screen.getAllByLabelText('Delete fruit');
    
    otherEditButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
    deleteButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('should handle non-Error type error in edit operation', async () => {
    mockOnEdit.mockImplementationOnce(() => Promise.reject('Custom error string'));
    render(<FruitList {...mockProps} />);
    
    // Start editing
    const editButton = screen.getAllByLabelText('Edit fruit')[0];
    fireEvent.click(editButton);
    
    // Save without changes
    const saveButton = screen.getByLabelText('Save changes');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to update fruit');
    });
  });

  it('should handle non-Error type error in delete operation', async () => {
    mockOnDelete.mockImplementationOnce(() => Promise.reject('Custom error string'));
    render(<FruitList {...mockProps} />);
    
    const deleteButton = screen.getAllByLabelText('Delete fruit')[0];
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to delete fruit');
    });
  });
}); 