import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from './app';
import { useFruits } from './hooks/useFruits';

jest.mock('./hooks/useFruits');

describe('App', () => {
  const mockUseFruits = useFruits as jest.Mock;

  beforeEach(() => {
    mockUseFruits.mockReturnValue({
      fruits: ['Apple', 'Banana'],
      loading: false,
      error: null,
      isSubmitting: false,
      addFruit: jest.fn(),
      updateFruit: jest.fn(),
      deleteFruit: jest.fn(),
    });
  });

  it('should render successfully', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /fruit basket/i })).toBeInTheDocument();
  });

  it('should render HomePage component', () => {
    render(<App />);
    // Look for form elements
    expect(screen.getByPlaceholderText('Enter fruit name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    // Look for list elements
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
