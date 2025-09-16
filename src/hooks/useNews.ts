import { useState, useEffect } from 'react';
import { supabase, type NewsItem } from '../lib/supabase';

export function useNews(searchTerm?: string, itemsPerPage: number = 5, isFeaturedFilter?: boolean, isPriorityFilter?: boolean) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [totalNewsItems, setTotalNewsItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, isFeaturedFilter, isPriorityFilter]);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;
        
        // Build query with filters
        let query = supabase
          .from('news_items')
          .select('*', { count: 'exact' });

        // Apply filters
        if (isFeaturedFilter !== undefined) {
          query = query.eq('is_featured', isFeaturedFilter);
        }
        if (isPriorityFilter !== undefined) {
          query = query.eq('is_priority', isPriorityFilter);
        }

        // Apply search if provided
        if (searchTerm?.trim()) {
          // Transform search term for tsquery: replace spaces with & for AND search
          const formattedSearchTerm = searchTerm.trim().replace(/\s+/g, ' & ');
          query = query.textSearch('fts_document', formattedSearchTerm);
        }

        // Apply pagination and ordering
        query = query
          .order('date', { ascending: false })
          .range(offset, offset + itemsPerPage - 1);

        const { data, error: searchError, count } = await query;

        if (searchError) {
          throw searchError;
        }

        setNewsItems(data || []);
        setTotalNewsItems(count || 0);
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
  }, [searchTerm, currentPage, itemsPerPage, isFeaturedFilter, isPriorityFilter]);

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