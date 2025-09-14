/*
  # Enhanced Full-Text Search with Stemming and Ranking

  1. Database Schema Updates
    - Add weighted tsvector columns for better relevance ranking
    - Create GIN indexes for optimal search performance
    - Add search ranking functions

  2. Search Features
    - Built-in stemming (running → run, runs, runner)
    - Stop word filtering (the, and, or, is, etc.)
    - Phrase search with quotes: "budget meeting"
    - Boolean operators: budget AND ordinance
    - Weighted results: titles rank higher than content

  3. Performance Optimizations
    - GIN indexes for fast full-text search
    - Automatic tsvector updates via triggers
    - Relevance-based result ranking
*/

-- Enhanced news_items full-text search
DO $$
BEGIN
  -- Add fts_document column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_items' AND column_name = 'fts_document'
  ) THEN
    ALTER TABLE news_items ADD COLUMN fts_document tsvector
      GENERATED ALWAYS AS (
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(content, '')), 'B')
      ) STORED;
  END IF;
END $$;

-- Create GIN index for news_items if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'news_items' AND indexname = 'news_items_fts_document_idx'
  ) THEN
    CREATE INDEX news_items_fts_document_idx ON news_items USING gin(fts_document);
  END IF;
END $$;

-- Enhanced resolutions full-text search
DO $$
BEGIN
  -- Update existing fts_document column to use weighted search
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resolutions' AND column_name = 'fts_document'
  ) THEN
    -- Drop the existing column and recreate with weights
    ALTER TABLE resolutions DROP COLUMN IF EXISTS fts_document;
    ALTER TABLE resolutions ADD COLUMN fts_document tsvector
      GENERATED ALWAYS AS (
        setweight(to_tsvector('english', COALESCE(resolution_number, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(description, '')), 'B')
      ) STORED;
  END IF;
END $$;

-- Recreate GIN index for resolutions with new weighted column
DROP INDEX IF EXISTS resolutions_fts_document_idx;
CREATE INDEX resolutions_fts_document_idx ON resolutions USING gin(fts_document);

-- Create search ranking function for news
CREATE OR REPLACE FUNCTION search_news(search_query text)
RETURNS TABLE (
  id uuid,
  title text,
  date date,
  content text,
  is_featured boolean,
  order_index integer,
  created_at timestamptz,
  updated_at timestamptz,
  is_priority boolean,
  fts_document tsvector,
  search_rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.title,
    n.date,
    n.content,
    n.is_featured,
    n.order_index,
    n.created_at,
    n.updated_at,
    n.is_priority,
    n.fts_document,
    ts_rank(n.fts_document, websearch_to_tsquery('english', search_query)) as search_rank
  FROM news_items n
  WHERE n.fts_document @@ websearch_to_tsquery('english', search_query)
  ORDER BY search_rank DESC, n.date DESC;
END;
$$ LANGUAGE plpgsql;

-- Create search ranking function for resolutions
CREATE OR REPLACE FUNCTION search_resolutions(search_query text)
RETURNS TABLE (
  id uuid,
  resolution_number text,
  title text,
  date_approved date,
  description text,
  file_url text,
  is_active boolean,
  created_at timestamptz,
  updated_at timestamptz,
  with_ordinance boolean,
  is_featured boolean,
  fts_document tsvector,
  search_rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.resolution_number,
    r.title,
    r.date_approved,
    r.description,
    r.file_url,
    r.is_active,
    r.created_at,
    r.updated_at,
    r.with_ordinance,
    r.is_featured,
    r.fts_document,
    ts_rank(r.fts_document, websearch_to_tsquery('english', search_query)) as search_rank
  FROM resolutions r
  WHERE r.is_active = true 
    AND r.fts_document @@ websearch_to_tsquery('english', search_query)
  ORDER BY search_rank DESC, r.date_approved DESC;
END;
$$ LANGUAGE plpgsql;