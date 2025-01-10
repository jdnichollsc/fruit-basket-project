# Fruit Basket Project Instructions

## Project Structure Setup

### Initial Setup Commands
```sh
# Create Nx workspace
npx create-nx-workspace@latest fruit-basket --preset=apps
mv fruit-basket/* .
# Move hidden files
mv fruit-basket/.* . 2>/dev/null || true
rm -rf fruit-basket

# Add React capabilities
npx nx add @nx/react

# Add TypeScript support
npm install -D typescript @types/node @types/react @types/react-dom

# Add ESLint and Prettier
npm install -D eslint prettier eslint-config-prettier

# Create the web application
npx nx g @nx/react:app web --style=css --routing=false --e2e-test-runner=jest

# Create shared libraries
npx nx g @nx/react:lib api --directory=shared
npx nx g @nx/react:lib ui --directory=shared
npx nx g @nx/react:lib utils --directory=shared

# Add testing libraries
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Add utility libraries
npm install clsx tailwind-merge
```

### Add TailwindCSS
```sh
# Install TailwindCSS and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialize TailwindCSS
npx tailwindcss init -p

# Create tailwind.config.js
cat > tailwind.config.js << EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/web/src/**/*.{js,ts,jsx,tsx}',
    './libs/shared/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

# Update styles.css
cat > apps/web/src/styles.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL
```

### Configure Testing
```sh
# Create Jest setup file
cat > jest.setup.ts << EOL
import '@testing-library/jest-dom';
EOL

# Update package.json scripts
npm pkg set scripts.test="nx run-many --target=test --all" \
    scripts.dev="nx serve web" \
    scripts.build="nx build web" \
    scripts.lint="nx run-many --target=lint --all"
```

## Project Structure

```
fruit-basket/
├── apps/
│   └── web/                    # Main React application
│       ├── src/
│       │   ├── app/
│       │   │   └── app.tsx
│       │   ├── main.tsx
│       │   └── styles.css
│       └── jest.config.ts
├── libs/
│   └── shared/
│       ├── api/               # API module
│       │   ├── src/
│       │   │   ├── lib/
│       │   │   │   └── api.ts
│       │   │   └── index.ts
│       │   └── jest.config.ts
│       └── ui/               # Shared UI components
│           ├── src/
│           │   ├── lib/
│           │   │   ├── fruit-list/
│           │   │   ├── fruit-form/
│           │   │   └── index.ts
│           │   └── index.ts
│           └── jest.config.ts
└── docs/
    ├── INSTRUCTIONS.md       # This file
    └── ONBOARDING.md        # Developer onboarding guide

```

## Development Workflow

1. Start the development server:
```sh
npx nx serve web
```

2. Run tests:
```sh
# Run all tests
npx nx run-many --target=test --all

# Run specific project tests
npx nx test web
npx nx test shared-api
npx nx test shared-ui
```

3. Run tests in watch mode:
```sh
npx nx test web --watch
```

## TDD Approach

We'll follow these steps for each feature:

1. Write test for API functionality
2. Implement API feature
3. Write test for UI component
4. Implement UI component
5. Write integration test
6. Implement integration

### Example Test Structure

```typescript
// shared-api/src/lib/__tests__/api.spec.ts
describe('FruitBasketAPI', () => {
  describe('getAll', () => {
    it('should return all fruits after 2 seconds', async () => {
      // Test implementation
    });
  });
});

// shared-ui/src/lib/fruit-list/__tests__/fruit-list.spec.tsx
describe('FruitList', () => {
  it('should display loading state initially', () => {
    // Test implementation
  });
});
```

## Utility Functions

Create a utils library:
```sh
npx nx g @nx/react:lib utils --directory=shared
```

Add the following utilities:

```typescript
// shared/utils/src/lib/styles.ts
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const replaceNewLinesWithSpaces = (str: string) => {
  return str.replace(/\s{2,}/g, ' ').trim();
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(replaceNewLinesWithSpaces(clsx(inputs)));
};
```

## Implementation Order

1. API Module:
   - Setup in-memory store
   - Implement CRUD operations
   - Add delay simulation
   - Add validation logic

2. UI Components:
   - FruitList component
   - FruitForm component
   - Loading states
   - Error handling

3. Integration:
   - Connect UI with API
   - Add state management
   - Implement error boundaries

4. Testing:
   - Unit tests for API
   - Unit tests for UI components
   - Integration tests
   - E2E tests 