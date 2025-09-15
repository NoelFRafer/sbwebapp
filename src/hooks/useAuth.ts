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
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await checkUserRole(currentUser);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        await checkUserRole(currentUser);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
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