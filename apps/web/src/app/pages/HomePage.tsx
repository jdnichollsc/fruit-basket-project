import React from 'react';
import { FruitForm, FruitList } from '@fruit-basket/ui';
import { useFruits } from '../hooks/useFruits';

export function HomePage() {
  const {
    fruits,
    loading,
    error,
    isSubmitting,
    addFruit,
    updateFruit,
    deleteFruit,
  } = useFruits();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Fruit Basket{' '}
        <span role="img" aria-label="shopping cart">🛒</span>
        <span role="img" aria-label="chart increasing">📈</span>
        <span role="img" aria-label="tomato">🍅</span>
        <span role="img" aria-label="shopping bags">🛍️</span>
      </h1>
      <FruitForm onAdd={addFruit} isLoading={isSubmitting} error={error} />
      <FruitList
        fruits={fruits}
        isLoading={isSubmitting}
        onEdit={async (...rest) => {
          updateFruit(...rest)
        }}
        onDelete={async (...rest) => {
          await deleteFruit(...rest)
        }}
      />
    </div>
  );
}
