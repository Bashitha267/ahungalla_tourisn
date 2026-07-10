import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client — use in Client Components
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// =============================================
// Types matching Supabase schema
// =============================================

export interface DbPackagePlace {
  id: string;
  package_id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  image: string | null;
  activities: string[];
  sort_order: number;
}

export interface DbTourPackage {
  id: string;
  title: string;
  tagline: string | null;
  duration: string | null;
  price: number;
  rating: number;
  reviews_count: number;
  category: 'half-day' | '1-day' | '2-day';
  description: string | null;
  short_description: string | null;
  highlights: string[];
  cover_image_mobile: string | null;
  cover_image_desktop: string | null;
  images: string[];
  included: string[];
  excluded: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  package_places?: DbPackagePlace[];
}

export interface DbFeedback {
  id: string;
  tourist_name: string;
  country: string | null;
  rating: number;
  message: string;
  package_id: string | null;
  status: 'pending' | 'published' | 'rejected';
  share_token: string;
  avatar_url: string | null;
  created_at: string;
}

export interface DbPortfolioImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}
