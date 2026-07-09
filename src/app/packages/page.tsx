'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { tourPackages } from '@/data/packages';
import { createClient } from '@/lib/supabase';
import type { DbTourPackage, DbPackagePlace } from '@/lib/supabase';
import { Clock, Star, ArrowRight, Tag } from 'lucide-react';

// Adapter: map DB format → shape that the existing JSX uses
function adaptPackage(p: DbTourPackage & { package_places?: DbPackagePlace[] }) {
  return {
    id: p.id,
    title: p.title,
    tagline: p.tagline ?? '',
    duration: p.duration ?? '',
    price: p.price,
    rating: p.rating,
    reviewsCount: p.reviews_count,
    category: p.category,
    description: p.description ?? '',
    shortDescription: p.short_description ?? '',
    highlights: p.highlights ?? [],
    coverImageMobile: p.cover_image_mobile ?? '',
    coverImageDesktop: p.cover_image_desktop ?? '',
    images: p.images ?? [],
    included: p.included ?? [],
    excluded: p.excluded ?? [],
    places: (p.package_places ?? []).map(pl => ({
      name: pl.name,
      tagline: pl.tagline ?? '',
      description: pl.description ?? '',
      image: pl.image ?? '',
      activities: pl.activities ?? [],
    })),
  };
}

export default function PackagesPage() {
  const [packages, setPackages] = useState(tourPackages);

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('tour_packages')
          .select('*, package_places(*)')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (data && data.length > 0) {
          setPackages(data.map(adaptPackage));
        }
      } catch {
        // Fall back to static data silently
      }
    };
    load();
  }, []);

  return (
    <div className="w-full min-h-screen py-10 bg-slate-50/30 dark:bg-slate-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-600 dark:text-teal-400 uppercase tracking-widest">
            Tailored Experiences
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-5xl">
            Sri Lanka Expedition Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Find the perfect journey through palm-fringed coastlines, sacred golden shrines, misty valleys, and wild elephant habitats.
          </p>
        </div>

        {/* Catalog List */}
        <div>
          <div className="space-y-12">
            {packages.map((pkg, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4 }}
                  className={`glass rounded-[32px] overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } min-h-[380px] hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Image block (Left/Right) */}
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[280px] overflow-hidden">
                    {/* Mobile Cover Image */}
                    <div className="block md:hidden absolute inset-0">
                      <Image
                        src={pkg.coverImageMobile}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-w-768px) 100vw"
                      />
                    </div>
                    {/* Desktop Cover Image */}
                    <div className="hidden md:block absolute inset-0">
                      <Image
                        src={pkg.coverImageDesktop}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-w-768px) 40vw"
                      />
                    </div>
                  </div>

                  {/* Content block */}
                  <div className="p-6 sm:p-8 md:w-3/5 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      {/* Duration and Rating */}
                      <div className="flex flex-wrap gap-4 items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center space-x-1.5 font-semibold text-cyan-600 dark:text-teal-300 uppercase tracking-widest">
                          <Tag className="h-3.5 w-3.5" />
                          <span>{pkg.category} Package</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3.5 w-3.5 text-cyan-600 dark:text-teal-300" />
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{pkg.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1 font-semibold text-slate-800 dark:text-slate-200">
                          <Star className="h-3.5 w-3.5 text-teal-400 fill-teal-400" />
                          <span>{pkg.rating}</span>
                          <span className="text-slate-400 font-normal">({pkg.reviewsCount} reviews)</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-teal-300 transition-colors duration-200">
                        {pkg.title}
                      </h3>

                      {/* Tagline / Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Places visited as points */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                          Places Visited (Highlights):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {pkg.places.map((place, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-teal-400 mr-2" />
                              {place.name.split(' & ')[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Private AC taxi & Berty Tours guide lecturer included
                      </span>
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-cyan-700 active:scale-95 transition-all duration-200 dark:bg-teal-400 dark:text-slate-900 dark:hover:bg-teal-300"
                      >
                        <span>View Expedition Details</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
