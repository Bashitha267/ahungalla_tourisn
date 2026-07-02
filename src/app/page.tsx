'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroVideo from '@/components/HeroVideo';
import PackageCard from '@/components/PackageCard';
import FeedbackSlider from '@/components/FeedbackSlider';
import AutoSlider from '@/components/AutoSlider';
import { tourPackages } from '@/data/packages';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, Leaf, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t } = useLanguage();
  // Select first 3 packages to display as featured
  const featuredPackages = tourPackages.slice(0, 3);

  const values = [
    {
      icon: Heart,
      title: t('home.values.hospitality.title'),
      description: t('home.values.hospitality.desc')
    },
    {
      icon: Leaf,
      title: t('home.values.eco.title'),
      description: t('home.values.eco.desc')
    },
    {
      icon: ShieldCheck,
      title: t('home.values.authentic.title'),
      description: t('home.values.authentic.desc')
    }
  ];

  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Section */}
      <HeroVideo />

      {/* Our Values Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl"
          >
            {t('home.values.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-slate-500 dark:text-slate-400"
          >
            {t('home.values.sub')}
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 text-center flex flex-col items-center space-y-4 hover:shadow-lg transition-all duration-350 group gold-border-glow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-600 dark:bg-amber-500/10 dark:text-amber-400 transition-colors group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-amber-500 dark:group-hover:text-slate-950">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{val.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-amber-500 uppercase tracking-widest">
              {t('home.featured.tag')}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
              {t('home.featured.title')}
            </h2>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-cyan-600 hover:text-cyan-700 dark:text-amber-400 dark:hover:text-amber-300 group"
          >
            <span>{t('home.featured.view_all')}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-5xl mx-auto">
          {featuredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <FeedbackSlider />

      {/* Image Gallery Scrolling Slider */}
      <AutoSlider />
    </div>
  );
}
