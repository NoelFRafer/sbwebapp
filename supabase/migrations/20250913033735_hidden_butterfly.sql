/*
  # Add Full-Text Search to Resolutions Table

  1. New Columns
    - `fts_document` (tsvector) - Preprocessed text data for full-text search

  2. Functions
    - `update_resolutions_fts()` - Function to generate tsvector from title and description

  3. Triggers
    - Automatic trigger to update fts_document on INSERT/UPDATE

  4. Indexes
    - GIN index on fts_document for fast full-text search performance

  5. Data Population
    - Update existing records with fts_document values
*/

-- Add the full-text search column
ALTER TABLE public.resolutions 
ADD COLUMN IF NOT EXISTS fts_document tsvector;

-- Create function to update the full-text search document
CREATE OR REPLACE FUNCTION update_resolutions_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fts_document := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.resolution_number, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update fts_document
DROP TRIGGER IF EXISTS resolutions_fts_update_trigger ON public.resolutions;
CREATE TRIGGER resolutions_fts_update_trigger
  BEFORE INSERT OR UPDATE ON public.resolutions
  FOR EACH ROW
  EXECUTE FUNCTION update_resolutions_fts();

-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS resolutions_fts_document_idx 
ON public.resolutions USING GIN (fts_document);

-- Update existing records with fts_document values
UPDATE public.resolutions SET 
  fts_document = 
    setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(resolution_number, '')), 'C')
WHERE fts_document IS NULL;