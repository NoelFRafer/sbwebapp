import { useState, useEffect } from 'react';
import { supabase, type Committee } from '../lib/supabase';

export function useCommittee(committeeId: string | null) {
  const [committee, setCommittee] = useState<Committee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!committeeId) {
      setCommittee(null);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchCommittee() {
      try {
        setLoading(true);
        setError(null);

        // Fetch a single committee and join with committee_members and members
        const { data, error: fetchError } = await supabase
          .from('committees')
          .select(`
            *,
            committee_members (
              id,
              role,
              member:members (
                id,
                name,
                title,
                position,
                image_url
              )
            )
          `)
          .eq('id', committeeId)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          // Sort committee members by role (Chairman, Vice Chairman, then others by name)
          const sortedMembers = data.committee_members.sort((a, b) => {
            const roleOrder = ['Chairman', 'Vice Chairman'];
            const roleA = roleOrder.indexOf(a.role);
            const roleB = roleOrder.indexOf(b.role);

            if (roleA !== -1 && roleB !== -1) {
              return roleA - roleB;
            }
            if (roleA !== -1) return -1;
            if (roleB !== -1) return 1;

            return (a.member?.name || '').localeCompare(b.member?.name || '');
          });
          setCommittee({ ...data, committee_members: sortedMembers });
        } else {
          setCommittee(null);
        }
      } catch (err) {
        console.error('Error fetching committee:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch committee');
        setCommittee(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCommittee();
  }, [committeeId]);

  return { committee, loading, error };
}