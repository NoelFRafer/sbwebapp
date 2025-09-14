/*
  # Add full-text search to news items

  1. New Columns
    - `fts_document` (tsvector, generated column)
      - Automatically combines title and content for full-text search
      - Generated column that updates automatically when title or content changes

  2. Indexes
    - Add GIN index on `fts_document` for efficient full-text search queries

  3. Notes
    - This enables full-text search functionality on news items
    - The tsvector is generated using English language configuration
    - Existing data will automatically populate the new column
*/

-- Add the fts_document column as a generated column
ALTER TABLE news_items 
ADD COLUMN IF NOT EXISTS fts_document tsvector 
GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
) STORED;

-- Create GIN index for efficient full-text search
CREATE INDEX IF NOT EXISTS news_items_fts_document_idx 
ON news_items USING GIN (fts_document);