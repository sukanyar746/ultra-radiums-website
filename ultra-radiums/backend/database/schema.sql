-- =========================================================================
-- Database Tables Schema for Ultra Radiums
-- Run this script inside your Supabase SQL Editor to initialize tables
-- =========================================================================

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  material VARCHAR(50) NOT NULL,
  custom_text VARCHAR(255) NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  color VARCHAR(50) NOT NULL,
  estimated_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert mockup showcase posts
INSERT INTO posts (category, author, title, description, upvotes) VALUES
('neon', 'u/NeonEnthusiast', 'Just installed our new custom Neon LED sign board! The glow is incredible.', 'Manufactured with high-grade flexible silicone neon strips on transparent acrylic backing. Very energy efficient and adds an incredible vibe to our storefront.', 432),
('rto', 'u/RiderMysore', 'High-security RTO-approved German font plate for my new ride.', 'Standard plate with the blue IND hologram strip and laser embossed font. Kept it clean and compliant with the traffic guidelines.', 219),
('nameplate', 'u/HomeDesignInspiration', 'Beautiful teak-wood house name plate with warm brass lettering.', 'Ordered this for our new house. The CNC routing on teak wood coupled with heavy-duty polished brass letters feels extremely premium.', 567),
('signage', 'u/CorporateOfficeMYS', 'Brushed metal lobby 3D acrylic sign boards with backlighting.', 'Installed these acrylic solid block letters with LED halo illumination for our reception wall. Professional and very clean.', 184)
ON CONFLICT DO NOTHING;
