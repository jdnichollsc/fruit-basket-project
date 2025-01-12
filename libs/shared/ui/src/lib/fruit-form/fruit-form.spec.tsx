import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FruitForm } from '.';
import type { FruitFormProps } from '.';

describe('FruitForm', () => {
  const mockProps: FruitFormProps = {
    onAdd: jest.fn(),
    isLoading: false,
    error: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form with accessible elements', () => {
    render(<FruitForm {...mockProps} />);
    
    expect(screen.getByRole('textbox', { name: /fruit name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('should use default isLoading value when not provided', () => {
    const { onAdd, error } = mockProps;
    render(<FruitForm onAdd={onAdd} error={error} />);
    
    expect(screen.getByRole('textbox', { name: /fruit name/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /add/i })).not.toBeDisabled();
  });

  it('should disable form elements when loading', () => {
    render(<FruitForm {...mockProps} isLoading={true} />);
    
    expect(screen.getByRole('textbox', { name: /fruit name/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
  });

  it('should handle fruit submission', async () => {
    const user = userEvent.setup();
    render(<FruitForm {...mockProps} />);
    
    const input = screen.getByRole('textbox', { name: /fruit name/i });
    const button = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, 'Mango');
    await user.click(button);
    
    expect(mockProps.onAdd).toHaveBeenCalledWith('Mango');
    expect(input).toHaveValue('');
  });

  it('should display error message', () => {
    const error = 'Fruit already exists';
    render(<FruitForm {...mockProps} error={error} />);
    
    expect(screen.getByRole('alert')).toHaveTextContent(error);
  });

  it('should not submit empty or whitespace-only values', async () => {
    const user = userEvent.setup();
    render(<FruitForm {...mockProps} />);
    
    const input = screen.getByRole('textbox', { name: /fruit name/i });
    const button = screen.getByRole('button', { name: /add/i });
    
    // Empty submission
    await user.click(button);
    expect(mockProps.onAdd).not.toHaveBeenCalled();
    
    // Whitespace-only submission
    await user.type(input, '   ');
    await user.click(button);
    expect(mockProps.onAdd).not.toHaveBeenCalled();
  });

  it('should handle form submission via Enter key', async () => {
    const user = userEvent.setup();
    render(<FruitForm {...mockProps} />);
    
    const input = screen.getByRole('textbox', { name: /fruit name/i });
    
    await user.type(input, 'Mango{Enter}');
    
    expect(mockProps.onAdd).toHaveBeenCalledWith('Mango');
    expect(input).toHaveValue('');
  });
}); 