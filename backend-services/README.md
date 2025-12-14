# Repliers Portal - Docker & Cloudflare Deployment

This repository contains both the frontend and backend services for the Repliers Portal application.

## Deployment Options

### Option 1: Docker Compose (Local/Server Deployment)

For traditional server deployment, see [Docker Setup](#docker-setup) below.

### Option 2: Cloudflare Workers & Pages (Edge Deployment)

For edge deployment to Cloudflare, see [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for detailed instructions.

**Quick start with Cloudflare:**
```bash
# Backend
cd portal-backend-main
npm install
npm run build
wrangler deploy

# Frontend
cd portal-frontend-main
npm install
npm run cloudflare:build
wrangler deploy
```

---

## Docker Setup

This section covers deploying with Docker Compose for local development or traditional server hosting.

## Services

- **PostgreSQL** (port 5432): Database for the backend
- **Backend** (port 8080): Node.js/TypeScript API server
- **Frontend** (port 3000): Next.js React application

## Prerequisites

- Docker and Docker Compose installed
- API keys for:
  - **Repliers API**: Get your API key from [https://login.repliers.com/](https://login.repliers.com/)
  - **Mapbox API**: Get your API key from [https://www.mapbox.com/](https://www.mapbox.com/)
  - **Google Maps API** (optional): Get your API key from [https://cloud.google.com/](https://cloud.google.com/)

## Quick Start

1. **Clone or navigate to this directory**
   ```bash
   cd home-search
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file** and fill in your API keys:
   ```bash
   # Required
   REPLIERS_API_KEY=your_repliers_api_key_here
   MAPBOX_ACCESS_TOKEN=your_mapbox_api_key_here
   NEXT_PUBLIC_MAPBOX_KEY=your_mapbox_api_key_here
   
   # Optional
   NEXT_PUBLIC_GMAPS_KEY=your_google_maps_api_key_here
   ```

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

5. **View logs**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - PostgreSQL: localhost:5432

## Environment Variables

### Database
- `DB_HOST`: Database host (default: `postgres`)
- `DB_PORT`: Database port (default: `5432`)
- `DB_USER`: Database user (default: `postgres`)
- `DB_PASSWORD`: Database password (default: `postgrespw`)
- `DB_NAME`: Database name (default: `repliers`)
- `DB_USE_SSL`: Use SSL for database connection (default: `false`)

### Application Ports
- `BACKEND_PORT`: Backend server port (default: `8080`)
- `FRONTEND_PORT`: Frontend server port (default: `3000`)

### Backend Configuration
- `APP_SETTINGS_PRESET`: Settings preset (default: `defaults`)
- `APP_ENVIRONMENT`: Application environment (default: `localhost`)
- `APP_DISABLE_PERSISTENCE`: Disable database persistence (default: `false`)
- `LOGLEVEL`: Logging level (default: `info`)

### API Keys (Required)
- `REPLIERS_API_KEY`: Repliers API key
- `MAPBOX_ACCESS_TOKEN`: Mapbox API token
- `NEXT_PUBLIC_MAPBOX_KEY`: Mapbox API key for frontend
- `NEXT_PUBLIC_GMAPS_KEY`: Google Maps API key (optional)

See `.env.example` for all available environment variables.

## Docker Commands

### Build and start services
```bash
docker-compose up -d --build
```

### Stop services
```bash
docker-compose stop
```

### Stop and remove containers
```bash
docker-compose down
```

### Stop and remove containers, volumes, and networks
```bash
docker-compose down -v
```

### View running containers
```bash
docker-compose ps
```

### Execute commands in a container
```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# Database shell
docker-compose exec postgres psql -U postgres -d repliers
```

### Run database migrations manually
```bash
docker-compose exec backend npm run db:migrate:prod
```

## Development

### Running in development mode

For local development, you may want to run the services locally instead of in Docker:

#### Backend
```bash
cd portal-backend-main
npm install
npm run jwt:generate
cp env.example .env
# Edit .env with your configuration
npm run dev
```

#### Frontend
```bash
cd portal-frontend-main
npm install
cp env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

### Rebuilding images

After making changes to the code:
```bash
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Backend won't start
- Check that the database is healthy: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`
- Verify database connection settings in `.env`
- Ensure JWT keys are generated (they should be auto-generated in the container)

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` in `.env` points to `http://localhost:8080`
- Check that the backend service is running: `docker-compose ps`
- Check backend logs for errors

### Database connection issues
- Verify PostgreSQL is running: `docker-compose ps postgres`
- Check database logs: `docker-compose logs postgres`
- Verify database credentials in `.env`
- Try accessing the database directly: `docker-compose exec postgres psql -U postgres`

### Port already in use
- Change the ports in `.env`:
  - `BACKEND_PORT=8081`
  - `FRONTEND_PORT=3001`
  - `DB_PORT=5433`
- Or stop the conflicting service

## Production Considerations

For production deployment:

1. Use strong database passwords
2. Enable SSL for database connections (`DB_USE_SSL=true`)
3. Use proper secrets management (not `.env` files)
4. Configure proper CORS domains in backend
5. Use a reverse proxy (nginx/traefik) in front of the services
6. Set up proper logging and monitoring
7. Use Docker secrets or environment variables from your cloud provider

## License

See individual service directories for license information.
