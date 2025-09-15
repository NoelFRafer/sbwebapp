/*
  # Update search functions with OR logic and ranking

  This migration updates the search_news and search_resolutions functions to:
  1. Use OR logic instead of AND for search terms
  2. Add relevance ranking with ts_rank
  3. Maintain consistent highlighting with the new search logic
  
  Changes:
  - Convert search queries to use OR operators between terms
  - Add ts_rank for relevance-based sorting
  - Update highlighting to match the new search behavior
*/

-- Drop existing functions to recreate them with updated logic
DROP FUNCTION IF EXISTS public.search_news(text, integer, integer);
DROP FUNCTION IF EXISTS public.search_resolutions(text, integer, integer);

-- Recreate search_news function with OR logic and ranking
CREATE OR REPLACE FUNCTION public.search_news(
    _search_query text DEFAULT NULL,
    _offset integer DEFAULT 0,
    _limit integer DEFAULT 5
)
RETURNS TABLE (
    items jsonb,
    total_count integer
)
LANGUAGE plpgsql
AS $$
DECLARE
    search_tsquery tsquery;
BEGIN
    IF _search_query IS NOT NULL AND _search_query != '' THEN
        -- Convert search query to tsquery using OR operator for each word
        -- This will match documents containing ANY of the search terms
        search_tsquery := to_tsquery('english', replace(_search_query, ' ', ' | '));
    ELSE
        search_tsquery := NULL;
    END IF;

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
                                        WHEN search_tsquery IS NOT NULL THEN ts_headline('english', ni.title, search_tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
                                        ELSE ni.title
                                     END,
                'highlighted_content', CASE
                                          WHEN search_tsquery IS NOT NULL THEN ts_headline('english', ni.content, search_tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
                                          ELSE ni.content
                                       END
            )
        ) AS items,
        COUNT(*) OVER() AS total_count
    FROM
        news_items ni
    WHERE
        ni.is_priority = TRUE AND (search_tsquery IS NULL OR ni.fts_document @@ search_tsquery)
    ORDER BY
        CASE WHEN search_tsquery IS NOT NULL THEN ts_rank(ni.fts_document, search_tsquery) ELSE 1 END DESC,
        ni.date DESC
    OFFSET _offset
    LIMIT _limit;
END;
$$;

-- Recreate search_resolutions function with OR logic and ranking
CREATE OR REPLACE FUNCTION public.search_resolutions(
    _search_query text DEFAULT NULL,
    _offset integer DEFAULT 0,
    _limit integer DEFAULT 5
)
RETURNS TABLE (
    items jsonb,
    total_count integer
)
LANGUAGE plpgsql
AS $$
DECLARE
    search_tsquery tsquery;
BEGIN
    IF _search_query IS NOT NULL AND _search_query != '' THEN
        -- Convert search query to tsquery using OR operator for each word
        -- This will match documents containing ANY of the search terms
        search_tsquery := to_tsquery('english', replace(_search_query, ' ', ' | '));
    ELSE
        search_tsquery := NULL;
    END IF;

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
                                                    WHEN search_tsquery IS NOT NULL THEN ts_headline('english', r.resolution_number, search_tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
                                                    ELSE r.resolution_number
                                                 END,
                'highlighted_title', CASE
                                        WHEN search_tsquery IS NOT NULL THEN ts_headline('english', r.title, search_tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
                                        ELSE r.title
                                     END,
                'highlighted_description', CASE
                                              WHEN search_tsquery IS NOT NULL THEN ts_headline('english', r.description, search_tsquery, 'StartSel=<mark>,StopSel=</mark>,MaxWords=35,MinWords=15,ShortWord=3,HighlightAll=false,MaxFragments=0')
                                              ELSE r.description
                                           END
            )
        ) AS items,
        COUNT(*) OVER() AS total_count
    FROM
        resolutions r
    WHERE
        r.is_active = TRUE
        AND (search_tsquery IS NULL OR r.fts_document @@ search_tsquery)
    ORDER BY
        CASE WHEN search_tsquery IS NOT NULL THEN ts_rank(r.fts_document, search_tsquery) ELSE 1 END DESC,
        r.date_approved DESC
    OFFSET _offset
    LIMIT _limit;
END;
$$;