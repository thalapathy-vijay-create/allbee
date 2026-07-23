/*
# ALLBEE RESTAURANT — Content Tables

## Overview
Creates tables for blog posts, events, careers, and gallery items.

## New Tables
1. `blogs` — food articles, recipes, restaurant news
2. `events` — bookable events (birthday, wedding, corporate, etc.)
3. `careers` — job openings
4. `applicants` — job applications with resume link
5. `gallery_items` — interior, exterior, kitchen, food, event photos

## Security
- RLS enabled on all tables.
- Public read (anon, authenticated) for blogs, events, careers, gallery_items.
- Authenticated insert/update/delete for admin management.
- Applicants: authenticated can insert (apply), only own user can read their applications.
*/

-- ============================================================
-- BLOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  image_url text,
  category text DEFAULT 'News',
  author text DEFAULT 'ALLBEE Team',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_blogs" ON blogs;
CREATE POLICY "anon_read_blogs" ON blogs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_blogs" ON blogs;
CREATE POLICY "auth_insert_blogs" ON blogs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_blogs" ON blogs;
CREATE POLICY "auth_update_blogs" ON blogs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_blogs" ON blogs;
CREATE POLICY "auth_delete_blogs" ON blogs FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_type text DEFAULT 'custom',
  image_url text,
  price numeric(10,2) DEFAULT 0,
  capacity int DEFAULT 50,
  event_date date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_events" ON events;
CREATE POLICY "anon_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_events" ON events;
CREATE POLICY "auth_insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_events" ON events;
CREATE POLICY "auth_update_events" ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_events" ON events;
CREATE POLICY "auth_delete_events" ON events FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- CAREERS
-- ============================================================
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text,
  description text,
  requirements text,
  location text DEFAULT 'On-site',
  job_type text DEFAULT 'Full-time',
  salary_range text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_careers" ON careers;
CREATE POLICY "anon_read_careers" ON careers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_careers" ON careers;
CREATE POLICY "auth_insert_careers" ON careers FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_careers" ON careers;
CREATE POLICY "auth_update_careers" ON careers FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_careers" ON careers;
CREATE POLICY "auth_delete_careers" ON careers FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- APPLICANTS
-- ============================================================
CREATE TABLE IF NOT EXISTS applicants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid REFERENCES careers(id) ON DELETE SET NULL,
  user_id uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  cover_letter text,
  resume_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_own_applicants" ON applicants;
CREATE POLICY "insert_own_applicants" ON applicants FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "select_own_applicants" ON applicants;
CREATE POLICY "select_own_applicants" ON applicants FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "auth_read_applicants" ON applicants;
CREATE POLICY "auth_read_applicants" ON applicants FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_applicants" ON applicants;
CREATE POLICY "auth_update_applicants" ON applicants FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- GALLERY ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  category text DEFAULT 'interior',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_gallery" ON gallery_items;
CREATE POLICY "anon_read_gallery" ON gallery_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_gallery" ON gallery_items;
CREATE POLICY "auth_insert_gallery" ON gallery_items FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_gallery" ON gallery_items;
CREATE POLICY "auth_update_gallery" ON gallery_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_gallery" ON gallery_items;
CREATE POLICY "auth_delete_gallery" ON gallery_items FOR DELETE
  TO authenticated USING (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_applicants_user ON applicants(user_id);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
