import React from 'react';
import { useState } from 'react';
import { cn } from '@fruit-basket/utils';

import type { FruitFormProps } from './fruit-form.types';

export function FruitForm({ onAdd, isLoading = false, error }: FruitFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <label className="flex-1 form-control">
          <span className="sr-only">Fruit name</span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter fruit name"
            disabled={isLoading}
            aria-label="Fruit name"
            data-testid="add-fruit-input"
            required
            className={cn("input input-bordered w-full", isLoading && "input-disabled")}
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className={cn("btn btn-primary min-w-20", isLoading && "btn-disabled")}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Adding...
            </>
          ) : (
            'Add'
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </form>
  );
} 