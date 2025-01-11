import '@testing-library/jest-dom';

// Mock the global BASKET API
(global as any).BASKET = {
  API: {
    getAll: jest.fn().mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      return ['Apple', 'Banana'];
    }),
    add: jest.fn().mockImplementation(async (name: string) => {
      await new Promise(resolve => setTimeout(resolve, 0));
      if (name.toLowerCase() === 'apple') {
        throw new Error('Apple already exists');
      }
      return ['Apple', 'Banana', name].sort();
    }),
    update: jest.fn().mockImplementation(async (oldName: string, newName: string) => {
      await new Promise(resolve => setTimeout(resolve, 0));
      if (oldName.toLowerCase() !== 'apple') {
        throw new Error(`${oldName} not found`);
      }
      if (newName.toLowerCase() === 'banana') {
        throw new Error(`${newName} already in use`);
      }
      return ['Banana', newName].sort();
    }),
    delete: jest.fn().mockImplementation(async (name: string) => {
      await new Promise(resolve => setTimeout(resolve, 0));
      if (name.toLowerCase() !== 'apple') {
        throw new Error(`${name} not found`);
      }
      return ['Banana'];
    }),
  },
}; 