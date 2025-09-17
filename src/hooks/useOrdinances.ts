import { useState, useEffect } from 'react';
import { supabase, type Resolution } from '../lib/supabase';

export function useOrdinances(
  searchTerm?: string, 
  itemsPerPage: number = 5, 
  categoryFilter?: string,
  effectiveDateStart?: string,
  effectiveDateEnd?: string,
  isActiveFilter?: boolean
) {
  const [ordinances, setOrdinances] = useState<Resolution[]>([]);
  const [totalOrdinances, setTotalOrdinances] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset to page 1 when search term or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, effectiveDateStart, effectiveDateEnd, isActiveFilter]);

  useEffect(() => {
    async function fetchOrdinances() {
      try {
        setLoading(true);
        setError(null);

        const offset = (currentPage - 1) * itemsPerPage;
        
        // Build query with ordinance filter
        let query = supabase
          .from('resolutions')
          .select('*', { count: 'exact' })
          .eq('with_ordinance', true)
          .eq('is_active', true);

        // Apply additional filters
        if (categoryFilter) {
          query = query.eq('category', categoryFilter);
        }
        
        // Apply category filter with multi-word partial matching
        if (categoryFilter?.trim()) {
          const categoryWords = categoryFilter.trim().split(/\s+/);
          const categoryConditions = categoryWords.map(word => 
            `or category.ilike.%${word}%`
          ).join(',');
          query = query.or(categoryConditions);
        }
        
        if (isActiveFilter !== undefined) {
          query = query.eq('is_active', isActiveFilter);
        }
        if (effectiveDateStart) {
          query = query.gte('effective_date', effectiveDateStart);
        }
        if (effectiveDateEnd) {
          query = query.lte('effective_date', effectiveDateEnd);
        }

        // Apply search if provided
        if (searchTerm?.trim()) {
          // Transform search term for tsquery: split words and use OR logic with prefix matching
          const formattedSearchTerm = searchTerm.trim()
            .split(/\s+/)
            .map(word => `${word}:*`)
            .join(' | ');
          query = query.textSearch('fts_document', formattedSearchTerm);
        }

        // Apply pagination and ordering
        query = query
          .order('effective_date', { ascending: false, nullsLast: true })
          .order('date_approved', { ascending: false })
          .range(offset, offset + itemsPerPage - 1);

        const { data, error: searchError, count } = await query;

        if (searchError) {
          throw searchError;
        }

        setOrdinances(data || []);
        setTotalOrdinances(count || 0);
      } catch (err) {
        console.error('Error fetching ordinances:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch ordinances');
        setOrdinances([]);
        setTotalOrdinances(0);
      } finally {
        setLoading(false);
      }
    }

    fetchOrdinances();
  }, [searchTerm, currentPage, itemsPerPage, categoryFilter, effectiveDateStart, effectiveDateEnd, isActiveFilter]);

  const totalPages = Math.ceil(totalOrdinances / itemsPerPage);

  return { 
    ordinances, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalOrdinances, 
    itemsPerPage,
    setCurrentPage 
  };
}