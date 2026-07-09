'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient, DbPortfolioImage } from '@/lib/supabase';
import {
  Upload, Trash2, Edit, Check, X, Plus, Eye, EyeOff,
  Image as ImageIcon, GripVertical, AlertCircle
} from 'lucide-react';

const CATEGORIES = ['general', 'beaches', 'wildlife', 'culture', 'adventure', 'food', 'accommodation'];

interface EditingImage {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default function AdminPortfolioPage() {
  const [images, setImages] = useState<DbPortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [editing, setEditing] = useState<EditingImage | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [newImageForm, setNewImageForm] = useState({ title: '', description: '', category: 'general' });
  const [uploadedUrl, setUploadedUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('portfolio_images')
      .select('*')
      .order('sort_order', { ascending: true });
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => { loadImages(); }, []);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary not configured. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'berty-tours/portfolio');

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const url = await uploadToCloudinary(file);
      setUploadedUrl(url);
    } catch (err: unknown) {
      setUploadError((err as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddImage = async () => {
    if (!uploadedUrl) return;
    const supabase = createClient();
    const { data, error } = await supabase
      .from('portfolio_images')
      .insert({
        image_url: uploadedUrl,
        title: newImageForm.title || null,
        description: newImageForm.description || null,
        category: newImageForm.category,
        is_published: true,
        sort_order: images.length,
      })
      .select()
      .single();

    if (!error && data) {
      setImages(prev => [...prev, data]);
      setUploadedUrl('');
      setNewImageForm({ title: '', description: '', category: 'general' });
    }
  };

  const togglePublished = async (img: DbPortfolioImage) => {
    const supabase = createClient();
    await supabase.from('portfolio_images').update({ is_published: !img.is_published }).eq('id', img.id);
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, is_published: !i.is_published } : i));
  };

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    setDeleting(id);
    const supabase = createClient();
    await supabase.from('portfolio_images').delete().eq('id', id);
    setImages(prev => prev.filter(i => i.id !== id));
    setDeleting(null);
  };

  const saveEditing = async () => {
    if (!editing) return;
    const supabase = createClient();
    await supabase
      .from('portfolio_images')
      .update({ title: editing.title, description: editing.description, category: editing.category })
      .eq('id', editing.id);
    setImages(prev => prev.map(i => i.id === editing.id ? { ...i, ...editing } : i));
    setEditing(null);
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-all";

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Portfolio Gallery</h1>
        <p className="text-slate-400 text-sm mt-1">Upload and manage images for the public portfolio page</p>
      </div>

      {/* Upload Section */}
      <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-cyan-400" /> Upload New Image
        </h2>

        {/* Cloudinary Upload */}
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            uploading
              ? 'border-cyan-500/40 bg-cyan-500/5'
              : uploadedUrl
              ? 'border-emerald-500/40 bg-emerald-500/5'
              : 'border-white/10 hover:border-cyan-500/30 hover:bg-white/3'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin" />
              <p className="text-cyan-400 text-sm">Uploading to Cloudinary...</p>
            </div>
          ) : uploadedUrl ? (
            <div className="flex flex-col items-center gap-3">
              <img src={uploadedUrl} alt="Preview" className="h-32 rounded-xl object-cover border border-white/10" />
              <p className="text-emerald-400 text-sm">✓ Upload successful</p>
              <button onClick={(e) => { e.stopPropagation(); setUploadedUrl(''); }} className="text-xs text-slate-400 hover:text-white">Change image</button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <ImageIcon className="w-10 h-10 opacity-40" />
              <p className="text-sm">Click to upload an image</p>
              <p className="text-xs opacity-60">JPG, PNG, WebP, AVIF • Max 10MB</p>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

        {uploadError && (
          <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {uploadError}
          </div>
        )}

        {uploadedUrl && (
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Title</label>
              <input type="text" value={newImageForm.title} onChange={e => setNewImageForm(p => ({ ...p, title: e.target.value }))} placeholder="E.g. Yala Safari Sunrise" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Category</label>
              <select value={newImageForm.category} onChange={e => setNewImageForm(p => ({ ...p, category: e.target.value }))} className={`${inputCls} bg-slate-800`}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Description</label>
              <input type="text" value={newImageForm.description} onChange={e => setNewImageForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional caption..." className={inputCls} />
            </div>
          </div>
        )}

        {uploadedUrl && (
          <button
            onClick={handleAddImage}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add to Portfolio
          </button>
        )}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-slate-800/50 rounded-xl animate-pulse" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No portfolio images yet. Upload your first one above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.id} className={`group relative rounded-xl overflow-hidden border border-white/5 ${!img.is_published ? 'opacity-50' : ''}`}>
              <img src={img.image_url} alt={img.title || 'Portfolio image'} className="w-full aspect-square object-cover" loading="lazy" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex flex-col justify-between p-3">
                {/* Top actions */}
                <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => togglePublished(img)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/80 transition-all" title={img.is_published ? 'Hide' : 'Show'}>
                    {img.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setEditing({ id: img.id, title: img.title || '', description: img.description || '', category: img.category })} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-cyan-500/80 transition-all" title="Edit">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteImage(img.id)} disabled={deleting === img.id} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-500/80 transition-all disabled:opacity-50" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom info */}
                {img.title && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">{img.title}</p>
                    <span className="text-slate-400 text-[10px] capitalize">{img.category}</span>
                  </div>
                )}
              </div>

              {/* Published indicator */}
              {!img.is_published && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 rounded-full text-[10px] text-slate-300">Hidden</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-white">Edit Image Details</h3>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Title</label>
              <input type="text" value={editing.title} onChange={e => setEditing(p => p ? { ...p, title: e.target.value } : p)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Category</label>
              <select value={editing.category} onChange={e => setEditing(p => p ? { ...p, category: e.target.value } : p)} className={`${inputCls} bg-slate-800`}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Description</label>
              <input type="text" value={editing.description} onChange={e => setEditing(p => p ? { ...p, description: e.target.value } : p)} className={inputCls} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 border border-white/10 text-slate-300 hover:border-white/20 rounded-xl text-sm transition-all">Cancel</button>
              <button onClick={saveEditing} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all">
                <Check className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
