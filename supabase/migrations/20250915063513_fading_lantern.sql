/*
  # Update search functions with highlighting support

  1. Functions Updated
    - `search_news` - Enhanced to return highlighted title and content
    - `search_resolutions` - Enhanced to return highlighted resolution_number, title, and description

  2. Highlighting Features
    - Uses PostgreSQL's `ts_headline` function for consistent highlighting
    - Highlights match the full-text search behavior including stemming
    - Uses `<mark>` and `</mark>` tags for highlighting
    - Configurable highlighting options for better readability

  3. Performance
    - Highlighting only applied when search query is provided
    - Maintains existing pagination and sorting logic
*/

-- Drop existing functions to recreate with highlighting support
DROP FUNCTION IF EXISTS search_news(text, integer, integer);
DROP FUNCTION IF EXISTS search_resolutions(text, integer, integer);

-- Enhanced search_news function with highlighting
CREATE OR REPLACE FUNCTION search_news(
  _search_query text DEFAULT NULL,
  _offset integer DEFAULT 0,
  _limit integer DEFAULT 10
)
RETURNS TABLE(
  items jsonb,
  total_count bigint
)
LANGUAGE plpgsql
AS $$
DECLARE
  _tsquery tsquery;
  _total_count bigint;
BEGIN
  -- Convert search query to tsquery if provided
  IF _search_query IS NOT NULL AND trim(_search_query) != '' THEN
    _tsquery := websearch_to_tsquery('english', _search_query);
  ELSE
    _tsquery := NULL;
  END IF;

  -- Get total count
  SELECT COUNT(*)
  INTO _total_count
  FROM news_items ni
  WHERE (_tsquery IS NULL OR ni.fts_document @@ _tsquery)
    AND ni.is_priority = true;

  -- Return paginated results with highlighting
  RETURN QUERY
  SELECT 
    jsonb_agg(
      jsonb_build_object(
        'id', ni.id,
        'title', ni.title,
        'date', ni.date,
        'content', ni.content,
        'is_featured', ni.is_featured,
        'order_index', ni.order_index,
        'created_at', ni.created_at,
        'updated_at', ni.updated_at,
        'highlighted_title', CASE 
          WHEN _tsquery IS NOT NULL THEN 
            ts_headline('english', ni.title, _tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
          ELSE NULL 
        END,
        'highlighted_content', CASE 
          WHEN _tsquery IS NOT NULL THEN 
            ts_headline('english', ni.content, _tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
          ELSE NULL 
        END
      )
      ORDER BY 
        CASE WHEN _tsquery IS NOT NULL THEN ts_rank(ni.fts_document, _tsquery) END DESC,
        ni.date DESC,
        ni.created_at DESC
    ) as items,
    _total_count as total_count
  FROM news_items ni
  WHERE (_tsquery IS NULL OR ni.fts_document @@ _tsquery)
    AND ni.is_priority = true
  OFFSET _offset
  LIMIT _limit;
END;
$$;

-- Enhanced search_resolutions function with highlighting
CREATE OR REPLACE FUNCTION search_resolutions(
  _search_query text DEFAULT NULL,
  _offset integer DEFAULT 0,
  _limit integer DEFAULT 10
)
RETURNS TABLE(
  items jsonb,
  total_count bigint
)
LANGUAGE plpgsql
AS $$
DECLARE
  _tsquery tsquery;
  _total_count bigint;
BEGIN
  -- Convert search query to tsquery if provided
  IF _search_query IS NOT NULL AND trim(_search_query) != '' THEN
    _tsquery := websearch_to_tsquery('english', _search_query);
  ELSE
    _tsquery := NULL;
  END IF;

  -- Get total count
  SELECT COUNT(*)
  INTO _total_count
  FROM resolutions r
  WHERE (_tsquery IS NULL OR r.fts_document @@ _tsquery)
    AND r.is_active = true;

  -- Return paginated results with highlighting
  RETURN QUERY
  SELECT 
    jsonb_agg(
      jsonb_build_object(
        'id', r.id,
        'resolution_number', r.resolution_number,
        'title', r.title,
        'date_approved', r.date_approved,
        'description', r.description,
        'file_url', r.file_url,
        'is_active', r.is_active,
        'with_ordinance', r.with_ordinance,
        'is_featured', r.is_featured,
        'created_at', r.created_at,
        'updated_at', r.updated_at,
        'highlighted_resolution_number', CASE 
          WHEN _tsquery IS NOT NULL THEN 
            ts_headline('english', r.resolution_number, _tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
          ELSE NULL 
        END,
        'highlighted_title', CASE 
          WHEN _tsquery IS NOT NULL THEN 
            ts_headline('english', r.title, _tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
          ELSE NULL 
        END,
        'highlighted_description', CASE 
          WHEN _tsquery IS NOT NULL THEN 
            ts_headline('english', r.description, _tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
          ELSE NULL 
        END
      )
      ORDER BY 
        CASE WHEN _tsquery IS NOT NULL THEN ts_rank(r.fts_document, _tsquery) END DESC,
        r.date_approved DESC,
        r.created_at DESC
    ) as items,
    _total_count as total_count
  FROM resolutions r
  WHERE (_tsquery IS NULL OR r.fts_document @@ _tsquery)
    AND r.is_active = true
  OFFSET _offset
  LIMIT _limit;
END;
$$;