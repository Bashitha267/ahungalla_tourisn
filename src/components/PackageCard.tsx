'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TourPackage } from '@/data/packages';
import ThreeDCard from './ThreeDCard';
import { Star, Clock, Tag, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  pkg: TourPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'half-day':
        return 'bg-teal-400/10 text-teal-600 dark:bg-teal-400/20 dark:text-teal-300';
      case '1-day':
        return 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300';
      case '2-day':
        return 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300';
      default:
        return 'bg-slate-500/10 text-slate-600';
    }
  };

  return (
    <ThreeDCard className="w-full h-full">
      <Link href={`/packages/${pkg.id}`} className="block w-full h-full group">
        <div className="w-full h-full glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 transition-all duration-300 gold-border-glow">
          {/* Card Image */}
          <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
            {/* Mobile Cover Image */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src={pkg.coverImageMobile}
                alt={pkg.title}
                fill
                sizes="(max-w-768px) 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={false}
              />
            </div>
            {/* Desktop Cover Image */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src={pkg.coverImageDesktop}
                alt={pkg.title}
                fill
                sizes="(min-w-768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={false}
              />
            </div>
            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10 flex space-x-2">
              <span className={`inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-sm uppercase ${getCategoryColor(pkg.category)}`}>
                <Tag className="h-3 w-3" />
                <span>{pkg.category}</span>
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              {/* Title & Duration */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-cyan-600 dark:text-teal-400" />
                  <span>{pkg.duration}</span>
                </span>
                <span className="flex items-center space-x-1 font-semibold text-slate-800 dark:text-slate-200">
                  <Star className="h-3.5 w-3.5 text-teal-400 fill-teal-400" />
                  <span>{pkg.rating}</span>
                  <span className="text-slate-400 font-normal">({pkg.reviewsCount})</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-teal-400 transition-colors duration-200 line-clamp-1">
                {pkg.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {pkg.shortDescription}
              </p>
            </div>

            {/* places visited as points */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                Destinations Included:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pkg.places.map((place, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center text-[10px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-teal-400 mr-1.5" />
                    <span>{place.name.split(' & ')[0]}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action button representation */}
            <div className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-cyan-600 active:scale-95 transition-all duration-200 dark:bg-slate-800 dark:hover:bg-teal-400 group-hover:shadow-lg">
              <span>View Expedition</span>
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </ThreeDCard>
  );
}
