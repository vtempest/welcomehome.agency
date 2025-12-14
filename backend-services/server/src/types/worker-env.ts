/**
 * Cloudflare Workers Environment Types
 */

export interface Env {
  // Environment variables
  APP_SETTINGS_PRESET?: string;
  APP_ENVIRONMENT?: string;
  NODE_ENV?: string;
  LOGLEVEL?: string;
  REPLIERS_API_KEY?: string;
  REPLIERS_BASE_URL?: string;
  REPLIERS_API_LIMIT?: string;
  REPLIERS_API_INTERVAL_MS?: string;
  MAPBOX_ACCESS_TOKEN?: string;
  JWT_PRIVATE_KEY?: string;
  JWT_PUBLIC_KEY?: string;
  DB_HOST?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_NAME?: string;
  DB_PORT?: string;
  
  // D1 Database binding (if using)
  DB?: D1Database;
  
  // KV Namespace bindings (if using)
  CACHE?: KVNamespace;
  
  // R2 Bucket bindings (if using)
  ASSETS?: R2Bucket;
}

