# OFFER-HUB Frontend

Production-grade Next.js 16 application with App Router.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Auth**: Auth.js v5
- **State**: Zustand, React Query (configured, not implemented)
- **Forms**: React Hook Form (configured, not implemented)
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js >= 20.9
- npm

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:
- `AUTH_SECRET` - Secret for Auth.js session encryption
- `NEXT_PUBLIC_API_BASE_URL` - Base URL for API requests

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

### Linting and Formatting

```bash
npm run lint        # Check for lint errors
npm run lint:fix    # Fix lint errors
npm run format      # Format code with Prettier
npm run format:check # Check formatting
```

## Project Structure

```
src/
  app/           # Next.js App Router pages and layouts
  auth.ts        # Auth.js v5 configuration
  components/    # React components
    ui/          # shadcn/ui components
    bento/       # Bento grid components
    neumorphism/ # Neumorphism components
  lib/           # Utility functions
  services/      # API client and services
  types/         # TypeScript type definitions
docs/            # Project documentation
```

## Documentation

See the [docs](./docs) folder for detailed documentation:

- [Architecture](./docs/architecture.md)
- [Code Standards](./docs/standards.md)
- [Naming Conventions](./docs/naming.md)
- [API Response Standard](./docs/api-response-standard.md)
- [Style Guide](./docs/style-guide.md)
- [Mock Data](./docs/mock-data.md)

## Design System

- **Style**: Bento grids + Neumorphism
- **Theme**: Dark-first design
- **Colors**: Teal primary, Dark blue secondary

See [Style Guide](./docs/style-guide.md) for full color palette and design rules.
