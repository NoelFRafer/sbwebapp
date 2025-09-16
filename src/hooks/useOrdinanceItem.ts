import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useOrdinanceItem(ordinanceId: string | null) {
  const [ordinance, setOrdinance] = useState<Resolution | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ordinanceId) {
      setOrdinance(null);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchOrdinance() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('resolutions')
          .select('*')
          .eq('id', ordinanceId)
          .eq('with_ordinance', true)
          .eq('is_active', true)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setOrdinance(data);
      } catch (err) {
        console.error('Error fetching ordinance:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch ordinance');
        setOrdinance(null);
      } finally {
        setLoading(false);
      }
    }

    fetchOrdinance();
  }, [ordinanceId]);

  return { ordinance, loading, error };
}