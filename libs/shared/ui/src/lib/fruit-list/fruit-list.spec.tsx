import { render, screen, fireEvent } from '@testing-library/react';

import { FruitList } from '.';
import type { FruitListProps } from '.';

describe('FruitList', () => {
  const mockFruits = ['Apple', 'Banana', 'Cherry'];
  const mockProps: FruitListProps = {
    fruits: mockFruits,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

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
    
    expect(mockProps.onEdit).toHaveBeenCalledWith(mockFruits[0]);
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<FruitList {...mockProps} />);
    
    const deleteButton = screen.getAllByLabelText('Delete fruit')[0];
    fireEvent.click(deleteButton);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockFruits[0]);
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
}); 