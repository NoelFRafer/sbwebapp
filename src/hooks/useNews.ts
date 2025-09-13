import { useState, useEffect } from 'react';
import { supabase, type NewsItem } from '../lib/supabase';

export function useNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('news_items')
          .select('*')
          .eq('is_featured', true)
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }

        setNewsItems(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return { newsItems, loading, error };
}