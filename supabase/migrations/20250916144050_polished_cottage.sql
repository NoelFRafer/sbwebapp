/*
  # Add ordinance management fields to resolutions table

  1. New Columns
    - `category` (text, nullable) - Categorize resolutions/ordinances (e.g., "Zoning", "Budget", "Environmental")
    - `effective_date` (date, nullable) - When ordinances come into force
    - `amendment_history` (text, nullable) - Track amendments and changes

  2. Indexes
    - Add index on category for filtering
    - Add index on effective_date for date range queries
    - Add partial unique index on ordinance_number for ordinances

  3. Full-text Search Enhancement
    - Update FTS function to include new searchable fields
*/

-- Add new columns to resolutions table
DO $$
BEGIN
  -- Add category column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resolutions' AND column_name = 'category'
  ) THEN
    ALTER TABLE resolutions ADD COLUMN category TEXT;
  END IF;

  -- Add effective_date column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resolutions' AND column_name = 'effective_date'
  ) THEN
    ALTER TABLE resolutions ADD COLUMN effective_date DATE;
  END IF;

  -- Add amendment_history column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resolutions' AND column_name = 'amendment_history'
  ) THEN
    ALTER TABLE resolutions ADD COLUMN amendment_history TEXT;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS resolutions_category_idx ON resolutions (category);
CREATE INDEX IF NOT EXISTS resolutions_effective_date_idx ON resolutions (effective_date);
CREATE INDEX IF NOT EXISTS resolutions_ordinance_active_idx ON resolutions (with_ordinance, is_active, effective_date DESC);

-- Create partial unique index on ordinance_number for ordinances only
CREATE UNIQUE INDEX IF NOT EXISTS resolutions_ordinance_number_unique_idx 
ON resolutions (ordinance_number) 
WHERE with_ordinance = true AND ordinance_number IS NOT NULL;

-- Update the full-text search function to include new fields
CREATE OR REPLACE FUNCTION update_resolutions_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fts_document := (
    setweight(to_tsvector('english', COALESCE(NEW.resolution_number, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.ordinance_number, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.category, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.amendment_history, '')), 'C')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update existing records to have proper FTS documents
UPDATE resolutions SET updated_at = now() WHERE id IS NOT NULL;