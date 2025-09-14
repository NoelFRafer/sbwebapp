import { useState, useEffect } from 'react';
import { supabase, type NewsItem } from '../lib/supabase';

export function useNews(searchTerm?: string) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('news_items')
          .select('*')
          // .eq('is_featured', true);

        // Add full-text search if searchTerm is provided
        if (searchTerm && searchTerm.trim()) {
          // Use the enhanced search function with ranking
          const { data: searchData, error: searchError } = await supabase
            .rpc('search_news', { search_query: searchTerm.trim() });
          
          if (searchError) {
            throw searchError;
          }
          
          setNewsItems(searchData || []);
          return;
        }

        const { data, error } = await query
          .order('date', { ascending: false })
          .order('order_index', { ascending: false });

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
  }, [searchTerm]);

  return { newsItems, loading, error };
}