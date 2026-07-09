import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { DbPortfolioImage } from '@/lib/supabase';
import PortfolioGallery from './PortfolioGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | Berty Tours — Sri Lanka',
  description: 'Explore stunning photography from our Sri Lanka tours — leopard safaris, ancient temples, misty tea plantations, pristine beaches, and wildlife encounters.',
};

const CATEGORIES = ['all', 'beaches', 'wildlife', 'culture', 'adventure', 'food', 'accommodation', 'general'];

export default async function PortfolioPage() {
  let images: DbPortfolioImage[] = [];

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from('portfolio_images')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    images = data || [];
  } catch {
    // Fallback to empty — will show placeholder message
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src="https://res.cloudinary.com/dnfbik3if/image/upload/v1782981453/yala_lliszn.jpg"
          alt="Sri Lanka Portfolio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Photo Gallery
          </h1>
          <p className="text-slate-200 text-base sm:text-lg mt-3 max-w-xl">
            Moments captured across Sri Lanka's most breathtaking landscapes
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PortfolioGallery images={images} categories={CATEGORIES} />
      </div>
    </div>
  );
}
