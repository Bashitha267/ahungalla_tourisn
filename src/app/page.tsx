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
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600/10 text-cyan-600 dark:bg-teal-400/10 dark:text-teal-300 transition-colors group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-teal-400 dark:group-hover:text-slate-950">
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
            <span className="text-xs font-bold text-cyan-600 dark:text-teal-400 uppercase tracking-widest">
              {t('home.featured.tag')}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
              {t('home.featured.title')}
            </h2>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-cyan-600 hover:text-cyan-700 dark:text-teal-300 dark:hover:text-teal-200 group"
          >
            <span>{t('home.featured.view_all')}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col"
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stay Connected Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-cyan-600 dark:text-teal-400 uppercase tracking-widest block">
            Stay Connected
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
            Follow Our Expeditions
          </h2>
          <p className="text-sm sm:text-base text-slate-505 dark:text-slate-400">
            Follow Berty Tours on social media for daily travel inspiration, client highlight videos, and live stories from our Ahungalla day trips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: 'WhatsApp',
              desc: 'Chat directly with Berty for custom routes & instant support.',
              cta: 'Message Us',
              url: 'https://img.icons8.com/windows/96/whatsapp--v1.png',
              link: 'https://wa.me/94776920730',
              colorClass: 'group-hover:text-emerald-500'
            },
            {
              name: 'TikTok',
              desc: 'Watch scenic train rides, lagoon safaris, and beach updates.',
              cta: 'Watch Videos',
              url: 'https://img.icons8.com/?size=100&id=vXmXtbBOhqh2&format=png&color=000000',
              link: 'https://www.tiktok.com/@bertytours?_r=1&_t=ZS-97uNUvwLHWh',
              colorClass: 'group-hover:text-rose-500'
            },
            {
              name: 'Instagram',
              desc: 'Explore snapshots of tropical beaches & historical sites.',
              cta: 'Follow Gallery',
              url: 'https://img.icons8.com/?size=100&id=32309&format=png&color=000000',
              link: 'https://www.instagram.com/bertytours',
              colorClass: 'group-hover:text-pink-500'
            },
            {
              name: 'Facebook',
              desc: 'Join our page for reviews, announcements & group discounts.',
              cta: 'Join Community',
              url: 'https://img.icons8.com/windows/96/facebook-new.png',
              link: 'https://www.facebook.com/share/1Ac8PcPVMC/?mibextid=wwXIfr',
              colorClass: 'group-hover:text-blue-500'
            },
            {
              name: 'Visit Us',
              desc: 'Find our location on Galle Road in Ahungalla, Sri Lanka.',
              cta: 'Get Directions',
              url: 'https://img.icons8.com/windows/96/map-marker.png',
              link: 'https://maps.app.goo.gl/tTZPvknzLy2iVU9NA',
              colorClass: 'group-hover:text-red-500'
            }
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 flex flex-col justify-between items-center text-center space-y-4 hover:shadow-xl transition-all duration-300 group gold-border-glow"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="relative h-12 w-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-300 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                  <img
                    src={social.url}
                    alt={social.name}
                    className="h-7 w-7 object-contain brightness-0 dark:brightness-0 dark:invert invert"
                  />
                </div>
                <h3 className={`font-bold text-lg text-slate-800 dark:text-slate-100 transition-colors duration-200 ${social.colorClass}`}>
                  {social.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
                  {social.desc}
                </p>
              </div>

              <span className="inline-flex items-center text-xs font-bold text-cyan-600 dark:text-teal-400 group-hover:underline">
                {social.cta} <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
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
