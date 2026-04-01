# Monorepo Structure

This is a monorepo containing a mobile client and server application with shared packages.

## Structure

```
/
├── apps/
│   └── mobile/          # React Native mobile app (Expo)
├── server/              # NestJS server application
├── packages/            # Shared packages
│   ├── types/           # Shared TypeScript types
│   └── utils/           # Shared utility functions
└── package.json         # Root package.json with workspace config
```

## Tech Stack

### Mobile Client (`/apps/mobile`)
- TypeScript
- Expo
- React Native
- Expo Router
- NativeWind (Tailwind CSS for RN)
- Zustand (state management)
- TanStack Query (data fetching)
- React Native Reanimated

### Server (`/server`)
- TypeScript
- NestJS
- PostgreSQL
- Prisma ORM

### Shared Packages (`/packages`)
- `@repo/types` - Shared TypeScript interfaces and types
- `@repo/utils` - Shared utility functions

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 9+
- PostgreSQL (for server)
- Expo CLI (for mobile)

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client
cd server && pnpm prisma:generate
```

### Development

```bash
# Run both mobile and server
pnpm dev

# Or run separately
pnpm dev:mobile    # Start mobile app
pnpm dev:server    # Start server
```

### Build

```bash
# Build all packages and apps
pnpm build

# Or build individually
pnpm build:packages
pnpm build:server
pnpm build:mobile
```

## Environment Variables

### Server
Copy `.env.example` to `.env` in the server directory:

```bash
cp server/.env.example server/.env
```

Update the `DATABASE_URL` with your PostgreSQL connection string.

## Package Scripts

### Root
- `pnpm dev` - Run both mobile and server
- `pnpm dev:mobile` - Run mobile app
- `pnpm dev:server` - Run server
- `pnpm build` - Build everything
- `pnpm lint` - Lint all packages
- `pnpm typecheck` - Type check all packages

### Mobile (`apps/mobile`)
- `pnpm dev` - Start Expo dev server
- `pnpm build` - Type check and export

### Server (`server`)
- `pnpm dev` - Start NestJS in watch mode
- `pnpm build` - Build for production
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio

## Importing Shared Packages

In mobile or server code:

```typescript
// Import shared types
import { User, ApiResponse } from '@repo/types';

// Import shared utilities
import { validateEmail, formatDate } from '@repo/utils';
```
