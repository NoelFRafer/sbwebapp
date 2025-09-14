import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useResolutions(searchTerm?: string, itemsPerPage: number = 10) {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [totalResolutions, setTotalResolutions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchResolutions() {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;
        
        // Use the enhanced search function with pagination
        const { data: response, error: searchError } = await supabase
          .rpc('search_resolutions', { 
            _search_query: searchTerm?.trim() || null,
            _offset: offset,
            _limit: itemsPerPage
          });

        if (searchError) {
          throw searchError;
        }

        if (response) {
          setResolutions(response.items || []);
          setTotalResolutions(response.total_count || 0);
        } else {
          setResolutions([]);
          setTotalResolutions(0);
        }
      } catch (err) {
        console.error('Error fetching resolutions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch resolutions');
        setResolutions([]);
        setTotalResolutions(0);
      } finally {
        setLoading(false);
      }
    }

    fetchResolutions();
  }, [searchTerm, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalResolutions / itemsPerPage);

  return { 
    resolutions, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalResolutions, 
    itemsPerPage,
    setCurrentPage 
  };
}