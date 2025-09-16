import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useResolutionItem(resolutionId: string | null) {
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resolutionId) {
      setResolution(null);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchResolution() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('resolutions')
          .select('*')
          .eq('id', resolutionId)
          .eq('is_active', true)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setResolution(data);
      } catch (err) {
        console.error('Error fetching resolution:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch resolution');
        setResolution(null);
      } finally {
        setLoading(false);
      }
    }

    fetchResolution();
  }, [resolutionId]);

  return { resolution, loading, error };
}