import { useState, useEffect } from 'react';
import { supabase, type Committee } from '../lib/supabase';

export function useCommittees() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommittees() {
      try {
        setLoading(true);
        setError(null);

        // Fetch committees and join with committee_members and members
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
          .order('name', { ascending: true }); // Order committees by name

        if (fetchError) {
          throw fetchError;
        }

        // Sort committee members by role (Chairman, Vice Chairman, then others by name)
        const sortedCommittees = data?.map(committee => ({
          ...committee,
          committee_members: committee.committee_members.sort((a, b) => {
            const roleOrder = ['Chairman', 'Vice Chairman'];
            const roleA = roleOrder.indexOf(a.role);
            const roleB = roleOrder.indexOf(b.role);

            if (roleA !== -1 && roleB !== -1) {
              return roleA - roleB;
            }
            if (roleA !== -1) return -1;
            if (roleB !== -1) return 1;

            return (a.member?.name || '').localeCompare(b.member?.name || '');
          })
        })) || [];

        setCommittees(sortedCommittees);
      } catch (err) {
        console.error('Error fetching committees:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch committees');
      } finally {
        setLoading(false);
      }
    }

    fetchCommittees();
  }, []);

  return { committees, loading, error };
}