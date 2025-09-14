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
          // Use the enhanced search function with ranking
          const { data: searchData, error: searchError } = await supabase
            .rpc('search_resolutions', { search_query: searchTerm.trim() });
          
          if (searchError) {
            throw searchError;
          }
          
          setResolutions(searchData || []);
          return;
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