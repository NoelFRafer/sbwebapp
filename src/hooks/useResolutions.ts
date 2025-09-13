import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useResolutions() {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResolutions() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('resolutions')
          .select('*')
          .eq('is_active', true)
          .order('date_approved', { ascending: false });

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
  }, []);

  return { resolutions, loading, error };
}