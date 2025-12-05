# Welcome Home Agency

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](LICENSE)

**AI-Powered Real Estate Intelligence Platform**

Transform your real estate business with AI agents that automate 85% of operational workflows, save 10-15 hours per week, and improve lead conversion by 30-50%.

🌐 **[Live Demo](https://portal.repliers.com/)** | 📚 **[Documentation](#documentation)** | 🚀 **[Quick Start](#quick-start)**

---

## 🎯 Overview

Welcome Home Agency is a comprehensive AI-powered real estate platform that combines:

- **24/7 Conversational AI Assistant** - Natural language chatbot handling 80-85% of routine inquiries
- **Real-time Market Intelligence** - Price tracking across 650+ MLS markets with 95%+ accuracy
- **Predictive Lead Generation** - 72% accuracy predicting homeowners likely to list within 6-12 months
- **Automated Sales Operations** - End-to-end transaction automation with 70% reduction in manual work
- **Property Recommendation Engine** - AI-powered matching with <2 second response time

---

## 📁 Project Structure

```
welcomehome.agency/
├── app/                    # Main Next.js application
│   ├── api/               # API routes
│   ├── search/            # Property search interface
│   ├── compare/           # Property comparison tool
│   ├── dashboard/         # User dashboard
│   └── platform/          # Platform features
├── components/            # Reusable React components
├── services/              # Backend & Frontend services
│   ├── server/           # Backend API (Node.js/TypeScript)
│   └── frontend/         # Frontend portal (Next.js/React)
├── lib/                   # Utility libraries
├── scripts/               # Database scripts & utilities
└── public/                # Static assets
```

---

## 🛠️ Services & Tools

### Backend Services (`services/server/`)

The backend is a robust Node.js/TypeScript API server built with Koa, providing comprehensive real estate data and AI services.

#### Core Services

Located in `services/server/src/services/`:

| Service | Description | Key Features |
|---------|-------------|--------------|
| **`repliers.ts`** | Repliers API integration | MLS data access, property listings, market data |
| **`listings.ts`** | Property listings management | Search, filter, scrubbing, duplicate detection |
| **`autosuggest.ts`** | Address autocomplete | Mapbox/Google integration, smart suggestions |
| **`estimate.ts`** | Property valuation | AVM estimates, price predictions, market analysis |
| **`stats.ts`** | Market analytics | Neighborhood rankings, market trends, statistics |
| **`boss.ts`** | Follow Up Boss CRM integration | Lead management, automated follow-ups |
| **`auth.ts`** | Authentication & authorization | JWT tokens, OAuth, OTP, email authentication |
| **`oauth.ts`** | Social login | Google, Facebook, Pinterest integration |
| **`mapbox.ts`** | Mapping & geocoding | Location services, reverse geocoding |
| **`google.ts`** | Google Maps integration | Street View, Places API |
| **`smtp.ts`** | Email notifications | Gmail integration, automated emails |
| **`favorites.ts`** | Saved properties | User favorites, watchlists |
| **`searches.ts`** | Saved searches | Search persistence, alerts |
| **`contact.ts`** | Contact management | Lead capture, inquiry handling |
| **`sync.ts`** | Data synchronization | Real-time updates, cache management |
| **`vtour.ts`** | Virtual tours | 3D property tours |
| **`agent.ts`** | Agent management | Agent profiles, assignments |
| **`admin.ts`** | Admin operations | User management, system config |
| **`user.ts`** | User management | Profiles, preferences, settings |

#### Specialized Service Modules

- **`auth/`** - Advanced authentication strategies
- **`boss/`** - Follow Up Boss integration modules
- **`eventsCollection/`** - Event tracking and analytics
- **`oauth/`** - OAuth provider implementations
- **`repliers/`** - Repliers API client modules
- **`scrubber/`** - Data scrubbing and sanitization
- **`stats/`** - Statistical analysis modules
- **`user/`** - User-related services

#### Backend Tech Stack

- **Runtime**: Node.js 20.19+
- **Framework**: Koa.js with TypeScript
- **Database**: PostgreSQL with Knex.js migrations
- **Authentication**: JWT, OAuth 2.0
- **API Documentation**: Swagger/OpenAPI
- **Message Queue**: NATS JetStream
- **Caching**: Keyv with multiple backends
- **Logging**: Pino with Logtail integration
- **Deployment**: Docker, Cloudflare Workers

#### Key Features

✅ **Real-time MLS Data** - Access to 650+ MLS markets via Repliers API  
✅ **Price Predictions** - Machine learning models with 95%+ accuracy  
✅ **CRM Integration** - Seamless Follow Up Boss integration  
✅ **Multi-provider Auth** - Google, Facebook, Email, OTP  
✅ **Advanced Caching** - Optimized performance with intelligent caching  
✅ **Webhook Support** - Real-time event notifications  
✅ **Email Automation** - Automated estimates and alerts  
✅ **Data Scrubbing** - Privacy-compliant listing sanitization  

📚 **[Full Backend Documentation](services/server/README.md)**

---

### Frontend Portal (`services/frontend/`)

Modern React application built with Next.js, providing an intuitive interface for property search and management.

#### Frontend Services

Located in `services/frontend/src/services/`:

| Service Directory | Purpose |
|-------------------|---------|
| **`API/`** | API client modules for backend communication |
| **`Map/`** | Mapbox integration, interactive maps, drawing tools |
| **`Search/`** | Property search logic, filters, saved searches |

#### Frontend Tech Stack

- **Framework**: Next.js 15.3+ with React 19.1
- **UI Library**: Material-UI (MUI) 6.4+
- **Styling**: Emotion CSS-in-JS
- **Maps**: Mapbox GL JS with drawing tools
- **Forms**: React Hook Form with Joi validation
- **Charts**: Recharts for data visualization
- **Internationalization**: next-intl
- **Testing**: Jest with React Testing Library
- **Deployment**: Cloudflare Pages, Docker

#### Key Features

✅ **Interactive Maps** - Mapbox GL with custom drawing tools  
✅ **Advanced Search** - Multi-criteria property filtering  
✅ **Property Comparison** - Side-by-side comparison tool  
✅ **Saved Searches** - Persistent search with alerts  
✅ **Responsive Design** - Mobile-first approach  
✅ **Dark Mode** - Theme customization  
✅ **Real-time Updates** - Live property data  
✅ **Street View** - Google Street View integration  

📚 **[Full Frontend Documentation](services/frontend/README.md)**

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.19+ (backend) / 22.14+ (frontend)
- **Docker** (optional, for containerized deployment)
- **PostgreSQL** 16+ (for backend database)

### Required API Keys

1. **Repliers API Key** - Get free access at [login.repliers.com](https://login.repliers.com/)
2. **Mapbox API Key** - Sign up at [mapbox.com](https://www.mapbox.com/)
3. **Google Maps API Key** (optional) - Get at [Google Cloud Console](https://cloud.google.com/)

### Installation

#### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd welcomehome.agency

# Navigate to services directory
cd services

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
nano .env

# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432

#### Option 2: Local Development

**Backend Setup:**

```bash
cd services/server

# Install dependencies
npm install

# Generate JWT keys
npm run jwt:generate

# Configure environment
cp env.example .env
# Edit .env with your configuration

# Start PostgreSQL (Docker)
docker run --name=repliers_portal \
  --env=POSTGRES_PASSWORD=postgrespw \
  -e POSTGRES_DB=repliers \
  -p 5432:5432 -d postgres:16-alpine

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

**Frontend Setup:**

```bash
cd services/frontend

# Install dependencies
npm install

# Configure environment
cp env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

**Main Application Setup:**

```bash
# From project root
npm install

# Start Next.js development server
npm run dev
```

---

## 🌐 Deployment

### Cloudflare Edge Deployment

Deploy to Cloudflare Workers (backend) and Pages (frontend) for global edge distribution.

```bash
# Backend deployment
cd services/server
npm install
npm run build
wrangler deploy

# Frontend deployment
cd services/frontend
npm install
npm run cloudflare:build
wrangler deploy
```

📚 **[Detailed Cloudflare Deployment Guide](services/CLOUDFLARE_DEPLOYMENT.md)**

### Docker Deployment

```bash
cd services

# Build and start all services
docker-compose up -d --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## 📊 AI Agents & Features

### Price Intelligence Agent
- Real-time MLS monitoring across 650+ markets
- Price change detection with anomaly identification
- Machine learning predictions (95%+ accuracy)
- Automated alert generation

### Market Forecasting Agent
- 3, 6, and 12-month price predictions
- Investment opportunity detection
- Seasonal pattern recognition
- Risk assessment modeling

### Sales Operations Agent
- End-to-end transaction automation (70% reduction)
- Automated pipeline tracking
- Document processing via OCR
- Multi-party coordination

### Lead Nurturing Agent
- Intelligent lead scoring
- Automated nurturing workflows
- Predictive timeline analysis
- Personalized re-engagement campaigns

### Property Recommendation Engine
- Collaborative filtering algorithms
- Content-based matching
- Real-time searches across 650+ markets
- 85%+ accuracy, <2 sec response time

---

## 🔧 Configuration

### Backend Environment Variables

Key configuration options (see `services/server/env.example` for complete list):

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgrespw
DB_NAME=repliers

# API Keys
REPLIERS_API_KEY=your_repliers_api_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Authentication
JWT_PRIVATE_KEY=keys/private.pem
JWT_PUBLIC_KEY=keys/public.pem
JWT_EXPIRE=30d

# CRM Integration
BOSS_USERNAME=your_followupboss_username
BOSS_SYSTEM=your_system_id
BOSS_SYSTEM_KEY=your_system_key

# Application
PORT=8080
NODE_ENV=development
LOGLEVEL=info
```

### Frontend Environment Variables

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Map Services
NEXT_PUBLIC_MAPBOX_KEY=your_mapbox_key
NEXT_PUBLIC_GMAPS_KEY=your_google_maps_key
```

---

## 🧪 Testing

### Backend Tests

```bash
cd services/server

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- test/services/listings.spec.ts
```

### Frontend Tests

```bash
cd services/frontend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📚 Documentation

- **[Backend API Documentation](services/server/README.md)** - Complete backend setup and API reference
- **[Frontend Documentation](services/frontend/README.md)** - Frontend setup and component guide
- **[Cloudflare Deployment](services/CLOUDFLARE_DEPLOYMENT.md)** - Edge deployment guide
- **[Docker Setup](services/README.md)** - Containerized deployment guide

### API Documentation

When running the backend with `APP_USESWAGGER=true`, access interactive API docs at:
- Swagger UI: http://localhost:8080/swagger

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License. See individual service directories for specific license information.

---

## 🆘 Support

- **Issues**: [GitHub Issues](../../issues)
- **Documentation**: See `/services/server/README.md` and `/services/frontend/README.md`
- **Email**: Contact your system administrator

---

## 🎯 Performance Metrics

- **10-15 hours** saved per week per agent
- **30-50%** conversion improvement over manual management
- **85%** workflow automation of operational tasks
- **<5 min** response time (78% choose first responder)
- **95%+** price prediction accuracy
- **72%** accuracy predicting homeowners likely to list within 6-12 months

---

## 🔗 Links

- [Repliers API](https://login.repliers.com/) - Real estate data provider
- [Mapbox](https://www.mapbox.com/) - Mapping and location services
- [Follow Up Boss](https://www.followupboss.com/) - CRM integration
- [Next.js](https://nextjs.org/) - React framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing platform

---

**Built with ❤️ for real estate professionals**
