# Architecture

## Overview

OFFER-HUB Frontend is a Next.js 16 application using the App Router pattern. The project follows a modular architecture with clear separation of concerns.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 (CSS-first configuration)
- **Auth**: Auth.js v5
- **State Management**: Zustand (configured)
- **Server State**: TanStack React Query (configured)
- **Forms**: React Hook Form (configured)
- **Validation**: Zod

## Directory Structure

```
src/
  app/              # Next.js App Router
    api/            # API routes
    layout.tsx      # Root layout
    page.tsx        # Home page
    globals.css     # Global styles and CSS variables

  auth.ts           # Auth.js v5 configuration

  components/       # React components
    ui/             # shadcn/ui components
    bento/          # Bento grid layout components
    neumorphism/    # Neumorphism styled components

  lib/              # Utility functions
    cn.ts           # Class name utility (clsx + tailwind-merge)
    env.ts          # Environment variable validation

  services/         # API client and external services
    http-client.ts  # Fetch wrapper

  types/            # TypeScript type definitions
    api-response.types.ts   # API response contract
    http.types.ts           # HTTP client types
```

## Why App Router?

1. **Server Components**: Default server rendering for better performance
2. **Streaming**: Progressive rendering with Suspense
3. **Nested Layouts**: Shared UI across routes
4. **Parallel Routes**: Multiple pages in the same view
5. **Intercepting Routes**: Modal patterns without breaking back button

## Path Aliases

All imports use the `@/` alias mapped to `src/`:

```typescript
// Correct
import { cn } from "@/lib/cn";
import type { ApiResponse } from "@/types/api-response.types";

// Incorrect - never use relative imports
import { cn } from "../../lib/cn";
```

Configuration in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Styling Architecture

### CSS Variables

All design tokens are defined as CSS variables in `globals.css`:

- Colors: `--color-*`
- Shadows: `--shadow-*`
- Gradients: `--gradient-*`

### Tailwind CSS 4

Uses CSS-first configuration with `@theme` directive instead of JavaScript config.

Theme customization happens in `globals.css`:
```css
@theme {
  --color-primary: #149A9B;
}
```

### Dark Mode

Dark mode is class-based (`.dark` on `<html>`):
```css
@custom-variant dark (&:where(.dark, .dark *));
```

## Authentication

Auth.js v5 is configured in `src/auth.ts` and exposes:
- `auth()` - Get session (server-side)
- `handlers` - API route handlers
- `signIn()` - Sign in function
- `signOut()` - Sign out function

## HTTP Client

The HTTP client in `src/services/http-client.ts` provides:
- Typed request functions: `httpGet`, `httpPost`, `httpPut`, `httpPatch`, `httpDelete`
- Automatic base URL configuration
- Error normalization to standard `ApiResponse` format
- Support for Next.js caching options
