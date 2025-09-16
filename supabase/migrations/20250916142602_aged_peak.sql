/*
  # Add ordinance_number column to resolutions table

  1. Schema Changes
    - Add `ordinance_number` column to `resolutions` table
    - Column is nullable (TEXT) since not all resolutions have ordinances
    - Update full-text search to include ordinance_number in search index

  2. Search Enhancement
    - Update the FTS trigger to include ordinance_number in search document
    - Ordinance numbers will be searchable with high weight (A level)

  This migration adds support for storing ordinance numbers directly in the resolutions table
  for the one-to-one relationship between resolutions and ordinances.
*/

-- Add ordinance_number column to resolutions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resolutions' AND column_name = 'ordinance_number'
  ) THEN
    ALTER TABLE resolutions ADD COLUMN ordinance_number TEXT;
  END IF;
END $$;

-- Update the FTS trigger function to include ordinance_number
CREATE OR REPLACE FUNCTION update_resolutions_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fts_document := (
    setweight(to_tsvector('english', COALESCE(NEW.resolution_number, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.ordinance_number, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update existing records to rebuild FTS document with new structure
UPDATE resolutions SET updated_at = updated_at;