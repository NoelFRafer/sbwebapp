/*
  # Create slides and news tables for Sangguniang Bayan website

  1. New Tables
    - `slides`
      - `id` (uuid, primary key)
      - `image_url` (text) - URL for the slide image
      - `thrust` (text) - The thrust/mission statement
      - `quote` (text) - The main quote content
      - `author` (text) - Author of the quote
      - `position` (text) - Position/title of the author
      - `order_index` (integer) - For ordering slides
      - `is_active` (boolean) - To enable/disable slides
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `news_items`
      - `id` (uuid, primary key)
      - `title` (text) - News article title
      - `date` (date) - Publication date
      - `content` (text) - News article content
      - `is_featured` (boolean) - For featured news
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (since this is a public website)
    - Add policies for authenticated users to manage content

  3. Sample Data
    - Insert existing carousel and news data
*/

-- Create slides table
CREATE TABLE IF NOT EXISTS slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  thrust text NOT NULL,
  quote text NOT NULL,
  author text NOT NULL,
  position text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news_items table
CREATE TABLE IF NOT EXISTS news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  content text NOT NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read active slides"
  ON slides
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can read news items"
  ON news_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can manage slides"
  ON slides
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage news"
  ON news_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample slides data
INSERT INTO slides (image_url, thrust, quote, author, position, order_index) VALUES
(
  'https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800',
  'our thrust:',
  'to formulate a robust legislative framework for disaster preparedness, response, mitigation, and rehabilitation, ensuring the safety and resilience of the community in the face of natural calamities and emergencies',
  'Hon. Juan P. Enero',
  'Chairman, Committee on Disaster Risk Reduction Management',
  1
),
(
  'https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800',
  'our mission:',
  'to serve the people of Capalonga with integrity, transparency, and dedication through effective governance and community-focused legislation',
  'Hon. Maria Santos',
  'Committee on Good Governance',
  2
),
(
  'https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800',
  'our vision:',
  'a progressive and resilient Capalonga where every citizen enjoys sustainable development, quality services, and enhanced quality of life',
  'Hon. Roberto Cruz',
  'Committee on Development Planning',
  3
);

-- Insert sample news data
INSERT INTO news_items (title, date, content, is_featured) VALUES
(
  'MOA to Boost Livelihoods of 8 Farmers'' Associations',
  '2025-08-18',
  'Good news for our local farmers! The Sangguniang Bayan has given the green light for Mayor Luz E. Ricasio to sign a Memorandum of Agreement (MOA) with eight (8) farmers'' associations, paving the way for the implementation of their approved livelihood projects for 2025.',
  true
),
(
  'Landmark Insurance Deal for Farmers and Fisherfolk',
  '2025-08-16',
  'A Memorandum of Agreement (MOA) will provide subsidized insurance to 1,000 of Capalonga''s farmers, fisherfolk, and other agricultural stakeholders.',
  true
),
(
  'Outstanding Capalonqueños Recognition',
  '2025-08-12',
  'A resolution to formally honor and recognize the ''Illustrious Natives of Capalonga'' who have achieved remarkable distinctions in sports, science, and culture, both locally and around the world.',
  false
),
(
  'New Infrastructure Development Program',
  '2025-08-10',
  'The Sangguniang Bayan approves a comprehensive infrastructure development program aimed at improving road networks and public facilities across all barangays.',
  false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS slides_order_active_idx ON slides (order_index, is_active);
CREATE INDEX IF NOT EXISTS news_items_date_idx ON news_items (date DESC);
CREATE INDEX IF NOT EXISTS news_items_featured_idx ON news_items (is_featured, date DESC);