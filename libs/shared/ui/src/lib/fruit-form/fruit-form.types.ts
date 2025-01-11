export interface FruitFormProps {
  onAdd: (fruit: string) => void;
  isLoading?: boolean;
  error: string | null;
}