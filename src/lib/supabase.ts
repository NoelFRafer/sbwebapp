import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log

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
}

export interface Resolution {
  id: string;
  resolution_number: string;
  title: string;
  date_approved: string;
  description: string;
  file_url: string | null;
  is_active: boolean;
  with_ordinance: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}