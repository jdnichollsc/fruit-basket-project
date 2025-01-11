import { useState } from 'react';
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
            className="input input-bordered w-full"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          Add
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