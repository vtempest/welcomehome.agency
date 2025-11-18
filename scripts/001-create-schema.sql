-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  -- Changed DATETIME to TEXT for SQLite compatibility
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Properties table for tracked properties
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  price INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms REAL NOT NULL,
  square_feet INTEGER NOT NULL,
  property_type TEXT NOT NULL,
  image_url TEXT,
  -- Changed DATETIME to TEXT for SQLite compatibility
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Price history for tracking price changes
CREATE TABLE IF NOT EXISTS price_history (
  id TEXT PRIMARY KEY,
  property_id TEXT NOT NULL,
  old_price INTEGER NOT NULL,
  new_price INTEGER NOT NULL,
  change_percentage REAL NOT NULL,
  -- Changed DATETIME to TEXT for SQLite compatibility
  recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- User saved properties
CREATE TABLE IF NOT EXISTS user_saved_properties (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  property_id TEXT NOT NULL,
  -- Changed DATETIME to TEXT for SQLite compatibility
  saved_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  UNIQUE(user_id, property_id)
);

-- Price alerts
CREATE TABLE IF NOT EXISTS price_alerts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  property_id TEXT NOT NULL,
  alert_type TEXT NOT NULL, -- 'drop', 'increase', 'target'
  target_price INTEGER,
  max_price INTEGER,
  percentage_threshold REAL,
  is_active INTEGER DEFAULT 1,
  -- Changed DATETIME to TEXT for SQLite compatibility
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Marketing campaigns
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL, -- 'active', 'scheduled', 'paused', 'completed'
  sent_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  leads_count INTEGER DEFAULT 0,
  -- Changed DATETIME to TEXT for SQLite compatibility
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Outreach activity log
CREATE TABLE IF NOT EXISTS outreach_activity (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  activity_type TEXT NOT NULL, -- 'email', 'sms', 'call'
  subject TEXT NOT NULL,
  status TEXT NOT NULL, -- 'sent', 'delivered', 'opened', 'clicked', 'completed'
  -- Changed DATETIME to TEXT for SQLite compatibility
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_price_history_property ON price_history(property_id);
CREATE INDEX IF NOT EXISTS idx_user_saved_properties_user ON user_saved_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_user ON price_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_marketing_campaigns_user ON marketing_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_outreach_activity_user ON outreach_activity(user_id);
