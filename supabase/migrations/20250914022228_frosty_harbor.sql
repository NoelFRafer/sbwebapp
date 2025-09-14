/*
  # Fix search functions SQL errors

  1. Database Functions
    - Fix GROUP BY clause issues in search_news function
    - Fix GROUP BY clause issues in search_resolutions function
    - Ensure all selected columns are properly handled

  2. Changes
    - Remove unnecessary GROUP BY clauses that were causing SQL errors
    - Simplify the functions to return proper JSONB structure
    - Maintain pagination and search functionality
*/

-- Drop existing functions
DROP FUNCTION IF EXISTS search_news(text, integer, integer);
DROP FUNCTION IF EXISTS search_resolutions(text, integer, integer);

-- Create corrected search_news function
CREATE OR REPLACE FUNCTION search_news(
  _search_query text DEFAULT NULL,
  _offset integer DEFAULT 0,
  _limit integer DEFAULT 12
)
RETURNS jsonb AS $$
DECLARE
  _total_count integer;
  _items jsonb;
BEGIN
  -- Get total count
  IF _search_query IS NULL OR _search_query = '' THEN
    SELECT COUNT(*) INTO _total_count
    FROM news_items
    WHERE is_priority = true;
  ELSE
    SELECT COUNT(*) INTO _total_count
    FROM news_items
    WHERE is_priority = true
      AND fts_document @@ websearch_to_tsquery('english', _search_query);
  END IF;

  -- Get paginated items
  IF _search_query IS NULL OR _search_query = '' THEN
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', id,
        'title', title,
        'date', date,
        'content', content,
        'is_featured', is_featured,
        'order_index', order_index,
        'created_at', created_at,
        'updated_at', updated_at,
        'is_priority', is_priority
      )
    ) INTO _items
    FROM (
      SELECT *
      FROM news_items
      WHERE is_priority = true
      ORDER BY date DESC, created_at DESC
      OFFSET _offset
      LIMIT _limit
    ) subquery;
  ELSE
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', id,
        'title', title,
        'date', date,
        'content', content,
        'is_featured', is_featured,
        'order_index', order_index,
        'created_at', created_at,
        'updated_at', updated_at,
        'is_priority', is_priority,
        'rank', rank
      )
    ) INTO _items
    FROM (
      SELECT *,
        ts_rank(fts_document, websearch_to_tsquery('english', _search_query)) as rank
      FROM news_items
      WHERE is_priority = true
        AND fts_document @@ websearch_to_tsquery('english', _search_query)
      ORDER BY rank DESC, date DESC, created_at DESC
      OFFSET _offset
      LIMIT _limit
    ) subquery;
  END IF;

  -- Return result
  RETURN jsonb_build_object(
    'items', COALESCE(_items, '[]'::jsonb),
    'total_count', _total_count
  );
END;
$$ LANGUAGE plpgsql;

-- Create corrected search_resolutions function
CREATE OR REPLACE FUNCTION search_resolutions(
  _search_query text DEFAULT NULL,
  _offset integer DEFAULT 0,
  _limit integer DEFAULT 10
)
RETURNS jsonb AS $$
DECLARE
  _total_count integer;
  _items jsonb;
BEGIN
  -- Get total count
  IF _search_query IS NULL OR _search_query = '' THEN
    SELECT COUNT(*) INTO _total_count
    FROM resolutions
    WHERE is_active = true;
  ELSE
    SELECT COUNT(*) INTO _total_count
    FROM resolutions
    WHERE is_active = true
      AND fts_document @@ websearch_to_tsquery('english', _search_query);
  END IF;

  -- Get paginated items
  IF _search_query IS NULL OR _search_query = '' THEN
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', id,
        'resolution_number', resolution_number,
        'title', title,
        'date_approved', date_approved,
        'description', description,
        'file_url', file_url,
        'is_active', is_active,
        'with_ordinance', with_ordinance,
        'is_featured', is_featured,
        'created_at', created_at,
        'updated_at', updated_at
      )
    ) INTO _items
    FROM (
      SELECT *
      FROM resolutions
      WHERE is_active = true
      ORDER BY date_approved DESC, created_at DESC
      OFFSET _offset
      LIMIT _limit
    ) subquery;
  ELSE
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', id,
        'resolution_number', resolution_number,
        'title', title,
        'date_approved', date_approved,
        'description', description,
        'file_url', file_url,
        'is_active', is_active,
        'with_ordinance', with_ordinance,
        'is_featured', is_featured,
        'created_at', created_at,
        'updated_at', updated_at,
        'rank', rank
      )
    ) INTO _items
    FROM (
      SELECT *,
        ts_rank(fts_document, websearch_to_tsquery('english', _search_query)) as rank
      FROM resolutions
      WHERE is_active = true
        AND fts_document @@ websearch_to_tsquery('english', _search_query)
      ORDER BY rank DESC, date_approved DESC, created_at DESC
      OFFSET _offset
      LIMIT _limit
    ) subquery;
  END IF;

  -- Return result
  RETURN jsonb_build_object(
    'items', COALESCE(_items, '[]'::jsonb),
    'total_count', _total_count
  );
END;
$$ LANGUAGE plpgsql;