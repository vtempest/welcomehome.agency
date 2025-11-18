-- Fixed all column names to match the schema exactly
-- Replaced all strftime calls with static ISO 8601 timestamps for Turso compatibility

-- Insert demo user first so foreign keys work
INSERT INTO users (id, email, name, image, created_at) 
SELECT 'demo-user', 'demo@welcomehomeagency.com', 'Demo User', 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo', '2025-01-01 00:00:00'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE id = 'demo-user');

-- Insert sample properties
INSERT INTO properties (id, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url) 
SELECT 'prop-1', '1234 Oak Street', 'Austin', 'TX', '78701', 465000, 3, 2, 2100, 'house', '/modern-house-exterior.png'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE id = 'prop-1');

INSERT INTO properties (id, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url) 
SELECT 'prop-2', '5678 Maple Ave', 'Austin', 'TX', '78702', 749000, 4, 3, 3200, 'house', '/luxury-apartment-building.png'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE id = 'prop-2');

INSERT INTO properties (id, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url) 
SELECT 'prop-3', '910 Pine Road', 'Round Rock', 'TX', '78664', 379000, 3, 2.5, 1850, 'townhouse', '/modern-townhouse.png'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE id = 'prop-3');

INSERT INTO properties (id, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url) 
SELECT 'prop-4', '2468 Elm Street', 'Austin', 'TX', '78703', 625000, 3, 2, 2400, 'house', '/beachfront-condo.png'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE id = 'prop-4');

INSERT INTO properties (id, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url) 
SELECT 'prop-5', '1357 Cedar Lane', 'Georgetown', 'TX', '78626', 425000, 4, 2, 2200, 'house', '/modern-suburban-house.png'
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE id = 'prop-5');

-- Using static timestamps instead of date functions
-- Insert price history (timestamps are 2 hours, 5 hours, and 1 day ago)
INSERT INTO price_history (id, property_id, old_price, new_price, change_percentage, recorded_at) 
SELECT 'ph-1', 'prop-1', 485000, 465000, -4.1, '2025-01-14 10:00:00'
WHERE NOT EXISTS (SELECT 1 FROM price_history WHERE id = 'ph-1');

INSERT INTO price_history (id, property_id, old_price, new_price, change_percentage, recorded_at) 
SELECT 'ph-2', 'prop-2', 725000, 749000, 3.3, '2025-01-14 07:00:00'
WHERE NOT EXISTS (SELECT 1 FROM price_history WHERE id = 'ph-2');

INSERT INTO price_history (id, property_id, old_price, new_price, change_percentage, recorded_at) 
SELECT 'ph-3', 'prop-3', 395000, 379000, -4.0, '2025-01-13 12:00:00'
WHERE NOT EXISTS (SELECT 1 FROM price_history WHERE id = 'ph-3');

-- Fixed column names: campaign_name->name, campaign_type removed, emails_*->*_count
-- Insert marketing campaigns (using correct column names from schema)
INSERT INTO marketing_campaigns (id, user_id, name, status, sent_count, opened_count, clicked_count, leads_count, created_at) 
SELECT 'camp-1', 'demo-user', 'Spring Open House Series', 'active', 1247, 412, 89, 45, '2025-01-10 09:00:00'
WHERE NOT EXISTS (SELECT 1 FROM marketing_campaigns WHERE id = 'camp-1');

INSERT INTO marketing_campaigns (id, user_id, name, status, sent_count, opened_count, clicked_count, leads_count, created_at) 
SELECT 'camp-2', 'demo-user', 'New Listings Alert', 'active', 523, 312, 67, 28, '2025-01-12 14:30:00'
WHERE NOT EXISTS (SELECT 1 FROM marketing_campaigns WHERE id = 'camp-2');

INSERT INTO marketing_campaigns (id, user_id, name, status, sent_count, opened_count, clicked_count, leads_count, created_at) 
SELECT 'camp-3', 'demo-user', 'Price Drop Notifications', 'active', 892, 445, 112, 56, '2025-01-08 11:15:00'
WHERE NOT EXISTS (SELECT 1 FROM marketing_campaigns WHERE id = 'camp-3');

-- Fixed column names: removed property_id, contact_type->activity_type, notes->subject
-- Insert outreach activity (using correct column names from schema)
INSERT INTO outreach_activity (id, user_id, contact_name, activity_type, subject, status, created_at) 
SELECT 'out-1', 'demo-user', 'Sarah Johnson', 'email', 'Property Details - 1234 Oak Street', 'sent', '2025-01-14 08:30:00'
WHERE NOT EXISTS (SELECT 1 FROM outreach_activity WHERE id = 'out-1');

INSERT INTO outreach_activity (id, user_id, contact_name, activity_type, subject, status, created_at) 
SELECT 'out-2', 'demo-user', 'Michael Chen', 'sms', 'New Listing Match in Austin', 'delivered', '2025-01-14 09:15:00'
WHERE NOT EXISTS (SELECT 1 FROM outreach_activity WHERE id = 'out-2');

INSERT INTO outreach_activity (id, user_id, contact_name, activity_type, subject, status, created_at) 
SELECT 'out-3', 'demo-user', 'Emily Rodriguez', 'call', 'Follow-up on 2468 Elm Street', 'completed', '2025-01-14 10:45:00'
WHERE NOT EXISTS (SELECT 1 FROM outreach_activity WHERE id = 'out-3');

INSERT INTO outreach_activity (id, user_id, contact_name, activity_type, subject, status, created_at) 
SELECT 'out-4', 'demo-user', 'David Kim', 'email', 'HOA Information - 910 Pine Road', 'opened', '2025-01-14 11:20:00'
WHERE NOT EXISTS (SELECT 1 FROM outreach_activity WHERE id = 'out-4');
