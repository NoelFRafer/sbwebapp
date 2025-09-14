/*
  # Enhance Full-Text Search with Better Stemming and Ranking

  1. Updates
    - Add ts_rank support for better relevance scoring
    - Enhance FTS document generation with weights
    - Add custom search functions for better stemming control

  2. Features
    - Weighted search (title has higher weight than content)
    - Stemming with English dictionary
    - Relevance ranking with ts_rank
    - Phrase search support
*/

-- Update news_items fts_document with weighted search
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_items' AND column_name = 'fts_document'
  ) THEN
    -- Drop the existing generated column
    ALTER TABLE news_items DROP COLUMN IF EXISTS fts_document;
    
    -- Add new weighted fts_document column
    ALTER TABLE news_items ADD COLUMN fts_document tsvector 
    GENERATED ALWAYS AS (
      setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
      setweight(to_tsvector('english', COALESCE(content, '')), 'B')
    ) STORED;
    
    -- Recreate the index
    DROP INDEX IF EXISTS news_items_fts_document_idx;
    CREATE INDEX news_items_fts_document_idx ON news_items USING gin (fts_document);
  END IF;
END $$;

-- Update resolutions fts_document with weighted search
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'resolutions' AND column_name = 'fts_document'
  ) THEN
    -- Update the trigger function for resolutions
    CREATE OR REPLACE FUNCTION update_resolutions_fts()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.fts_document := 
        setweight(to_tsvector('english', COALESCE(NEW.resolution_number, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  END IF;
END $$;

-- Create a custom search function for better control
CREATE OR REPLACE FUNCTION search_news_items(
  search_query text,
  limit_count integer DEFAULT 50
)
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
  rank real
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
    ts_rank(n.fts_document, websearch_to_tsquery('english', search_query)) as rank
  FROM news_items n
  WHERE n.fts_document @@ websearch_to_tsquery('english', search_query)
  ORDER BY rank DESC, n.date DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Create a custom search function for resolutions
CREATE OR REPLACE FUNCTION search_resolutions(
  search_query text,
  limit_count integer DEFAULT 50
)
RETURNS TABLE (
  id uuid,
  resolution_number text,
  title text,
  date_approved date,
  description text,
  file_url text,
  is_active boolean,
  with_ordinance boolean,
  is_featured boolean,
  created_at timestamptz,
  updated_at timestamptz,
  rank real
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
    r.with_ordinance,
    r.is_featured,
    r.created_at,
    r.updated_at,
    ts_rank(r.fts_document, websearch_to_tsquery('english', search_query)) as rank
  FROM resolutions r
  WHERE r.is_active = true 
    AND r.fts_document @@ websearch_to_tsquery('english', search_query)
  ORDER BY rank DESC, r.date_approved DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;