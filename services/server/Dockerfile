FROM node:20.19.1-alpine AS base

# Install build dependencies
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript compilation)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Generate JWT keys if they don't exist
RUN if [ ! -f keys/private.pem ]; then \
    mkdir -p keys && \
    openssl genrsa -out keys/private.pem 2048 && \
    openssl rsa -in keys/private.pem -pubout -out keys/public.pem; \
    fi

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20.19.1-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application (migrations are compiled to dist/migrations during build)
COPY --from=base /app/dist ./dist
COPY --from=base /app/keys ./keys

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 8080

# Wait for database and run migrations before starting
# We skip db:jsts_check since everything is already built
CMD ["sh", "-c", "[ \"$APP_DISABLE_PERSISTENCE\" = \"true\" ] && npm start || (npm run knex:prod migrate:latest && npm start)"]

