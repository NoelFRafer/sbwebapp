import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useResolutions(searchTerm?: string, itemsPerPage: number = 5, withOrdinanceFilter?: boolean, isFeaturedFilter?: boolean) {
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [totalResolutions, setTotalResolutions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, withOrdinanceFilter, isFeaturedFilter]);

  useEffect(() => {
    async function fetchResolutions() {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;
        
        // Build dynamic select string based on search term
        const selectString = searchTerm?.trim() 
          ? `
            *,
            ts_headline('english', resolution_number, websearch_to_tsquery('english', '${searchTerm.trim()}')) as highlighted_resolution_number,
            ts_headline('english', title, websearch_to_tsquery('english', '${searchTerm.trim()}')) as highlighted_title,
            ts_headline('english', description, websearch_to_tsquery('english', '${searchTerm.trim()}')) as highlighted_description
          `
          : '*';
        
        // Build query with filters
        let query = supabase
          .from('resolutions')
          .select(selectString, { count: 'exact' })
          .eq('is_active', true);

        // Apply filters
        if (withOrdinanceFilter !== undefined) {
          query = query.eq('with_ordinance', withOrdinanceFilter);
        }
        if (isFeaturedFilter !== undefined) {
          query = query.eq('is_featured', isFeaturedFilter);
        }

        // Apply search if provided
        if (searchTerm?.trim()) {
          query = query.textSearch('fts_document', searchTerm.trim());
        }

        // Apply pagination and ordering
        query = query
          .order('date_approved', { ascending: false })
          .range(offset, offset + itemsPerPage - 1);

        const { data, error: searchError, count } = await query;

        if (searchError) {
          throw searchError;
        }

        setResolutions(data || []);
        setTotalResolutions(count || 0);
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
  }, [searchTerm, currentPage, itemsPerPage, withOrdinanceFilter, isFeaturedFilter]);

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