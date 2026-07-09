'use client';

import { useEffect, useState } from 'react';
import { createClient, DbFeedback } from '@/lib/supabase';
import { CheckCircle, XCircle, Trash2, Copy, Star, Filter, Clock, Globe } from 'lucide-react';

type FeedbackTab = 'pending' | 'published' | 'rejected';

export default function AdminFeedbacksPage() {
  const [tab, setTab] = useState<FeedbackTab>('pending');
  const [feedbacks, setFeedbacks] = useState<DbFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ pending: 0, published: 0, rejected: 0 });
  const [actioning, setActioning] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const loadFeedbacks = async () => {
    setLoading(true);
    const supabase = createClient();

    // Get counts for all tabs
    const [pendingCount, publishedCount, rejectedCount] = await Promise.all([
      supabase.from('feedbacks').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('feedbacks').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('feedbacks').select('id', { count: 'exact', head: true }).eq('status', 'rejected'),
    ]);
    setCounts({
      pending: pendingCount.count ?? 0,
      published: publishedCount.count ?? 0,
      rejected: rejectedCount.count ?? 0,
    });

    // Get feedbacks for current tab
    const { data } = await supabase
      .from('feedbacks')
      .select('*')
      .eq('status', tab)
      .order('created_at', { ascending: false });

    setFeedbacks(data || []);
    setLoading(false);
  };

  useEffect(() => { loadFeedbacks(); }, [tab]);

  const updateStatus = async (id: string, status: FeedbackTab) => {
    setActioning(id);
    const supabase = createClient();
    await supabase.from('feedbacks').update({ status }).eq('id', id);
    await loadFeedbacks();
    setActioning(null);
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Delete this feedback permanently?')) return;
    setActioning(id);
    const supabase = createClient();
    await supabase.from('feedbacks').delete().eq('id', id);
    setFeedbacks(prev => prev.filter(f => f.id !== id));
    setActioning(null);
  };

  const copyShareLink = (token: string, id: string) => {
    const url = `${window.location.origin}/feedback/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs: { key: FeedbackTab; label: string; count: number; color: string }[] = [
    { key: 'pending', label: 'Pending', count: counts.pending, color: 'text-amber-400 border-amber-400' },
    { key: 'published', label: 'Published', count: counts.published, color: 'text-emerald-400 border-emerald-400' },
    { key: 'rejected', label: 'Rejected', count: counts.rejected, color: 'text-red-400 border-red-400' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Feedbacks</h1>
        <p className="text-slate-400 text-sm mt-1">Moderate tourist reviews before they appear publicly</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 border border-white/5 rounded-xl p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === t.key
                ? 'bg-slate-700 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full border ${
                tab === t.key ? t.color : 'text-slate-500 border-slate-600'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />)}
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No {tab} feedbacks</p>
        </div>
      ) : (
        <div className="space-y-3">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="bg-slate-800/40 border border-white/5 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-white text-sm">{feedback.tourist_name}</span>
                    {feedback.country && (
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Globe className="w-3 h-3" /> {feedback.country}
                      </span>
                    )}
                    {/* Stars */}
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{feedback.message}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {new Date(feedback.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    {feedback.package_id && (
                      <><span>·</span><span>Package: {feedback.package_id}</span></>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                  {tab !== 'published' && (
                    <button
                      onClick={() => updateStatus(feedback.id, 'published')}
                      disabled={actioning === feedback.id}
                      title="Publish"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Publish
                    </button>
                  )}
                  {tab !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(feedback.id, 'rejected')}
                      disabled={actioning === feedback.id}
                      title="Reject"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/20 transition-all disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  )}
                  <button
                    onClick={() => copyShareLink(feedback.share_token, feedback.id)}
                    title="Copy share link"
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                  >
                    {copied === feedback.id ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteFeedback(feedback.id)}
                    disabled={actioning === feedback.id}
                    title="Delete"
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/20 transition-all disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
