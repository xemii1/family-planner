# Stage 1: Base image
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY server/package.json ./server/

RUN pnpm install --frozen-lockfile

# Stage 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/types/node_modules ./packages/types/node_modules
COPY --from=deps /app/packages/utils/node_modules ./packages/utils/node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules

COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY server ./server
COPY tsconfig.base.json ./

# Build shared packages first
RUN cd packages/types && pnpm build
RUN cd packages/utils && pnpm build

# Build server
WORKDIR /app/server
RUN pnpm build

# Stage 4: Production
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package.json ./server/
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/packages/types ./packages/types
COPY --from=builder /app/packages/utils ./packages/utils
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/types/node_modules ./packages/types/node_modules
COPY --from=builder /app/packages/utils/node_modules ./packages/utils/node_modules

# Copy Prisma schema and generate client
COPY --from=builder /app/server/prisma ./server/prisma
WORKDIR /app/server
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main.js"]
