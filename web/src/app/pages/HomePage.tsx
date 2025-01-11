import { FruitForm, FruitList } from '@fruit-basket/ui';
import { useFruits } from '../hooks/useFruits';
import { promptForNewName } from '../services/prompt';

export function HomePage() {
  const { fruits, loading, error, isSubmitting, addFruit, updateFruit, deleteFruit } = useFruits();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isSubmitting) {
    return <div>Submitting...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fruit Basket</h1>
      <FruitForm onAdd={addFruit} isLoading={isSubmitting} error={error} />
      <FruitList
        fruits={fruits}
        onEdit={(fruit: string) => {
          const newName = promptForNewName(fruit);
          if (newName) {
            updateFruit(fruit, newName);
          }
        }}
        onDelete={deleteFruit}
      />
    </div>
  );
} 