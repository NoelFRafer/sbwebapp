import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Slide {
  id: string;
  image_url: string;
  thrust: string;
  quote: string;
  author: string;
  position: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
  fts_document?: string;
  highlighted_title?: string;
  highlighted_content?: string;
}

export interface Resolution {
  id: string;
  resolution_number: string;
  ordinance_number: string | null;
  title: string;
  date_approved: string;
  description: string;
  file_url: string | null;
  is_active: boolean;
  with_ordinance: boolean;
  is_featured: boolean;
  category: string | null;
  effective_date: string | null;
  amendment_history: string | null;
  created_at: string;
  updated_at: string;
  fts_document?: string;
  highlighted_resolution_number?: string;
  highlighted_title?: string;
  highlighted_description?: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user' | 'moderator' | 'editor';
  created_at: string;
  updated_at: string;
}

// Helper function to check if user is admin
export async function isUserAdmin(userId?: string): Promise<boolean> {
  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout checking admin status')), 60000);
    });
    
    const adminCheckPromise = supabase.rpc('is_admin', {
      user_uuid: userId || null
    });
    
    const { data, error } = await Promise.race([adminCheckPromise, timeoutPromise]);
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Helper function to get user role
export async function getUserRole(userId?: string): Promise<string> {
  try {
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout getting user role')), 60000);
    });
    
    const roleCheckPromise = supabase.rpc('get_user_role', {
      user_uuid: userId || null
    });
    
    const { data, error } = await Promise.race([roleCheckPromise, timeoutPromise]);
    
    if (error) {
      console.error('Error getting user role:', error);
      return 'user';
    }
    
    return data || 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
}