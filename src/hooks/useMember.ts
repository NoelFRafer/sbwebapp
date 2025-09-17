// src/hooks/useMember.ts
import { useState, useEffect } from 'react';
import { supabase, type Member } from '../lib/supabase';

export function useMember(memberId: string | null) {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!memberId) {
      setMember(null);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchMember() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('members')
          .select('*')
          .eq('id', memberId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        setMember(data);
      } catch (err) {
        console.error('Error fetching member:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch member');
        setMember(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [memberId]);

  return { member, loading, error };
}
