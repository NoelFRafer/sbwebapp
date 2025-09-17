// src/hooks/useMembers.ts
import { useState, useEffect } from 'react';
import { supabase, type Member } from '../lib/supabase';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('members')
          .select('*')
          .order('name', { ascending: true }); // Order by name alphabetically

        if (fetchError) {
          throw fetchError;
        }

        setMembers(data || []);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return { members, loading, error };
}
