/*
  # Create resolutions table for Sangguniang Bayan

  1. New Tables
    - `resolutions`
      - `id` (uuid, primary key)
      - `resolution_number` (text, e.g., "Res. No. 2025-001")
      - `title` (text, descriptive title)
      - `date_approved` (date, when resolution was approved)
      - `description` (text, summary or full text)
      - `file_url` (text, optional PDF/document URL)
      - `is_active` (boolean, controls visibility)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `resolutions` table
    - Add policy for anyone to read active resolutions
    - Add policy for authenticated users to manage resolutions

  3. Indexes
    - Index on date_approved for sorting
    - Index on is_active for filtering
*/

CREATE TABLE IF NOT EXISTS resolutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resolution_number text NOT NULL,
  title text NOT NULL,
  date_approved date NOT NULL,
  description text NOT NULL,
  file_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resolutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active resolutions"
  ON resolutions
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage resolutions"
  ON resolutions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS resolutions_date_approved_idx 
  ON resolutions (date_approved DESC);

CREATE INDEX IF NOT EXISTS resolutions_active_idx 
  ON resolutions (is_active, date_approved DESC);