import { useState, useEffect } from 'react';
import { supabase, type Slide } from '../lib/supabase';

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('slides')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) {
          throw error;
        }

        setSlides(data || []);
      } catch (err) {
        console.error('Error fetching slides:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch slides');
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  return { slides, loading, error };
}