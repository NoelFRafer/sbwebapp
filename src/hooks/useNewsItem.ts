import { useState, useEffect } from 'react';
import { supabase, type NewsItem } from '../lib/supabase';

export function useNewsItem(newsId: string | null) {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!newsId) {
      setNewsItem(null);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchNewsItem() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('news_items')
          .select('*')
          .eq('id', newsId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setNewsItem(data);
      } catch (err) {
        console.error('Error fetching news item:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news item');
        setNewsItem(null);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsItem();
  }, [newsId]);

  return { newsItem, loading, error };
}