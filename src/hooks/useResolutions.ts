import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useResolutions(searchTerm?: string) {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResolutions() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('resolutions')
          .select('*')
          .eq('is_active', true);

        // Add full-text search if searchTerm is provided
        if (searchTerm && searchTerm.trim()) {
          // Convert search term to tsquery format
          const tsquery = searchTerm
            .trim()
            .split(/\s+/)
            .map(term => term.replace(/[^\w]/g, ''))
            .filter(term => term.length > 0)
            .join(' | '); // Use OR logic instead of AND
          
          if (tsquery) {
            // Use explicit select with ts_headline for highlighting
            query = query
              .select(`
                id,
                resolution_number,
                title,
                date_approved,
                description,
                file_url,
                is_active,
                with_ordinance,
                is_featured,
                created_at,
                updated_at,
                fts_document,
                ts_headline(title, to_tsquery('english', '${tsquery}'), 'StartSel=<mark>,StopSel=</mark>') as highlighted_title,
                ts_headline(description, to_tsquery('english', '${tsquery}'), 'StartSel=<mark>,StopSel=</mark>') as highlighted_description
              `)
              .textSearch('fts_document', tsquery, {
                type: 'plain',
                config: 'english'
              });
          }
        }

        const { data, error } = await query.order('date_approved', { ascending: false });

        if (error) {
          throw error;
        }

        setResolutions(data || []);
      } catch (err) {
        console.error('Error fetching resolutions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch resolutions');
      } finally {
        setLoading(false);
      }
    }

    fetchResolutions();
  }, [searchTerm]);

  return { resolutions, loading, error };
}