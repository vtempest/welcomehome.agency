# Cloudflare Workers & Pages Deployment Guide

This guide explains how to deploy the Repliers Portal application to Cloudflare Workers (backend) and Cloudflare Pages (frontend).

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://www.cloudflare.com)
2. **Wrangler CLI**: Install globally or use npx
   ```bash
   npm install -g wrangler@latest
   ```
3. **Cloudflare Login**: Authenticate with Wrangler
   ```bash
   wrangler login
   ```

## Architecture

- **Backend**: Deployed as Cloudflare Worker (serverless edge runtime)
- **Frontend**: Deployed as Cloudflare Worker using OpenNext adapter for Next.js
- **Database**: Use Cloudflare D1 (SQLite) or external PostgreSQL via HTTP

## Backend Deployment (Cloudflare Workers)

### 1. Navigate to Backend Directory

```bash
cd portal-backend-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Configure Wrangler

Edit `wrangler.toml` and update:
- `account_id`: Your Cloudflare account ID (get it from Cloudflare dashboard)
- Database bindings if using D1
- Routes if using custom domain

### 5. Set Secrets

Set sensitive environment variables as secrets:

```bash
wrangler secret put REPLIERS_API_KEY
wrangler secret put MAPBOX_ACCESS_TOKEN
wrangler secret put JWT_PRIVATE_KEY
wrangler secret put JWT_PUBLIC_KEY
```

For database credentials (if using external DB):
```bash
wrangler secret put DB_HOST
wrangler secret put DB_USER
wrangler secret put DB_PASSWORD
wrangler secret put DB_NAME
```

### 6. Optional: Create D1 Database (if using Cloudflare D1)

```bash
wrangler d1 create repliers-db
```

This will output a database ID. Add it to `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "repliers-db"
database_id = "your-database-id-here"
```

### 7. Run Database Migrations (D1)

If using D1, run migrations:
```bash
wrangler d1 execute repliers-db --file=./dist/migrations/20240817170531_zero.js
# Repeat for all migration files
```

### 8. Test Locally

```bash
npm run cloudflare:dev
```

### 9. Deploy to Cloudflare

```bash
npm run cloudflare:deploy
```

Or manually:
```bash
wrangler deploy
```

### 10. View Logs

```bash
npm run cloudflare:tail
```

Or:
```bash
wrangler tail
```

## Frontend Deployment (Cloudflare Workers with OpenNext)

### 1. Navigate to Frontend Directory

```bash
cd portal-frontend-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Edit `wrangler.toml` and update:
- `NEXT_PUBLIC_API_URL`: Your backend Worker URL (e.g., `https://repliers-portal-backend.your-subdomain.workers.dev`)
- Set secrets for public API keys:
  ```bash
  wrangler secret put NEXT_PUBLIC_MAPBOX_KEY
  wrangler secret put NEXT_PUBLIC_GMAPS_KEY
  ```

### 4. Build with OpenNext

```bash
npm run cloudflare:build
```

This creates the `.open-next` directory with the optimized build.

### 5. Test Locally

```bash
npm run cloudflare:dev
```

Or preview:
```bash
npm run cloudflare:preview
```

### 6. Deploy to Cloudflare

```bash
npm run cloudflare:deploy
```

Or manually:
```bash
npm run cloudflare:build
wrangler deploy
```

### 7. View Logs

```bash
npm run cloudflare:tail
```

## Custom Domain Setup

### Backend Domain

1. In Cloudflare dashboard, add your domain
2. Create a CNAME or A record pointing to your Worker
3. Update `wrangler.toml`:
   ```toml
   routes = [
     { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```
4. Deploy with routes:
   ```bash
   wrangler deploy
   ```

### Frontend Domain

1. Add route in `wrangler.toml`:
   ```toml
   routes = [
     { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" },
     { pattern = "www.yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```
2. Deploy:
   ```bash
   wrangler deploy
   ```

## Environment Variables

### Backend (`portal-backend-main/wrangler.toml`)

**Public variables** (set in `[vars]` section):
- `APP_SETTINGS_PRESET`
- `APP_ENVIRONMENT`
- `NODE_ENV`
- `LOGLEVEL`
- `REPLIERS_BASE_URL`

**Secrets** (set via `wrangler secret put`):
- `REPLIERS_API_KEY` (required)
- `MAPBOX_ACCESS_TOKEN` (required)
- `JWT_PRIVATE_KEY` (optional, auto-generated)
- `JWT_PUBLIC_KEY` (optional, auto-generated)
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (if using external DB)

### Frontend (`portal-frontend-main/wrangler.toml`)

**Public variables** (set in `[vars]` section):
- `NEXT_PUBLIC_API_URL`

**Secrets** (set via `wrangler secret put`):
- `NEXT_PUBLIC_MAPBOX_KEY`
- `NEXT_PUBLIC_GMAPS_KEY`

## Database Options

### Option 1: Cloudflare D1 (Recommended for Workers)

D1 is Cloudflare's SQLite-based edge database. It's optimized for Workers but has some limitations.

**Pros:**
- Native Cloudflare integration
- Low latency (edge database)
- Free tier available

**Cons:**
- SQLite (limited features compared to PostgreSQL)
- Need to adapt migrations for SQLite
- Limited to Cloudflare ecosystem

**Setup:**
```bash
# Create database
wrangler d1 create repliers-db

# Run migrations
wrangler d1 execute repliers-db --file=./path/to/migration.js

# Query locally
wrangler d1 execute repliers-db --command="SELECT * FROM users"
```

### Option 2: External PostgreSQL via HTTP (Turso, Supabase, etc.)

Use a managed PostgreSQL service with HTTP API support or connection pooling.

**Pros:**
- Full PostgreSQL features
- Existing migrations work
- Can use any PostgreSQL provider

**Cons:**
- Additional latency (HTTP request)
- May require connection pooling service
- Potential costs

**Setup:**
1. Use a PostgreSQL service with HTTP API (like Supabase REST API)
2. Or use a connection pooler like PgBouncer with HTTP interface
3. Set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` secrets

### Option 3: Hybrid Approach

- Use D1 for simple queries
- Use external PostgreSQL for complex operations
- Implement a service layer that routes queries appropriately

## Limitations & Considerations

### Backend Limitations

1. **Node.js Compatibility**: Workers use Web Standards API, not full Node.js
   - Some Node.js modules may not work
   - File system access is limited
   - Process-specific APIs don't exist

2. **Execution Time**: 
   - Free tier: 10ms CPU time, 30s total time
   - Paid: 50ms CPU time, 30s total time
   - Consider breaking long operations into smaller tasks

3. **Memory**: 
   - 128MB memory limit
   - Consider optimizing large operations

4. **Database Connections**:
   - No direct TCP connections
   - Must use HTTP API or D1
   - Connection pooling handled differently

5. **NATS/JetStream**:
   - May not be compatible with Workers
   - Consider using Cloudflare Queues instead
   - Or use external message queue service

### Frontend Limitations

1. **Next.js Features**:
   - Some Next.js features may not work in Workers
   - Server-side rendering works, but with constraints
   - Image optimization may have limitations

2. **File System**:
   - Static files must be in R2 or Assets binding
   - No local file system access

## Troubleshooting

### Backend Issues

**Error: Module not found**
- Ensure `compatibility_flags = ["nodejs_compat"]` is set in `wrangler.toml`
- Some Node.js modules may need polyfills

**Error: Database connection failed**
- Check if using D1 bindings correctly
- Verify external DB credentials if using external DB
- Ensure database is accessible from Cloudflare edge

**Error: JWT keys not found**
- Generate keys: `npm run jwt:generate`
- Set secrets: `wrangler secret put JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY`

### Frontend Issues

**Error: Build failed**
- Ensure all dependencies are installed: `npm install`
- Check `open-next.config.ts` configuration
- Verify Next.js configuration compatibility

**Error: API calls failing**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify CORS settings in backend
- Check backend Worker is deployed and accessible

## Monitoring & Analytics

### Workers Analytics

View in Cloudflare Dashboard:
- Request metrics
- Error rates
- CPU time usage
- Memory usage
- Logs

### Tail Logs in Real-time

```bash
# Backend
cd portal-backend-main
npm run cloudflare:tail

# Frontend
cd portal-frontend-main
npm run cloudflare:tail
```

## Cost Considerations

### Workers Pricing

- **Free Tier**: 100,000 requests/day, 10ms CPU time per request
- **Paid Tier**: $5/month + $0.50 per million requests, 50ms CPU time

### D1 Pricing

- **Free Tier**: 5GB storage, 5 million reads/month
- **Paid Tier**: $0.001/GB storage, $1.00 per million reads

### Recommendations

- Monitor usage in Cloudflare dashboard
- Optimize for CPU time and memory usage
- Use caching strategies (KV, Cache API)
- Consider Workers for high-traffic endpoints

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext Cloudflare Adapter](https://github.com/serverless-stack/open-next)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)

## Quick Deploy Script

Create a `deploy.sh` script:

```bash
#!/bin/bash

# Backend
cd portal-backend-main
npm install
npm run build
wrangler deploy

# Frontend
cd ../portal-frontend-main
npm install
npm run cloudflare:build
wrangler deploy

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

