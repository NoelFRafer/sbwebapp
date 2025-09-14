/*
  # Add Pagination Support for News and Resolutions

  1. New Functions
    - `search_news` - Enhanced search with pagination support
    - `search_resolutions` - Enhanced search with pagination support
  
  2. Features
    - Server-side pagination with offset/limit
    - Total count for pagination controls
    - Maintains existing search functionality
    - Optimized for performance with large datasets
  
  3. Returns
    - JSON object with `items` array and `total_count`
    - Supports both search and non-search queries
*/

-- Drop existing search functions
DROP FUNCTION IF EXISTS search_news_items(text, integer);
DROP FUNCTION IF EXISTS search_resolutions(text, integer);

-- Create enhanced search function for news with pagination
CREATE OR REPLACE FUNCTION search_news(
  _search_query text DEFAULT NULL,
  _offset integer DEFAULT 0,
  _limit integer DEFAULT 20
)
RETURNS jsonb AS $$
DECLARE
  _total_count integer;
  _items jsonb;
BEGIN
  -- Handle search query
  IF _search_query IS NOT NULL AND trim(_search_query) != '' THEN
    -- Get total count for search results
    SELECT COUNT(*)
    INTO _total_count
    FROM news_items n
    WHERE n.fts_document @@ websearch_to_tsquery('english', _search_query);
    
    -- Get paginated search results
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', n.id,
        'title', n.title,
        'date', n.date,
        'content', n.content,
        'is_featured', n.is_featured,
        'order_index', n.order_index,
        'created_at', n.created_at,
        'updated_at', n.updated_at,
        'is_priority', n.is_priority,
        'rank', ts_rank(n.fts_document, websearch_to_tsquery('english', _search_query))
      )
    )
    INTO _items
    FROM news_items n
    WHERE n.fts_document @@ websearch_to_tsquery('english', _search_query)
    ORDER BY ts_rank(n.fts_document, websearch_to_tsquery('english', _search_query)) DESC, n.date DESC
    OFFSET _offset
    LIMIT _limit;
  ELSE
    -- Get total count for all news
    SELECT COUNT(*)
    INTO _total_count
    FROM news_items;
    
    -- Get paginated results for all news
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', n.id,
        'title', n.title,
        'date', n.date,
        'content', n.content,
        'is_featured', n.is_featured,
        'order_index', n.order_index,
        'created_at', n.created_at,
        'updated_at', n.updated_at,
        'is_priority', n.is_priority
      )
    )
    INTO _items
    FROM news_items n
    ORDER BY n.date DESC, n.order_index DESC
    OFFSET _offset
    LIMIT _limit;
  END IF;
  
  -- Return results with total count
  RETURN jsonb_build_object(
    'items', COALESCE(_items, '[]'::jsonb),
    'total_count', _total_count
  );
END;
$$ LANGUAGE plpgsql;

-- Create enhanced search function for resolutions with pagination
CREATE OR REPLACE FUNCTION search_resolutions(
  _search_query text DEFAULT NULL,
  _offset integer DEFAULT 0,
  _limit integer DEFAULT 20
)
RETURNS jsonb AS $$
DECLARE
  _total_count integer;
  _items jsonb;
BEGIN
  -- Handle search query
  IF _search_query IS NOT NULL AND trim(_search_query) != '' THEN
    -- Get total count for search results
    SELECT COUNT(*)
    INTO _total_count
    FROM resolutions r
    WHERE r.is_active = true 
      AND r.fts_document @@ websearch_to_tsquery('english', _search_query);
    
    -- Get paginated search results
    SELECT jsonb_agg(
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
        'rank', ts_rank(r.fts_document, websearch_to_tsquery('english', _search_query))
      )
    )
    INTO _items
    FROM resolutions r
    WHERE r.is_active = true 
      AND r.fts_document @@ websearch_to_tsquery('english', _search_query)
    ORDER BY ts_rank(r.fts_document, websearch_to_tsquery('english', _search_query)) DESC, r.date_approved DESC
    OFFSET _offset
    LIMIT _limit;
  ELSE
    -- Get total count for all active resolutions
    SELECT COUNT(*)
    INTO _total_count
    FROM resolutions r
    WHERE r.is_active = true;
    
    -- Get paginated results for all active resolutions
    SELECT jsonb_agg(
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
        'updated_at', r.updated_at
      )
    )
    INTO _items
    FROM resolutions r
    WHERE r.is_active = true
    ORDER BY r.date_approved DESC
    OFFSET _offset
    LIMIT _limit;
  END IF;
  
  -- Return results with total count
  RETURN jsonb_build_object(
    'items', COALESCE(_items, '[]'::jsonb),
    'total_count', _total_count
  );
END;
$$ LANGUAGE plpgsql;