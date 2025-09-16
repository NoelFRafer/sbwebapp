```sql
-- Drop existing functions to recreate them with updated logic
DROP FUNCTION IF EXISTS public.search_news(text, integer, integer);
DROP FUNCTION IF EXISTS public.search_resolutions(text, integer, integer);

-- Recreate search_news function with OR logic and ts_rank_cd ranking
CREATE OR REPLACE FUNCTION public.search_news(
    _search_query text DEFAULT NULL,
    _offset integer DEFAULT 0,
    _limit integer DEFAULT 5
)
RETURNS TABLE (
    items jsonb,
    total_count bigint
)
LANGUAGE plpgsql
AS $$
DECLARE
    search_tsquery tsquery;
    total_rows bigint;
BEGIN
    IF _search_query IS NOT NULL AND _search_query != '' THEN
        search_tsquery := to_tsquery('english', replace(_search_query, ' ', ' | '));
    ELSE
        search_tsquery := NULL;
    END IF;

    -- Count total rows matching the search query
    SELECT COUNT(*)
    INTO total_rows
    FROM news_items ni
    WHERE ni.is_priority = TRUE AND ni.is_featured = TRUE AND ni.date <= NOW() AND ni.is_active = TRUE
      AND (search_tsquery IS NULL OR ni.fts_document @@ search_tsquery);

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
        total_rows AS total_count
    FROM (
        SELECT *
        FROM news_items ni
        WHERE ni.is_priority = TRUE AND ni.is_featured = TRUE AND ni.date <= NOW() AND ni.is_active = TRUE
          AND (search_tsquery IS NULL OR ni.fts_document @@ search_tsquery)
        ORDER BY
            CASE WHEN search_tsquery IS NOT NULL THEN ts_rank_cd(ni.fts_document, search_tsquery) ELSE 1 END DESC, -- Changed to ts_rank_cd
            ni.date DESC
        OFFSET _offset
        LIMIT _limit
    ) AS subquery;
END;
$$;

-- Recreate search_resolutions function with OR logic and ts_rank_cd ranking
CREATE OR REPLACE FUNCTION public.search_resolutions(
    _search_query text DEFAULT NULL,
    _offset integer DEFAULT 0,
    _limit integer DEFAULT 5
)
RETURNS TABLE (
    items jsonb,
    total_count bigint
)
LANGUAGE plpgsql
AS $$
DECLARE
    search_tsquery tsquery;
    total_rows bigint;
BEGIN
    IF _search_query IS NOT NULL AND _search_query != '' THEN
        search_tsquery := to_tsquery('english', replace(_search_query, ' ', ' | '));
    ELSE
        search_tsquery := NULL;
    END IF;

    -- Count total rows matching the search query
    SELECT COUNT(*)
    INTO total_rows
    FROM resolutions r
    WHERE r.is_active = TRUE
      AND (search_tsquery IS NULL OR r.fts_document @@ search_tsquery);

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
        total_rows AS total_count
    FROM (
        SELECT *
        FROM resolutions r
        WHERE r.is_active = TRUE
          AND (search_tsquery IS NULL OR r.fts_document @@ search_tsquery)
        ORDER BY
            CASE WHEN search_tsquery IS NOT NULL THEN ts_rank_cd(r.fts_document, search_tsquery) ELSE 1 END DESC, -- Changed to ts_rank_cd
            r.date_approved DESC
        OFFSET _offset
        LIMIT _limit
    ) AS subquery;
END;
$$;
```