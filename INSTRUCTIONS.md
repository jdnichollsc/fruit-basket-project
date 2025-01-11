# Fruit Basket Project Setup Instructions

## Initial Setup

1. Create a new Nx workspace:
```bash
npx create-nx-workspace@latest fruit-basket-project --preset=react-monorepo
```

2. Add the necessary libraries:
```bash
nx g @nx/react:library ui --directory=libs/shared/ui --importPath=@fruit-basket/ui
nx g @nx/react:library utils --directory=libs/shared/utils --importPath=@fruit-basket/utils
```

## UI Setup

1. Install TailwindCSS and DaisyUI:
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest daisyui@latest
```

2. Initialize TailwindCSS in the web project:
```bash
cd web && npx tailwindcss init -p
```

3. Configure TailwindCSS with DaisyUI in `web/tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../libs/shared/ui/src/**/*.{js,jsx,ts,tsx}"
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
```

4. Add Tailwind directives to `web/src/styles.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply min-h-screen bg-base-100 text-base-content;
  }
}
```

## Component Development

1. Create UI components in the shared UI library:
   - FruitForm: Form component for adding fruits
   - FruitList: List component for displaying fruits

2. Create utility functions in the shared utils library:
   - API functions for CRUD operations
   - Helper functions for data manipulation

## Testing Setup

1. Configure Jest for testing:
```bash
nx g @nx/jest:setup-project ui
nx g @nx/jest:setup-project utils
```

2. Set up test coverage requirements in `jest.config.ts`:
```js
coverageThreshold: {
  global: {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
  },
}
```

## Development Workflow

1. Run the development server:
```bash
nx serve web
```

2. Run tests:
```bash
nx test ui
nx test utils
```

3. Run linting:
```bash
nx lint ui
nx lint utils
nx lint web
```

## Project Structure

```
fruit-basket-project/
├── libs/
│   └── shared/
│       ├── ui/          # Shared UI components
│       └── utils/       # Shared utilities
└── web/                 # Main web application
``` 