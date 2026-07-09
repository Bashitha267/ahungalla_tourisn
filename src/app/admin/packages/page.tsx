'use client';

import { useEffect, useState } from 'react';
import { createClient, DbTourPackage } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, AlertCircle, Package } from 'lucide-react';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<DbTourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadPackages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tour_packages')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) setError(error.message);
    else setPackages(data || []);
    setLoading(false);
  };

  useEffect(() => { loadPackages(); }, []);

  const toggleActive = async (pkg: DbTourPackage) => {
    const supabase = createClient();
    await supabase
      .from('tour_packages')
      .update({ is_active: !pkg.is_active, updated_at: new Date().toISOString() })
      .eq('id', pkg.id);
    setPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, is_active: !p.is_active } : p));
  };

  const deletePackage = async (id: string) => {
    if (!confirm('Delete this package? This cannot be undone.')) return;
    setDeleting(id);
    const supabase = createClient();
    const { error } = await supabase.from('tour_packages').delete().eq('id', id);
    if (error) {
      alert('Error deleting: ' + error.message);
    } else {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
    setDeleting(null);
  };

  const categoryColors: Record<string, string> = {
    'half-day': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    '1-day': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    '2-day': 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tour Packages</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your tour package offerings</p>
        </div>
        <Link
          href="/admin/packages/new"
          id="add-package-btn"
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-slate-400">No packages found. Add your first tour package.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                pkg.is_active
                  ? 'bg-slate-800/40 border-white/5'
                  : 'bg-slate-900/60 border-white/5 opacity-60'
              }`}
            >
              {/* Cover image */}
              {pkg.cover_image_mobile && (
                <img
                  src={pkg.cover_image_mobile}
                  alt={pkg.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                />
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-semibold text-white truncate">{pkg.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[pkg.category] || 'bg-slate-700 text-slate-400'}`}>
                    {pkg.category}
                  </span>
                  {!pkg.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400 border border-slate-600">Hidden</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 truncate">{pkg.short_description}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <span>${pkg.price}</span>
                  <span>·</span>
                  <span>{pkg.duration}</span>
                  <span>·</span>
                  <span>★ {pkg.rating} ({pkg.reviews_count} reviews)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(pkg)}
                  title={pkg.is_active ? 'Hide package' : 'Show package'}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {pkg.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <Link
                  href={`/admin/packages/${pkg.id}`}
                  className="p-2 rounded-lg hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Edit package"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  disabled={deleting === pkg.id}
                  title="Delete package"
                  className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
