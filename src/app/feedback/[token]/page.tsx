import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Star, Globe, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tourist Review | Berty Tours',
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function FeedbackTokenPage({ params }: Props) {
  const { token } = await params;

  let feedback = null;
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from('feedbacks')
      .select('*')
      .eq('share_token', token)
      .single();
    feedback = data;
  } catch {
    // Not found
  }

  if (!feedback) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center space-y-4 text-white">
          <p className="text-6xl">🔍</p>
          <h1 className="text-2xl font-bold">Review Not Found</h1>
          <p className="text-slate-400">This feedback link may be invalid or has been removed.</p>
          <Link href="/" className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-sm font-semibold hover:from-cyan-400 hover:to-teal-400 transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur border border-white/10 rounded-2xl p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {feedback.tourist_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="font-bold text-white">{feedback.tourist_name}</h2>
              {feedback.country && (
                <p className="text-slate-400 text-sm flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {feedback.country}
                </p>
              )}
            </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-5 h-5 ${s <= feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
            ))}
          </div>

          <blockquote className="text-slate-200 leading-relaxed italic text-lg">
            &ldquo;{feedback.message}&rdquo;
          </blockquote>

          {feedback.status === 'published' && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Published review</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            ← Back to Berty Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
