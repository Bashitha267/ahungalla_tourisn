'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, Users, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle: string;
  price: number;
}

export default function BookingModal({ isOpen, onClose, packageTitle, price }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '2',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Explode confetti for premium user experience
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg glass rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 z-10 transition-colors duration-300">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-cyan-600/5 dark:bg-amber-500/5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-amber-500">Expedition Inquiry</span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{packageTitle}</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-850"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Package info bar */}
                  <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800/80 p-3 rounded-2xl">
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Award className="h-4 w-4 text-cyan-600 dark:text-amber-400 mr-1.5" />
                      Private Tour Inquiry
                    </span>
                    <span className="text-xs font-bold text-cyan-700 dark:text-amber-400 uppercase tracking-wider">
                      Tailored Rates
                    </span>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
                    />
                  </div>

                  {/* Date and Guests Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        Travel Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center">
                        <Users className="h-3.5 w-3.5 mr-1 text-slate-400" />
                        Travelers
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes field */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Special Notes / Requirements</label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any specific places, hotel preferences, or dietary requirements..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-amber-400 dark:focus:ring-amber-400 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-cyan-500 active:scale-98 transition-all duration-150 disabled:bg-slate-400 dark:bg-amber-500 dark:hover:bg-amber-600"
                  >
                    {loading ? (
                      <span className="flex items-center space-x-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending Request...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <span>Send Booking Inquiry</span>
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </form>
              ) : (
                /* Success State */
                <div className="py-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 dark:text-emerald-400 animate-bounce" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">Inquiry Sent Successfully!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                    Ayubowan, {formData.name}! Our Sri Lankan travel consultants will construct a tailored itinerary and email you details within 24 hours.
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        onClose();
                      }}
                      className="rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-cyan-600 dark:hover:bg-amber-500 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
