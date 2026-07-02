'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const feedbacks = [
  {
    id: 1,
    name: "Sarah Jenkins",
    country: "United Kingdom",
    text: "An absolute dream vacation! Scaling the Sigiriya Rock Fortress at sunrise was unforgettable. Our guide shared rich history at every corner. The hospitality in Sri Lanka is truly unmatched.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "David & Lea Rossi",
    country: "Italy",
    text: "The blue train ride from Nuwara Eliya to Ella was the absolute highlight of our honeymoon. The emerald green tea valleys stretching forever left us speechless. CeylonVibe curated the perfect trip!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Kenji Sato",
    country: "Japan",
    text: "Spotting a leopard lounging on a tree branch in Yala was magical. Our private 4x4 driver tracker had eagle eyes. The luxury wilderness tents felt incredibly premium and eco-friendly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Amara Lopez",
    country: "Australia",
    text: "Strolling along the cobblestone streets of Galle Fort was like traveling back in time. The seafood by the ocean was spectacular and releasing baby turtles into the sea was an emotional highlight.",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  }
];

export default function FeedbackSlider() {
  const [index, setIndex] = useState(0);

  const prevStep = () => {
    setIndex((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const nextStep = () => {
    setIndex((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
  };

  // Handle mobile swipe drag endings
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 50) {
      prevStep();
    } else if (info.offset.x < -50) {
      nextStep();
    }
  };

  const current = feedbacks[index];

  return (
    <section className="py-16 bg-slate-100/50 dark:bg-slate-900/40 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
            Loved by Travelers
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Real stories from guests who explored Sri Lanka with us
          </p>
        </div>

        {/* Swipe container */}
        <div className="relative glass rounded-3xl p-6 sm:p-10 shadow-xl min-h-[300px] flex flex-col justify-between overflow-hidden">
          
          {/* Quote Icon Background */}
          <div className="absolute top-4 right-6 text-cyan-600/10 dark:text-amber-500/10 pointer-events-none">
            <Quote className="h-28 w-28 scale-y-[-1]" />
          </div>

          <div className="relative overflow-hidden flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing select-none"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(current.rating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg italic leading-relaxed text-slate-700 dark:text-slate-300">
                    "{current.text}"
                  </p>

                  {/* Reviewer Details */}
                  <div className="flex items-center space-x-4 pt-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-cyan-500/50 dark:border-amber-500/50"
                      draggable={false}
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">{current.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{current.country}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800/80 mt-6">
            {/* Pagination indicators */}
            <div className="flex space-x-2">
              {feedbacks.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-cyan-600 dark:bg-amber-500" : "w-2 bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex space-x-2">
              <button
                onClick={prevStep}
                className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Previous feedback"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextStep}
                className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Next feedback"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
        </div>
        
        {/* Mobile Swipe Tip */}
        <p className="text-center text-xs text-slate-400 mt-3 select-none pointer-events-none md:hidden">
          Swipe left or right to change feedback
        </p>

      </div>
    </section>
  );
}
