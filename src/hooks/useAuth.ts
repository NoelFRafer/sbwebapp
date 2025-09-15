import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isUserAdmin, getUserRole } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string>('user');
  const [roleLoading, setRoleLoading] = useState(false);

  // Function to check user role
  const checkUserRole = async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      setUserRole('user');
      setRoleLoading(false);
      return;
    }

    setRoleLoading(true);
    try {
      const [adminStatus, role] = await Promise.all([
        isUserAdmin(currentUser.id),
        getUserRole(currentUser.id)
      ]);
      
      setIsAdmin(adminStatus);
      setUserRole(role);
    } catch (error) {
      console.error('Error checking user role:', error);
      setIsAdmin(false);
      setUserRole('user');
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        await checkUserRole(currentUser);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setUser(null);
        setIsAdmin(false);
        setUserRole('user');
        setRoleLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          const currentUser = session?.user ?? null;
          setUser(currentUser);
          await checkUserRole(currentUser);
        } catch (error) {
          console.error('Error in auth state change:', error);
          setIsAdmin(false);
          setUserRole('user');
          setRoleLoading(false);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Handle the specific case where session is already missing
        if (error.message === 'Auth session missing!' || error.message === 'Session from session_id claim in JWT does not exist') {
          console.warn('Session already expired or missing during sign out');
        } else {
          console.error('Error signing out:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
    setIsAdmin(false);
    setUserRole('user');
  };

  return {
    user,
    loading,
    isAdmin,
    userRole,
    roleLoading,
    signOut,
    isAuthenticated: !!user,
    refreshRole: () => checkUserRole(user)
  };
}