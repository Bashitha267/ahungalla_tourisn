'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { X, Star, Send, CheckCircle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages?: { id: string; title: string }[];
}

export default function FeedbackModal({ isOpen, onClose, packages = [] }: FeedbackModalProps) {
  const [form, setForm] = useState({
    tourist_name: '',
    country: '',
    rating: 5,
    message: '',
    package_id: '',
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from('feedbacks').insert({
        tourist_name: form.tourist_name.trim(),
        country: form.country.trim() || null,
        rating: form.rating,
        message: form.message.trim(),
        package_id: form.package_id || null,
        status: 'pending',
      });

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({ tourist_name: '', country: '', rating: 5, message: '', package_id: '' });
    setSubmitted(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {submitted ? (
            /* Success state */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Thank You!</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your feedback has been submitted and is awaiting review. We appreciate you sharing your experience with Berty Tours!
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Share Your Experience</h2>
                <p className="text-slate-400 text-sm mt-1">Your review helps future travelers discover Sri Lanka</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Country */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.tourist_name}
                      onChange={e => setForm(p => ({ ...p, tourist_name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Country</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                      placeholder="Germany"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>

                {/* Rating stars */}
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-medium">Rating *</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm(p => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoveredStar || form.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-slate-400 self-center">
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][hoveredStar || form.rating]}
                    </span>
                  </div>
                </div>

                {/* Package */}
                {packages.length > 0 && (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Tour Package (optional)</label>
                    <select
                      value={form.package_id}
                      onChange={e => setForm(p => ({ ...p, package_id: e.target.value }))}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    >
                      <option value="">Select a package...</option>
                      {packages.map(pkg => (
                        <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Your Review *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-teal-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
