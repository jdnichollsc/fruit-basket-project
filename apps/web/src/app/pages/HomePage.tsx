import React from 'react';
import { FruitForm, FruitList } from '@fruit-basket/ui';

import { useFruits } from '../hooks/useFruits';

function SkeletonPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 skeleton w-48 h-8">
        <span className="sr-only">Loading Fruit Basket...</span>
      </h1>
      <div className="mb-4 flex justify-between gap-4">
        <div className="skeleton h-12 flex-grow mb-2"></div>
        <div className="skeleton h-12 w-20"></div>
      </div>
      <div className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="skeleton h-12 flex-grow"></div>
            <div className="skeleton h-12 w-20"></div>
            <div className="skeleton h-12 w-20"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
    return <SkeletonPage />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Fruit Basket{' '}
        <span role="img" aria-label="shopping cart">🛒</span>
        <span role="img" aria-label="tomato">🍅</span>
        <span role="img" aria-label="shopping bags">🛍️</span>
      </h1>
      <FruitForm onAdd={addFruit} isLoading={isSubmitting} error={error} />
      <FruitList
        fruits={fruits}
        isLoading={isSubmitting}
        onEdit={async (...rest) => {
          await updateFruit(...rest)
        }}
        onDelete={async (...rest) => {
          await deleteFruit(...rest)
        }}
      />
    </div>
  );
}
