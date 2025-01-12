export interface FruitListProps {
  fruits: string[];
  isLoading?: boolean;
  onEdit: (oldName: string, newName: string) => Promise<void>;
  onDelete: (name: string) => Promise<void>;
} 