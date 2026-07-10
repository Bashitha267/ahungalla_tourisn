'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient, DbTourPackage, DbPackagePlace } from '@/lib/supabase';
import { Save, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import Link from 'next/link';

function CloudinaryUploader({
  label,
  value,
  onChange,
  folder = 'berty-tours/packages'
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration missing. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onChange(data.secure_url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs text-slate-400 font-medium">{label}</label>
      </div>
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://res.cloudinary.com/..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
        />
        <label className="cursor-pointer shrink-0 px-4 py-2.5 bg-slate-700/60 hover:bg-slate-700 border border-white/10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all select-none">
          {uploading ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
      {value && (
        <div className="relative mt-2 w-full max-w-[200px] aspect-video rounded-xl overflow-hidden border border-white/10 bg-slate-900/50">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 p-1 bg-black/60 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}


type PackageForm = Omit<DbTourPackage, 'created_at' | 'updated_at' | 'package_places'>;
type PlaceForm = Omit<DbPackagePlace, 'id' | 'package_id'> & { id?: string };

const defaultPackage: PackageForm = {
  id: '',
  title: '',
  tagline: '',
  duration: '',
  price: 0,
  rating: 4.8,
  reviews_count: 0,
  category: '1-day',
  description: '',
  short_description: '',
  highlights: [],
  cover_image_mobile: '',
  cover_image_desktop: '',
  images: [],
  included: [],
  excluded: [],
  is_active: true,
  sort_order: 0,
};

const defaultPlace: PlaceForm = {
  name: '',
  tagline: '',
  description: '',
  image: '',
  activities: [],
  sort_order: 0,
};

function ArrayField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-slate-400 font-medium">{label}</label>
        <button type="button" onClick={() => onChange([...value, ''])} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={e => { const n = [...value]; n[i] = e.target.value; onChange(n); }}
              placeholder={`${label} item ${i + 1}`}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PackageEditPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === 'new';

  const [form, setForm] = useState<PackageForm>(defaultPackage);
  const [places, setPlaces] = useState<PlaceForm[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [expandedPlace, setExpandedPlace] = useState<number | null>(0);

  useEffect(() => {
    if (isNew) return;
    const load = async () => {
      const supabase = createClient();
      const [pkgRes, placesRes] = await Promise.all([
        supabase.from('tour_packages').select('*').eq('id', params.id as string).single(),
        supabase.from('package_places').select('*').eq('package_id', params.id as string).order('sort_order'),
      ]);
      if (pkgRes.data) {
        const { created_at, updated_at, package_places, ...rest } = pkgRes.data as DbTourPackage;
        setForm(rest);
      }
      if (placesRes.data) setPlaces(placesRes.data);
      setLoading(false);
    };
    load();
  }, [isNew, params.id]);

  const setField = <K extends keyof PackageForm>(key: K, value: PackageForm[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const setPlaceField = (idx: number, key: keyof PlaceForm, value: unknown) =>
    setPlaces(prev => prev.map((p, i) => i === idx ? { ...p, [key]: value } : p));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const supabase = createClient();
      const now = new Date().toISOString();

      if (isNew) {
        const { error: insertError } = await supabase.from('tour_packages').insert({ ...form, created_at: now, updated_at: now });
        if (insertError) throw insertError;
      } else {
        const { error: updateError } = await supabase.from('tour_packages').update({ ...form, updated_at: now }).eq('id', params.id as string);
        if (updateError) throw updateError;
      }

      // Upsert places
      const pkgId = isNew ? form.id : params.id as string;
      for (const [idx, place] of places.entries()) {
        const placeData = { ...place, package_id: pkgId, sort_order: idx };
        if (place.id) {
          await supabase.from('package_places').update(placeData).eq('id', place.id);
        } else {
          await supabase.from('package_places').insert(placeData);
        }
      }

      router.push('/admin/packages');
    } catch (err: unknown) {
      setError((err as Error).message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
      </div>
    );
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all";
  const labelCls = "block text-xs text-slate-400 mb-1.5 font-medium";

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packages" className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? 'New Package' : 'Edit Package'}</h1>
          <p className="text-slate-400 text-sm">{isNew ? 'Create a new tour package' : `Editing: ${form.title}`}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Info */}
        <section className="bg-slate-800/40 border border-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>ID (URL slug) *</label>
              <input type="text" required value={form.id} onChange={e => setField('id', e.target.value)} placeholder="half-day-tour" disabled={!isNew} className={`${inputCls} ${!isNew ? 'opacity-50 cursor-not-allowed' : ''}`} />
            </div>
            <div>
              <label className={labelCls}>Category *</label>
              <select value={form.category} onChange={e => setField('category', e.target.value as PackageForm['category'])} className={`${inputCls} bg-slate-800`}>
                <option value="half-day">Half-Day</option>
                <option value="1-day">1-Day</option>
                <option value="2-day">2-Day</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Title *</label>
              <input type="text" required value={form.title} onChange={e => setField('title', e.target.value)} placeholder="Half-Day Tour Excursions" className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Tagline</label>
              <input type="text" value={form.tagline || ''} onChange={e => setField('tagline', e.target.value)} placeholder="Short marketing tagline..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Duration</label>
              <input type="text" value={form.duration || ''} onChange={e => setField('duration', e.target.value)} placeholder="Half Day / 6 Hours" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Price (USD) *</label>
              <input type="number" required min="0" step="0.01" value={form.price} onChange={e => setField('price', parseFloat(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Rating</label>
              <input type="number" min="1" max="5" step="0.01" value={form.rating} onChange={e => setField('rating', parseFloat(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Reviews Count</label>
              <input type="number" min="0" value={form.reviews_count} onChange={e => setField('reviews_count', parseInt(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input type="number" min="0" value={form.sort_order} onChange={e => setField('sort_order', parseInt(e.target.value))} className={inputCls} />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setField('is_active', e.target.checked)} className="rounded" />
              <label htmlFor="is_active" className="text-sm text-slate-300">Active (publicly visible)</label>
            </div>
          </div>

          <div>
            <label className={labelCls}>Short Description</label>
            <textarea rows={2} value={form.short_description || ''} onChange={e => setField('short_description', e.target.value)} className={`${inputCls} resize-none`} placeholder="One-sentence summary..." />
          </div>
          <div>
            <label className={labelCls}>Full Description</label>
            <textarea rows={4} value={form.description || ''} onChange={e => setField('description', e.target.value)} className={`${inputCls} resize-none`} placeholder="Detailed description..." />
          </div>
        </section>

        {/* Images */}
        <section className="bg-slate-800/40 border border-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-semibold text-white mb-4">Images</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <CloudinaryUploader
              label="Cover Image (Mobile)"
              value={form.cover_image_mobile || ''}
              onChange={url => setField('cover_image_mobile', url)}
            />
            <CloudinaryUploader
              label="Cover Image (Desktop)"
              value={form.cover_image_desktop || ''}
              onChange={url => setField('cover_image_desktop', url)}
            />
          </div>
        </section>

        {/* Places */}
        <section className="bg-slate-800/40 border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Places Visited</h2>
            <button
              type="button"
              onClick={() => { setPlaces(p => [...p, { ...defaultPlace, sort_order: p.length }]); setExpandedPlace(places.length); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium rounded-lg hover:bg-cyan-500/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Place
            </button>
          </div>

          {places.map((place, idx) => (
            <div key={idx} className="border border-white/5 rounded-xl overflow-hidden">
              <div
                onClick={() => setExpandedPlace(expandedPlace === idx ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-left cursor-pointer select-none"
              >
                <span className="text-sm font-medium text-white">{place.name || `Place ${idx + 1}`}</span>
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setPlaces(p => p.filter((_, i) => i !== idx))}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedPlace(expandedPlace === idx ? null : idx)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {expandedPlace === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {expandedPlace === idx && (
                <div className="p-5 space-y-5 bg-slate-800/20 border-t border-white/5">
                  <div>
                    <label className={labelCls}>Name of the Main Place *</label>
                    <input
                      type="text"
                      required
                      value={place.name}
                      onChange={e => setPlaceField(idx, 'name', e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Bentota & Kosgoda Coastline"
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Slugs / Tagline (e.g. beaches, sea turtles...)</label>
                    <input
                      type="text"
                      value={place.tagline || ''}
                      onChange={e => setPlaceField(idx, 'tagline', e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Beaches, Sea Turtles, and Local Handicrafts"
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Description</label>
                    <textarea
                      rows={3}
                      value={place.description || ''}
                      onChange={e => setPlaceField(idx, 'description', e.target.value)}
                      className={`${inputCls} resize-none`}
                      placeholder="Describe what makes this place special..."
                    />
                  </div>

                  <ArrayField
                    label="Things to Watch & Experience"
                    value={place.activities}
                    onChange={v => setPlaceField(idx, 'activities', v)}
                  />

                  <CloudinaryUploader
                    label="Image of the Place"
                    value={place.image || ''}
                    onChange={url => setPlaceField(idx, 'image', url)}
                    folder="berty-tours/places"
                  />
                </div>
              )}
            </div>
          ))}
        </section>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">{error}</div>
        )}

        <div className="flex gap-3 pb-8">
          <Link href="/admin/packages" className="px-6 py-2.5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 rounded-xl text-sm transition-all">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Package'}
          </button>
        </div>
      </form>
    </div>
  );
}
