'use client';

import { useState } from 'react';
import type { DbPortfolioImage } from '@/lib/supabase';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: DbPortfolioImage[];
  categories: string[];
}

export default function PortfolioGallery({ images, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(i => (i !== null ? (i === 0 ? filtered.length - 1 : i - 1) : null));
  const nextImage = () => setLightboxIdx(i => (i !== null ? (i === filtered.length - 1 ? 0 : i + 1) : null));

  const activeCats = categories.filter(c => c === 'all' || images.some(img => img.category === c));

  if (images.length === 0) {
    return (
      <div className="text-center py-24 space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
          <ZoomIn className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Gallery Coming Soon</h2>
        <p className="text-slate-500">We&apos;re curating our best Sri Lanka photography. Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {activeCats.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? `All (${images.length})` : cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-slate-500 py-16">No images in this category yet.</p>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 hover:scale-[1.01]"
            >
              <img
                src={img.image_url}
                alt={img.title || 'Sri Lanka tour photo'}
                className="w-full object-cover"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {img.title && <p className="text-white text-sm font-semibold">{img.title}</p>}
                  {img.description && <p className="text-slate-300 text-xs mt-0.5">{img.description}</p>}
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10" onClick={closeLightbox}>
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={e => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={filtered[lightboxIdx].image_url}
              alt={filtered[lightboxIdx].title || 'Photo'}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            {(filtered[lightboxIdx].title || filtered[lightboxIdx].description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl p-4 text-white">
                {filtered[lightboxIdx].title && <p className="font-semibold">{filtered[lightboxIdx].title}</p>}
                {filtered[lightboxIdx].description && <p className="text-sm text-slate-300 mt-0.5">{filtered[lightboxIdx].description}</p>}
              </div>
            )}
          </div>

          {/* Next */}
          {filtered.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={e => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 rounded-full text-white text-xs">
            {lightboxIdx + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  );
}
