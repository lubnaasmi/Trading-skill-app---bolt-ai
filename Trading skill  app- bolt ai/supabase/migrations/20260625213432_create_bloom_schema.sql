/*
# Bloom Schema — Peer Skill-Swap Platform

1. New Tables
- `bloomers` — teen profiles offering and wanting skills
  - `id` (uuid, primary key)
  - `name` (text, not null) — display name
  - `age` (integer, not null) — teen age (13-19)
  - `avatar_url` (text) — profile picture URL
  - `bg_color` (text) — card background color
  - `offering` (text, not null) — skill they teach
  - `wants` (text, not null) — skill they want to learn
  - `category` (text, not null) — Tech, Art, School, Music, Sports, Cooking, etc.
  - `match_score` (integer) — compatibility percentage
  - `watermark` (text) — decorative icon type
  - `created_at` (timestamptz)

- `trades` — active swap agreements between bloomers
  - `id` (uuid, primary key)
  - `bloomer_id` (uuid, references bloomers)
  - `you_give` (text) — skill you teach
  - `you_get` (text) — skill you learn
  - `status` (text) — pending, active, completed
  - `progress` (integer) — completion percentage
  - `created_at` (timestamptz)

- `messages` — chat messages between bloomers
  - `id` (uuid, primary key)
  - `bloomer_id` (uuid, references bloomers)
  - `sender` (text) — 'me' or their name
  - `text` (text, not null)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all tables.
- Single-tenant (no auth): allow anon + authenticated CRUD.
*/

CREATE TABLE IF NOT EXISTS bloomers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL CHECK (age >= 13 AND age <= 19),
  avatar_url text,
  bg_color text DEFAULT '#F5C842',
  offering text NOT NULL,
  wants text NOT NULL,
  category text NOT NULL,
  match_score integer DEFAULT 0,
  watermark text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bloomer_id uuid REFERENCES bloomers(id) ON DELETE CASCADE,
  you_give text NOT NULL,
  you_get text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  progress integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bloomer_id uuid REFERENCES bloomers(id) ON DELETE CASCADE,
  sender text NOT NULL,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bloomers ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bloomers" ON bloomers;
CREATE POLICY "anon_select_bloomers" ON bloomers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bloomers" ON bloomers;
CREATE POLICY "anon_insert_bloomers" ON bloomers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bloomers" ON bloomers;
CREATE POLICY "anon_update_bloomers" ON bloomers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bloomers" ON bloomers;
CREATE POLICY "anon_delete_bloomers" ON bloomers FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_trades" ON trades;
CREATE POLICY "anon_select_trades" ON trades FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trades" ON trades;
CREATE POLICY "anon_insert_trades" ON trades FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trades" ON trades;
CREATE POLICY "anon_update_trades" ON trades FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trades" ON trades;
CREATE POLICY "anon_delete_trades" ON trades FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_messages" ON messages;
CREATE POLICY "anon_select_messages" ON messages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_messages" ON messages;
CREATE POLICY "anon_insert_messages" ON messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_messages" ON messages;
CREATE POLICY "anon_update_messages" ON messages FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_messages" ON messages;
CREATE POLICY "anon_delete_messages" ON messages FOR DELETE
  TO anon, authenticated USING (true);
