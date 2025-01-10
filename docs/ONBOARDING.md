# Developer Onboarding Guide

## Project Overview

The Fruit Basket project is a React application that demonstrates core JavaScript and React fundamentals through a CRUD interface for managing a list of fruits. The project uses:

- Nx for monorepo management
- React for UI
- Jest and React Testing Library for testing
- TailwindCSS for styling

## Getting Started

1. Clone the repository:
```sh
git clone [repository-url]
cd fruit-basket
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npx nx serve web
```

4. Run tests:
```sh
npx nx run-many --target=test --all
```

## Project Structure

The project follows a monorepo structure using Nx:

- `apps/web`: Main React application
- `libs/shared/api`: API implementation
- `libs/shared/ui`: Reusable UI components
- `libs/shared/utils`: Utility functions

## Development Guidelines

### Testing

We follow a TDD approach:
1. Write failing test
2. Implement feature
3. Refactor if needed

Example:
```typescript
// Writing a test
describe('FruitList', () => {
  it('should display fruits', () => {
    render(<FruitList fruits={['Apple', 'Banana']} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Use TailwindCSS for styling with utility classes

### State Management

- Use React's built-in state management (useState, useContext)
- Keep state as close to where it's used as possible
- Use custom hooks to encapsulate complex state logic

### Error Handling

- Use Error Boundaries for React components
- Handle API errors gracefully
- Display user-friendly error messages

## Common Tasks

### Creating a New Component

```sh
npx nx g @nx/react:component my-component --project=shared-ui
```

### Running Tests

```sh
# Run all tests
npx nx run-many --target=test --all

# Test specific project
npx nx test shared-ui

# Test in watch mode
npx nx test shared-ui --watch
```

### Building for Production

```sh
npx nx build web
```

## Resources

- [Nx Documentation](https://nx.dev)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Jest Documentation](https://jestjs.io)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro) 