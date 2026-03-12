# syntax=docker/dockerfile:1

# --- Base ---
FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# --- Install dependencies ---
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --production

# --- Build ---
FROM base AS build
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile
COPY tsconfig.json ./
COPY src ./src
RUN bun build src/index.ts --target=bun --outdir=./dist

# --- Production ---
FROM base AS production
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER bun
EXPOSE 3000

CMD ["bun", "run", "dist/index.js"]
