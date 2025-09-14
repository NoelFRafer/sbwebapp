import { useState, useEffect } from 'react';
import { supabase, type NewsItem } from '../lib/supabase';

export function useNews(searchTerm?: string, itemsPerPage: number = 12) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [totalNewsItems, setTotalNewsItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;
        
        // Use the enhanced search function with pagination
        const { data: response, error: searchError } = await supabase
          .rpc('search_news', { 
            _search_query: searchTerm?.trim() || null,
            _offset: offset,
            _limit: itemsPerPage
          });

        if (searchError) {
          throw searchError;
        }

        if (response) {
          setNewsItems(response.items || []);
          setTotalNewsItems(response.total_count || 0);
        } else {
          setNewsItems([]);
          setTotalNewsItems(0);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        setNewsItems([]);
        setTotalNewsItems(0);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [searchTerm, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalNewsItems / itemsPerPage);

  return { 
    newsItems, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalNewsItems, 
    itemsPerPage,
    setCurrentPage 
  };
}