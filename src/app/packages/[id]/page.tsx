'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { tourPackages } from '@/data/packages';
import BookingModal from '@/components/BookingModal';
import ThreeDCard from '@/components/ThreeDCard';
import { ChevronLeft, Clock, Check, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PackageDetailPage({ params }: PageProps) {
  // Resolve params using React's use hook
  const { id } = use(params);

  // Find the package in the database
  const pkg = tourPackages.find((p) => p.id === id);

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <MapPin className="h-16 w-16 text-slate-350 animate-bounce" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Expedition Not Found</h1>
        <p className="text-slate-500 max-w-md">
          We couldn't find the tour package you are looking for. It may have been renamed or removed.
        </p>
        <Link
          href="/packages"
          className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-600"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-slate-50/30 dark:bg-slate-950/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/packages"
          className="inline-flex items-center space-x-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-650 dark:hover:text-amber-400 transition-colors"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
          <span>Back to Catalog</span>
        </Link>

        {/* Title Header with Booking CTA */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:bg-amber-500/15 dark:text-amber-400">
              Berty Tours
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-650 dark:bg-slate-800 dark:text-slate-300">
              <Clock className="h-3 w-3 mr-1" />
              {pkg.duration}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl lg:text-5xl">
                {pkg.title}
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 italic">
                {pkg.tagline}
              </p>
            </div>
            
            {/* Header Booking Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center rounded-full bg-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-cyan-700 active:scale-95 transition-all duration-200 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-600 shrink-0"
            >
              <span>Book / Inquire Now</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>


        {/* Overview Card */}
        <div className="glass p-6 sm:p-8 rounded-3xl space-y-4 bg-white/70 dark:bg-slate-900/50">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">About this Expedition</h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {pkg.description}
          </p>
        </div>

        {/* Destinations & Alternating Itinerary Blocks */}
        <div className="space-y-12">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              Expedition Destinations & Itinerary
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore the places visited in this package, formatted with custom highlights
            </p>
          </div>

          <div className="space-y-16">
            {pkg.places.map((place, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 items-center pb-12 border-b border-slate-200/60 dark:border-slate-800/60 last:border-0`}
                >
                  {/* Place details content */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-xs">
                        {index + 1}
                      </span>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        {place.name}
                      </h4>
                    </div>
                    
                    <span className="inline-block text-xs font-semibold text-cyan-600 dark:text-amber-400 bg-cyan-600/5 dark:bg-amber-500/5 px-2.5 py-1 rounded-lg">
                      {place.tagline}
                    </span>
                    
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {place.description}
                    </p>

                    {/* Activities bullets list (places points) */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                        Things to Watch & Experience:
                      </span>
                      <ul className="space-y-2">
                        {place.activities.map((act, actIdx) => (
                          <li key={actIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-400 flex items-start space-x-2.5">
                            <span className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                              <Check className="h-3 w-3" />
                            </span>
                            <span className="leading-snug">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Place image wrapped in 3D Card tilt effect */}
                  <div className="w-full md:w-1/2">
                    <ThreeDCard className="w-full h-64 sm:h-72">
                      <div className="w-full h-full relative rounded-3xl overflow-hidden glass-card shadow-lg border border-slate-200 dark:border-slate-800">
                        <Image
                          src={place.image}
                          alt={place.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-w-7xl) 40vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-5">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            {place.name.split(' & ')[0]}
                          </span>
                        </div>
                      </div>
                    </ThreeDCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="glass p-8 sm:p-10 rounded-[32px] text-center bg-cyan-600/5 dark:bg-amber-500/5 border border-cyan-600/20 dark:border-amber-500/20 space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Ready to Book Your Custom Expedition?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Request a free quote based on your traveler count. Custom routes and private transfers are fully customizable.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-cyan-700 active:scale-95 transition-all duration-200 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-600"
          >
            <span>Inquire / Book this Tour</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageTitle={pkg.title}
        price={pkg.price}
      />
    </div>
  );
}
