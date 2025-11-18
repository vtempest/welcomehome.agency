-- User agents table to store custom agents added by users
CREATE TABLE IF NOT EXISTS user_agents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  agent_category TEXT NOT NULL,
  agent_description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Agent assignments to properties
CREATE TABLE IF NOT EXISTS agent_property_assignments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  property_id TEXT NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'completed'
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES user_agents(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  UNIQUE(agent_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_user_agents_user ON user_agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_assignments_user ON agent_property_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_assignments_property ON agent_property_assignments(property_id);
