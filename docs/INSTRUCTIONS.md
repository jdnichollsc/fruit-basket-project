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

# Create the web application with TypeScript and Vite
npx nx g @nx/react:app web --style=css --routing=false --bundler=vite --js=false --typescript

# Create shared libraries
npx nx g @nx/react:lib ui --directory=libs/shared/ui --bundler=vite
npx nx g @nx/react:lib utils --directory=libs/shared/utils --bundler=vite

# Add testing libraries
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event msw

# Add utility libraries
npm install clsx tailwind-merge
```

### Add TailwindCSS and DaisyUI
```sh
# Install TailwindCSS, DaisyUI and their dependencies
npm install -D tailwindcss postcss autoprefixer daisyui

# Initialize TailwindCSS
npx tailwindcss init -p

# Create tailwind.config.js
cat > apps/web/tailwind.config.js << EOL
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../../libs/shared/ui/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}
EOL

# Update styles.css
cat > apps/web/src/styles.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply min-h-screen bg-base-100 text-base-content;
  }
}
EOL
```

### DaisyUI Component Classes

Common DaisyUI classes used in our components:

1. Form Elements:
   - `input input-bordered`: Styled input fields
   - `btn btn-primary`: Primary action buttons
   - `btn btn-ghost`: Ghost buttons for secondary actions
   - `form-control`: Form control wrapper

2. Layout:
   - `bg-base-100`: Base background color
   - `text-base-content`: Base text color
   - `text-error`: Error text color

3. States:
   - `hover:text-error`: Error color on hover
   - `disabled:opacity-50`: Reduced opacity for disabled state

## Project Structure

```
fruit-basket/
├── apps/
│   ├── web/                    # Main React application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── hooks/     # Custom React hooks
│   │   │   │   ├── pages/     # Page components
│   │   │   │   ├── services/  # Application services
│   │   │   │   └── types/     # TypeScript types
│   │   │   ├── main.tsx
│   │   │   └── styles.css
│   │   └── jest.config.ts
│   └── web-e2e/               # End-to-end tests
│       ├── src/
│       │   ├── e2e/           # E2E test specs
│       │   ├── fixtures/      # Test fixtures
│       │   └── support/       # Test support files
│       └── cypress.config.ts
├── libs/
│   └── shared/
│       ├── ui/                # Shared UI components
│       │   ├── src/
│       │   │   ├── lib/
│       │   │   │   ├── fruit-list/
│       │   │   │   ├── fruit-form/
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   └── jest.config.ts
│       └── utils/             # Shared utilities
└── docs/
    ├── INSTRUCTIONS.md        # This file
    └── ONBOARDING.md         # Developer onboarding guide

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

## Utility Functions

Create a utils library:
```sh
npx nx g @nx/react:lib utils --directory=shared
```

Add the following utilities:

```typescript
// libs/shared/utils/src/lib/styles.ts
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