export interface FruitListProps {
  fruits: string[];
  isLoading?: boolean;
  onEdit: (fruit: string) => void;
  onDelete: (fruit: string) => void;
} 