export type Fruit = string;

export interface FruitState {
  fruits: Fruit[];
  loading: boolean;
  error: string | null;
}

declare global {
  interface Window {
    BASKET: {
      API: {
        getAll(): Promise<Fruit[]>;
        add(name: string): Promise<Fruit[]>;
        update(oldName: string, newName: string): Promise<Fruit[]>;
        delete(name: string): Promise<Fruit[]>;
      };
    };
  }
} 